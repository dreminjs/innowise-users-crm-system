import { render, screen, waitFor } from "@testing-library/react";
import { PreviewLanguages } from "./PreviewLanguages";

jest.mock("@/modules/Settings/model/settings.store");
jest.mock("@/shared/api/translateText");

import { useSettingsStore } from "@/modules/Settings/model/settings.store";
import { translateText } from "@/shared/api/translateText";

const mockUseSettingsStore = useSettingsStore as unknown as jest.Mock;
const mockTranslateText = translateText as jest.Mock;

const makeLanguage = (name: string, proficiency: string) => ({
  name,
  proficiency,
});

const mockMessages = {} as any;

const renderComponent = (
  languages = [makeLanguage("english", "B2")],
  messages = mockMessages,
) =>
  render(<PreviewLanguages languages={languages as any} messages={messages} />);

describe("PreviewLanguages", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseSettingsStore.mockReturnValue({ resumeLanguage: "en" });
    mockTranslateText.mockImplementation((text: string) =>
      Promise.resolve(`translated_${text}`),
    );
  });

  describe("Rendering", () => {
    it("renders a list item for each language", async () => {
      const languages = [
        makeLanguage("english", "B2"),
        makeLanguage("german", "A1"),
      ];
      renderComponent(languages);
      await waitFor(() => {
        expect(screen.getAllByRole("listitem")).toHaveLength(2);
      });
    });

    it("renders proficiency for each language", async () => {
      const languages = [
        makeLanguage("english", "B2"),
        makeLanguage("german", "A1"),
      ];
      renderComponent(languages);
      expect(screen.getByText("B2")).toBeInTheDocument();
      expect(screen.getByText("A1")).toBeInTheDocument();
    });

    it("renders nothing when languages list is empty", () => {
      renderComponent([]);
      expect(screen.queryAllByRole("listitem")).toHaveLength(0);
    });

    it("shows capitalized original name before translation resolves", () => {
      mockTranslateText.mockReturnValue(new Promise(() => {})); // never resolves
      renderComponent([makeLanguage("english", "B2")]);
      expect(screen.getByText("English")).toBeInTheDocument();
    });
  });

  describe("Translation", () => {
    it("calls translateText for each language with resumeLanguage", async () => {
      const languages = [
        makeLanguage("english", "B2"),
        makeLanguage("german", "A1"),
      ];
      renderComponent(languages);
      await waitFor(() => {
        expect(mockTranslateText).toHaveBeenCalledWith("english", "en");
        expect(mockTranslateText).toHaveBeenCalledWith("german", "en");
      });
    });

    it("renders translated and capitalized language name", async () => {
      mockTranslateText.mockResolvedValue("englisch");
      renderComponent([makeLanguage("english", "B2")]);
      await waitFor(() => {
        expect(screen.getByText("Englisch")).toBeInTheDocument();
      });
    });

    it("capitalizes translated name", async () => {
      mockTranslateText.mockResolvedValue("français");
      renderComponent([makeLanguage("french", "C1")]);
      await waitFor(() => {
        expect(screen.getByText("Français")).toBeInTheDocument();
      });
    });

    it("re-runs translation when resumeLanguage changes", async () => {
      mockUseSettingsStore.mockReturnValue({ resumeLanguage: "en" });
      const languages = [makeLanguage("english", "B2")];
      const { rerender } = render(
        <PreviewLanguages
          languages={languages as any}
          messages={mockMessages}
        />,
      );
      await waitFor(() => expect(mockTranslateText).toHaveBeenCalledTimes(1));

      mockUseSettingsStore.mockReturnValue({ resumeLanguage: "de" });
      rerender(
        <PreviewLanguages
          languages={languages as any}
          messages={mockMessages}
        />,
      );

      await waitFor(() => {
        expect(mockTranslateText).toHaveBeenCalledWith("english", "de");
      });
    });

    it("re-runs translation when languages change", async () => {
      const languages = [makeLanguage("english", "B2")];
      const { rerender } = render(
        <PreviewLanguages
          languages={languages as any}
          messages={mockMessages}
        />,
      );
      await waitFor(() => expect(mockTranslateText).toHaveBeenCalledTimes(1));

      const newLanguages = [makeLanguage("french", "C1")];
      rerender(
        <PreviewLanguages
          languages={newLanguages as any}
          messages={mockMessages}
        />,
      );

      await waitFor(() => {
        expect(mockTranslateText).toHaveBeenCalledWith("french", "en");
      });
    });
  });

  describe("Error handling", () => {
    it("falls back to capitalized original name when translation fails", async () => {
      mockTranslateText.mockRejectedValue(new Error("API error"));
      renderComponent([makeLanguage("english", "B2")]);
      await waitFor(() => {
        expect(screen.getByText("English")).toBeInTheDocument();
      });
    });

    it("still renders proficiency when translation fails", async () => {
      mockTranslateText.mockRejectedValue(new Error("API error"));
      renderComponent([makeLanguage("english", "B2")]);
      await waitFor(() => {
        expect(screen.getByText("B2")).toBeInTheDocument();
      });
    });

    it("handles partial translation failures independently per language", async () => {
      mockTranslateText
        .mockResolvedValueOnce("englisch")
        .mockRejectedValueOnce(new Error("API error"));
      const languages = [
        makeLanguage("english", "B2"),
        makeLanguage("german", "A1"),
      ];
      renderComponent(languages);
      await waitFor(() => {
        expect(screen.getByText("Englisch")).toBeInTheDocument();
        expect(screen.getByText("German")).toBeInTheDocument();
      });
    });
  });

  describe("capitalize helper", () => {
    it("capitalizes first letter of language name", async () => {
      mockTranslateText.mockRejectedValue(new Error());
      renderComponent([makeLanguage("spanish", "B1")]);
      await waitFor(() => {
        expect(screen.getByText("Spanish")).toBeInTheDocument();
      });
    });

    it("handles already capitalized name", async () => {
      mockTranslateText.mockRejectedValue(new Error());
      renderComponent([makeLanguage("French", "C1")]);
      await waitFor(() => {
        expect(screen.getByText("French")).toBeInTheDocument();
      });
    });

    it("handles single character name", async () => {
      mockTranslateText.mockRejectedValue(new Error());
      renderComponent([makeLanguage("a", "A1")]);
      await waitFor(() => {
        expect(screen.getByText("A")).toBeInTheDocument();
      });
    });
  });
});
