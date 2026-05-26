import { render, screen, waitFor } from "@testing-library/react";
import { PreviewHeader } from "./PreviewHeader";

// --- Mocks ---

jest.mock("@/modules/Settings/model/settings.store");
jest.mock("@/shared/api/translateText");

import { useSettingsStore } from "@/modules/Settings/model/settings.store";
import { translateText } from "@/shared/api/translateText";

const mockUseSettingsStore = useSettingsStore as unknown as jest.Mock;
const mockTranslateText = translateText as jest.Mock;

// --- Fixtures ---

const mockMessages = {
  CvDetails: { education: "Education" },
} as any;

const makeCv = (overrides = {}) => ({
  name: "My CV",
  education: "Bachelor of Science",
  description: "Experienced developer",
  user: {
    profile: { full_name: "Alice Smith" },
    position: { name: "Frontend Developer" },
  },
  ...overrides,
});

const renderHeader = (cvOverrides = {}, messages = mockMessages) =>
  render(<PreviewHeader cv={makeCv(cvOverrides) as any} messages={messages} />);

describe("PreviewHeader", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseSettingsStore.mockReturnValue({ resumeLanguage: "en" });
    mockTranslateText.mockImplementation((text: string) =>
      Promise.resolve(`translated: ${text}`),
    );
  });

  describe("Static content rendering", () => {
    it("renders user full name", async () => {
      renderHeader();
      expect(screen.getByText("Alice Smith")).toBeInTheDocument();
    });

    it("renders user position", async () => {
      renderHeader();
      expect(screen.getByText("Frontend Developer")).toBeInTheDocument();
    });

    it("renders cv name", async () => {
      renderHeader();
      expect(screen.getByText("My CV")).toBeInTheDocument();
    });

    it("renders education section label from messages", async () => {
      renderHeader();
      expect(screen.getByText("Education")).toBeInTheDocument();
    });

    it("renders 'Unknown User' when full_name is null", async () => {
      renderHeader({
        user: { profile: { full_name: null }, position: { name: "Dev" } },
      });
      expect(screen.getByText("Unknown User")).toBeInTheDocument();
    });

    it("renders 'Unknown User' when profile is null", async () => {
      renderHeader({ user: { profile: null, position: { name: "Dev" } } });
      expect(screen.getByText("Unknown User")).toBeInTheDocument();
    });

    it("renders empty string when position is null", async () => {
      renderHeader({
        user: { profile: { full_name: "Alice" }, position: null },
      });
      expect(screen.getByText("Alice")).toBeInTheDocument();
    });
  });

  describe("Translation", () => {
    it("calls translateText for education and description on mount", async () => {
      renderHeader();
      await waitFor(() => {
        expect(mockTranslateText).toHaveBeenCalledWith(
          "Bachelor of Science",
          "en",
        );
        expect(mockTranslateText).toHaveBeenCalledWith(
          "Experienced developer",
          "en",
        );
      });
    });

    it("renders translated education text", async () => {
      renderHeader();
      await waitFor(() => {
        expect(
          screen.getByText("translated: Bachelor of Science"),
        ).toBeInTheDocument();
      });
    });

    it("renders translated description text", async () => {
      renderHeader();
      await waitFor(() => {
        expect(
          screen.getByText("translated: Experienced developer"),
        ).toBeInTheDocument();
      });
    });

    it("calls translateText with current resumeLanguage", async () => {
      mockUseSettingsStore.mockReturnValue({ resumeLanguage: "de" });
      renderHeader();
      await waitFor(() => {
        expect(mockTranslateText).toHaveBeenCalledWith(
          expect.any(String),
          "de",
        );
      });
    });

    it("does not call translateText for education when it is null", async () => {
      renderHeader({ education: null });
      await waitFor(() => {
        expect(mockTranslateText).not.toHaveBeenCalledWith(
          null,
          expect.anything(),
        );
      });
    });

    it("renders '-' when education is null", async () => {
      renderHeader({ education: null });
      await waitFor(() => {
        expect(screen.getByText("-")).toBeInTheDocument();
      });
    });

    it("renders empty string when description is null", async () => {
      mockTranslateText.mockImplementation((text: string) =>
        Promise.resolve(`translated: ${text}`),
      );
      const { container } = renderHeader({ description: null });
      await waitFor(() => {
        expect(mockTranslateText).toHaveBeenCalledTimes(1);
      });
      const description = container.querySelector(`.description`);
      expect(description?.textContent).toBe("");
    });

    it("re-runs translation when resumeLanguage changes", async () => {
      mockUseSettingsStore.mockReturnValue({ resumeLanguage: "en" });
      const { rerender } = render(
        <PreviewHeader cv={makeCv() as any} messages={mockMessages} />,
      );
      await waitFor(() => expect(mockTranslateText).toHaveBeenCalledTimes(2));

      mockUseSettingsStore.mockReturnValue({ resumeLanguage: "fr" });
      rerender(<PreviewHeader cv={makeCv() as any} messages={mockMessages} />);

      await waitFor(() => {
        expect(mockTranslateText).toHaveBeenCalledWith(
          "Bachelor of Science",
          "fr",
        );
      });
    });
  });

  describe("Error handling", () => {
    it("falls back to original education text on translation error", async () => {
      mockTranslateText.mockRejectedValue(new Error("API error"));
      renderHeader();
      await waitFor(() => {
        expect(screen.getByText("Bachelor of Science")).toBeInTheDocument();
      });
    });

    it("falls back to original description text on translation error", async () => {
      mockTranslateText.mockRejectedValue(new Error("API error"));
      renderHeader();
      await waitFor(() => {
        expect(screen.getByText("Experienced developer")).toBeInTheDocument();
      });
    });

    it("falls back to '-' for education when education is null and translation fails", async () => {
      mockTranslateText.mockRejectedValue(new Error("API error"));
      renderHeader({ education: null });
      await waitFor(() => {
        expect(screen.getByText("-")).toBeInTheDocument();
      });
    });

    it("logs error to console on translation failure", async () => {
      const consoleSpy = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});
      const error = new Error("API error");
      mockTranslateText.mockRejectedValue(error);
      renderHeader();
      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith(error);
      });
      consoleSpy.mockRestore();
    });
  });
});
