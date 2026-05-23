import { render, screen, waitFor } from "@testing-library/react";
import { PreviewProjects } from "./PreviewProjects";

jest.mock("@/modules/Settings/model/settings.store");
jest.mock("@/shared/api/translateText");

import { useSettingsStore } from "@/modules/Settings/model/settings.store";
import { translateText } from "@/shared/api/translateText";

const mockUseSettingsStore = useSettingsStore as jest.Mock;
const mockTranslateText = translateText as jest.Mock;

const mockMessages = {
  Preview: {
    projects: "Projects",
    period: "Period",
    roles: "Roles",
    responsibilities: "Responsibilities",
    tillNow: "Till now",
  },
} as any;

const makeProject = (overrides = {}) => ({
  id: "proj-1",
  start_date: "2022-01",
  end_date: "2023-01",
  responsibilities: ["Led team", "Code review"],
  roles: ["Developer", "Mentor"],
  project: {
    name: "Project Alpha",
    description: "A great project",
    environment: ["React", "Node.js"],
  },
  ...overrides,
});

const renderComponent = (projects = [makeProject()], messages = mockMessages) =>
  render(<PreviewProjects projects={projects as any} messages={messages} />);

describe("PreviewProjects", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseSettingsStore.mockReturnValue({ resumeLanguage: "en" });
    mockTranslateText.mockImplementation((text: string) =>
      Promise.resolve(`translated: ${text}`),
    );
  });

  describe("Rendering", () => {
    it("renders section title from messages", () => {
      renderComponent();
      expect(screen.getByText("Projects")).toBeInTheDocument();
    });

    it("renders project name", () => {
      renderComponent();
      expect(screen.getByText("Project Alpha")).toBeInTheDocument();
    });

    it("renders project environment", () => {
      renderComponent();
      expect(screen.getByText("React, Node.js")).toBeInTheDocument();
    });

    it("renders period label and dates", () => {
      renderComponent();
      expect(screen.getByText("Period")).toBeInTheDocument();
      expect(screen.getByText("2022-01 — 2023-01")).toBeInTheDocument();
    });

    it("renders 'Till now' when end_date is null", () => {
      renderComponent([makeProject({ end_date: null })]);
      expect(screen.getByText("2022-01 — Till now")).toBeInTheDocument();
    });

    it("renders roles label and items", () => {
      renderComponent();
      expect(screen.getByText("Roles")).toBeInTheDocument();
      expect(screen.getByText("Developer")).toBeInTheDocument();
      expect(screen.getByText("Mentor")).toBeInTheDocument();
    });

    it("renders responsibilities label and items", () => {
      renderComponent();
      expect(screen.getByText("Responsibilities")).toBeInTheDocument();
      expect(screen.getByText("Led team")).toBeInTheDocument();
      expect(screen.getByText("Code review")).toBeInTheDocument();
    });

    it("does not render roles section when roles is empty", () => {
      renderComponent([makeProject({ roles: [] })]);
      expect(screen.queryByText("Roles")).not.toBeInTheDocument();
    });

    it("does not render responsibilities section when responsibilities is empty", () => {
      renderComponent([makeProject({ responsibilities: [] })]);
      expect(screen.queryByText("Responsibilities")).not.toBeInTheDocument();
    });

    it("renders multiple projects", () => {
      const projects = [
        makeProject({
          id: "proj-1",
          project: { name: "Alpha", description: "Desc A", environment: [] },
        }),
        makeProject({
          id: "proj-2",
          project: { name: "Beta", description: "Desc B", environment: [] },
        }),
      ];
      renderComponent(projects);
      expect(screen.getByText("Alpha")).toBeInTheDocument();
      expect(screen.getByText("Beta")).toBeInTheDocument();
    });

    it("renders nothing when projects is empty", () => {
      renderComponent([]);
      expect(screen.queryByRole("article")).not.toBeInTheDocument();
    });

    it("renders original description before translation resolves", () => {
      mockTranslateText.mockReturnValue(new Promise(() => {}));
      renderComponent();
      expect(screen.getByText("A great project")).toBeInTheDocument();
    });

    it("renders original roles before translation resolves", () => {
      mockTranslateText.mockReturnValue(new Promise(() => {}));
      renderComponent();
      expect(screen.getByText("Developer")).toBeInTheDocument();
    });
  });

  describe("Translation", () => {
    it("calls translateText for project description", async () => {
      renderComponent();
      await waitFor(() => {
        expect(mockTranslateText).toHaveBeenCalledWith("A great project", "en");
      });
    });

    it("calls translateText for each responsibility", async () => {
      renderComponent();
      await waitFor(() => {
        expect(mockTranslateText).toHaveBeenCalledWith("Led team", "en");
        expect(mockTranslateText).toHaveBeenCalledWith("Code review", "en");
      });
    });

    it("calls translateText for each role", async () => {
      renderComponent();
      await waitFor(() => {
        expect(mockTranslateText).toHaveBeenCalledWith("Developer", "en");
        expect(mockTranslateText).toHaveBeenCalledWith("Mentor", "en");
      });
    });

    it("renders translated description", async () => {
      renderComponent();
      await waitFor(() => {
        expect(
          screen.getByText("translated: A great project"),
        ).toBeInTheDocument();
      });
    });

    it("renders translated roles", async () => {
      renderComponent();
      await waitFor(() => {
        expect(screen.getByText("translated: Developer")).toBeInTheDocument();
        expect(screen.getByText("translated: Mentor")).toBeInTheDocument();
      });
    });

    it("renders translated responsibilities", async () => {
      renderComponent();
      await waitFor(() => {
        expect(screen.getByText("translated: Led team")).toBeInTheDocument();
        expect(screen.getByText("translated: Code review")).toBeInTheDocument();
      });
    });

    it("does not call translateText when description is null", async () => {
      renderComponent([
        makeProject({
          project: { name: "Alpha", description: null, environment: [] },
        }),
      ]);
      await waitFor(() => {
        expect(mockTranslateText).not.toHaveBeenCalledWith(
          null,
          expect.anything(),
        );
      });
    });

    it("calls translateText with current resumeLanguage", async () => {
      mockUseSettingsStore.mockReturnValue({ resumeLanguage: "de" });
      renderComponent();
      await waitFor(() => {
        expect(mockTranslateText).toHaveBeenCalledWith(
          expect.any(String),
          "de",
        );
      });
    });

    it("does not call translateText when projects list is empty", async () => {
      renderComponent([]);
      await waitFor(() => {
        expect(mockTranslateText).not.toHaveBeenCalled();
      });
    });

    it("re-runs translation when resumeLanguage changes", async () => {
      mockUseSettingsStore.mockReturnValue({ resumeLanguage: "en" });
      const projects = [makeProject()];
      const { rerender } = render(
        <PreviewProjects projects={projects as any} messages={mockMessages} />,
      );
      await waitFor(() => expect(mockTranslateText).toHaveBeenCalled());

      mockTranslateText.mockClear();
      mockUseSettingsStore.mockReturnValue({ resumeLanguage: "fr" });
      rerender(
        <PreviewProjects projects={projects as any} messages={mockMessages} />,
      );

      await waitFor(() => {
        expect(mockTranslateText).toHaveBeenCalledWith(
          expect.any(String),
          "fr",
        );
      });
    });

    it("re-runs translation when projects change", async () => {
      const projects = [makeProject()];
      const { rerender } = render(
        <PreviewProjects projects={projects as any} messages={mockMessages} />,
      );
      await waitFor(() => expect(mockTranslateText).toHaveBeenCalled());

      mockTranslateText.mockClear();
      const newProjects = [
        makeProject({
          id: "proj-2",
          project: { name: "Beta", description: "New desc", environment: [] },
        }),
      ];
      rerender(
        <PreviewProjects
          projects={newProjects as any}
          messages={mockMessages}
        />,
      );

      await waitFor(() => {
        expect(mockTranslateText).toHaveBeenCalledWith("New desc", "en");
      });
    });
  });

  describe("Error handling", () => {
    it("falls back to original description when translation fails", async () => {
      mockTranslateText.mockRejectedValue(new Error("API error"));
      renderComponent();
      await waitFor(() => {
        expect(screen.getByText("A great project")).toBeInTheDocument();
      });
    });

    it("falls back to original roles when translation fails", async () => {
      mockTranslateText.mockRejectedValue(new Error("API error"));
      renderComponent();
      await waitFor(() => {
        expect(screen.getByText("Developer")).toBeInTheDocument();
        expect(screen.getByText("Mentor")).toBeInTheDocument();
      });
    });

    it("falls back to original responsibilities when translation fails", async () => {
      mockTranslateText.mockRejectedValue(new Error("API error"));
      renderComponent();
      await waitFor(() => {
        expect(screen.getByText("Led team")).toBeInTheDocument();
        expect(screen.getByText("Code review")).toBeInTheDocument();
      });
    });

    it("falls back to empty string when description is null and translation fails", async () => {
      mockTranslateText.mockRejectedValue(new Error("API error"));
      const project = makeProject({
        project: { name: "Alpha", description: null, environment: [] },
      });
      const { container } = renderComponent([project]);
      await waitFor(() => expect(mockTranslateText).toHaveBeenCalled());
      const article = container.querySelector("article");
      expect(article).toBeInTheDocument();
    });

    it("handles partial project failures independently", async () => {
      mockTranslateText
        .mockResolvedValueOnce("translated: A great project")
        .mockResolvedValueOnce("translated: Led team")
        .mockResolvedValueOnce("translated: Code review")
        .mockResolvedValueOnce("translated: Developer")
        .mockResolvedValueOnce("translated: Mentor")
        .mockRejectedValue(new Error("API error"));

      const projects = [
        makeProject({ id: "proj-1" }),
        makeProject({
          id: "proj-2",
          project: { name: "Beta", description: "Beta desc", environment: [] },
          responsibilities: ["Task A"],
          roles: ["PM"],
        }),
      ];
      renderComponent(projects);
      await waitFor(() => {
        expect(
          screen.getByText("translated: A great project"),
        ).toBeInTheDocument();
        expect(screen.getByText("Beta desc")).toBeInTheDocument();
      });
    });
  });
});
