import { render, screen } from "@testing-library/react";
import { CvPreviewPage } from "./CvPreviewPage";

// --- Mocks ---

jest.mock("@apollo/client/react", () => ({
  useQuery: jest.fn(),
}));
jest.mock("@/modules/Cvs/api/queries", () => ({
  GET_CV: "GET_CV",
}));
jest.mock("@/shared/ui/Loading");
jest.mock("@/modules/CvsPreview/ui/PreviewExportButton/PreviewExportButton");
jest.mock("@/modules/CvsPreview/ui/PreviewHeader/PreviewHeader");
jest.mock("@/modules/CvsPreview/ui/PreviewLanguages/PreviewLanguages");
jest.mock("@/modules/CvsPreview/ui/PreviewProjects/PreviewProjects");
jest.mock("@/modules/CvsPreview/ui/PreviewSkills/PreviewSkills");
jest.mock("@/modules/Settings/ui/ResumeLanguage");
jest.mock("@/modules/Settings/model/settings.store");
jest.mock("@/shared/lib/getMessages");

import { useQuery } from "@apollo/client/react";
import { useSettingsStore } from "@/modules/Settings/model/settings.store";
import { getMessages } from "@/shared/lib/getMessages";
import { Loading } from "@/shared/ui/Loading";
import { PreviewExportButton } from "@/modules/CvsPreview/ui/PreviewExportButton/PreviewExportButton";
import { PreviewHeader } from "@/modules/CvsPreview/ui/PreviewHeader/PreviewHeader";
import { PreviewLanguages } from "@/modules/CvsPreview/ui/PreviewLanguages/PreviewLanguages";
import { PreviewProjects } from "@/modules/CvsPreview/ui/PreviewProjects/PreviewProjects";
import { PreviewSkills } from "@/modules/CvsPreview/ui/PreviewSkills/PreviewSkills";
import { ResumeLanguage } from "@/modules/Settings/ui/ResumeLanguage";
import { GET_CV } from "@/modules/Cvs/api/queries";

const mockUseQuery = useQuery as jest.Mock;
const mockUseSettingsStore = useSettingsStore as jest.Mock;
const mockGetMessages = getMessages as jest.Mock;
const MockLoading = Loading as jest.Mock;
const MockPreviewExportButton = PreviewExportButton as jest.Mock;
const MockPreviewHeader = PreviewHeader as jest.Mock;
const MockPreviewLanguages = PreviewLanguages as jest.Mock;
const MockPreviewProjects = PreviewProjects as jest.Mock;
const MockPreviewSkills = PreviewSkills as jest.Mock;
const MockResumeLanguage = ResumeLanguage as jest.Mock;

const mockCv = {
  id: "cv-1",
  name: "Alice",
  languages: [{ id: "lang-1", name: "English" }],
  projects: [{ id: "proj-1", name: "Project A" }],
  skills: [{ id: "skill-1", name: "TypeScript" }],
};

const mockMessages = {
  Settings: { resumeLanguage: "Resume Language" },
};

const renderPage = (cvId = "cv-1") => render(<CvPreviewPage cvId={cvId} />);

describe("CvPreviewPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseSettingsStore.mockReturnValue({ resumeLanguage: "en" });
    mockGetMessages.mockReturnValue(mockMessages);
    MockLoading.mockReturnValue(<div data-testid="loading" />);
    MockPreviewExportButton.mockReturnValue(
      <div data-testid="export-button" />,
    );
    MockPreviewHeader.mockReturnValue(<div data-testid="preview-header" />);
    MockPreviewLanguages.mockReturnValue(
      <div data-testid="preview-languages" />,
    );
    MockPreviewProjects.mockReturnValue(<div data-testid="preview-projects" />);
    MockPreviewSkills.mockReturnValue(<div data-testid="preview-skills" />);
    MockResumeLanguage.mockReturnValue(<div data-testid="resume-language" />);
  });

  describe("Loading state", () => {
    it("renders Loading component when loading is true", () => {
      mockUseQuery.mockReturnValue({
        data: null,
        loading: true,
        error: undefined,
      });
      renderPage();
      expect(screen.getByTestId("loading")).toBeInTheDocument();
    });

    it("does not render page content while loading", () => {
      mockUseQuery.mockReturnValue({
        data: null,
        loading: true,
        error: undefined,
      });
      renderPage();
      expect(screen.queryByTestId("preview-header")).not.toBeInTheDocument();
    });
  });

  describe("Error state", () => {
    it("renders nothing when error is present", () => {
      mockUseQuery.mockReturnValue({
        data: null,
        loading: false,
        error: new Error("Network error"),
      });
      const { container } = renderPage();
      expect(container).toBeEmptyDOMElement();
    });

    it("renders nothing when data.cv is null", () => {
      mockUseQuery.mockReturnValue({
        data: { cv: null },
        loading: false,
        error: undefined,
      });
      const { container } = renderPage();
      expect(container).toBeEmptyDOMElement();
    });

    it("renders nothing when data is undefined", () => {
      mockUseQuery.mockReturnValue({
        data: undefined,
        loading: false,
        error: undefined,
      });
      const { container } = renderPage();
      expect(container).toBeEmptyDOMElement();
    });

    it("does not render Loading when error is present", () => {
      mockUseQuery.mockReturnValue({
        data: null,
        loading: false,
        error: new Error("Network error"),
      });
      renderPage();
      expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
    });
  });

  describe("Success state rendering", () => {
    beforeEach(() => {
      mockUseQuery.mockReturnValue({
        data: { cv: mockCv },
        loading: false,
        error: undefined,
      });
    });

    it("renders PreviewHeader", () => {
      renderPage();
      expect(screen.getByTestId("preview-header")).toBeInTheDocument();
    });

    it("renders PreviewExportButton", () => {
      renderPage();
      expect(screen.getByTestId("export-button")).toBeInTheDocument();
    });

    it("renders PreviewLanguages", () => {
      renderPage();
      expect(screen.getByTestId("preview-languages")).toBeInTheDocument();
    });

    it("renders PreviewProjects", () => {
      renderPage();
      expect(screen.getByTestId("preview-projects")).toBeInTheDocument();
    });

    it("renders PreviewSkills", () => {
      renderPage();
      expect(screen.getByTestId("preview-skills")).toBeInTheDocument();
    });

    it("renders ResumeLanguage", () => {
      renderPage();
      expect(screen.getByTestId("resume-language")).toBeInTheDocument();
    });

    it("does not render Loading in success state", () => {
      renderPage();
      expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
    });
  });

  describe("useQuery call", () => {
    it("calls useQuery with GET_CV document and cvId variable", () => {
      mockUseQuery.mockReturnValue({
        data: null,
        loading: true,
        error: undefined,
      });
      renderPage("cv-42");
      expect(mockUseQuery).toHaveBeenCalledWith(
        GET_CV,
        expect.objectContaining({ variables: { cvId: "cv-42" } }),
      );
    });

    it("passes correct cvId variable to useQuery", () => {
      mockUseQuery.mockReturnValue({
        data: null,
        loading: true,
        error: undefined,
      });
      renderPage("cv-999");
      expect(mockUseQuery).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({ variables: { cvId: "cv-999" } }),
      );
    });
  });

  describe("Props passed to child components", () => {
    beforeEach(() => {
      mockUseQuery.mockReturnValue({
        data: { cv: mockCv },
        loading: false,
        error: undefined,
      });
    });

    // React 18 вызывает компоненты как fn(props, undefined) — второй аргумент всегда undefined
    it("passes cv and messages to PreviewHeader", () => {
      renderPage();
      expect(MockPreviewHeader).toHaveBeenCalledWith(
        expect.objectContaining({ cv: mockCv, messages: mockMessages }),
        undefined,
      );
    });

    it("passes languages and messages to PreviewLanguages", () => {
      renderPage();
      expect(MockPreviewLanguages).toHaveBeenCalledWith(
        expect.objectContaining({
          languages: mockCv.languages,
          messages: mockMessages,
        }),
        undefined,
      );
    });

    it("passes projects and messages to PreviewProjects", () => {
      renderPage();
      expect(MockPreviewProjects).toHaveBeenCalledWith(
        expect.objectContaining({
          projects: mockCv.projects,
          messages: mockMessages,
        }),
        undefined,
      );
    });

    it("passes skills and messages to PreviewSkills", () => {
      renderPage();
      expect(MockPreviewSkills).toHaveBeenCalledWith(
        expect.objectContaining({
          skills: mockCv.skills,
          messages: mockMessages,
        }),
        undefined,
      );
    });

    it("passes resume language label to ResumeLanguage", () => {
      renderPage();
      expect(MockResumeLanguage).toHaveBeenCalledWith(
        expect.objectContaining({
          label: mockMessages.Settings.resumeLanguage,
        }),
        undefined,
      );
    });

    it("passes empty arrays when cv.languages is null", () => {
      mockUseQuery.mockReturnValue({
        data: { cv: { ...mockCv, languages: null } },
        loading: false,
        error: undefined,
      });
      renderPage();
      expect(MockPreviewLanguages).toHaveBeenCalledWith(
        expect.objectContaining({ languages: [] }),
        undefined,
      );
    });

    it("passes empty arrays when cv.projects is null", () => {
      mockUseQuery.mockReturnValue({
        data: { cv: { ...mockCv, projects: null } },
        loading: false,
        error: undefined,
      });
      renderPage();
      expect(MockPreviewProjects).toHaveBeenCalledWith(
        expect.objectContaining({ projects: [] }),
        undefined,
      );
    });

    it("passes empty arrays when cv.skills is null", () => {
      mockUseQuery.mockReturnValue({
        data: { cv: { ...mockCv, skills: null } },
        loading: false,
        error: undefined,
      });
      renderPage();
      expect(MockPreviewSkills).toHaveBeenCalledWith(
        expect.objectContaining({ skills: [] }),
        undefined,
      );
    });

    it("passes previewRef to PreviewExportButton", () => {
      renderPage();
      expect(MockPreviewExportButton).toHaveBeenCalledWith(
        expect.objectContaining({
          previewRef: { current: expect.anything() },
        }),
        undefined,
      );
    });
  });

  describe("getMessages and settings", () => {
    it("calls useSettingsStore to get resumeLanguage", () => {
      mockUseQuery.mockReturnValue({
        data: null,
        loading: true,
        error: undefined,
      });
      renderPage();
      expect(mockUseSettingsStore).toHaveBeenCalled();
    });

    it("calls getMessages with resumeLanguage from store", () => {
      mockUseQuery.mockReturnValue({
        data: null,
        loading: true,
        error: undefined,
      });
      mockUseSettingsStore.mockReturnValue({ resumeLanguage: "de" });
      renderPage();
      expect(mockGetMessages).toHaveBeenCalledWith("de");
    });
  });
});
