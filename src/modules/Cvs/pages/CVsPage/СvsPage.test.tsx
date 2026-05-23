import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CVsPage } from "./CVsPage";

// --- Mocks ---

jest.mock("../../model/hooks/useGetCVs");
jest.mock("../../model/lib/processCvs");
jest.mock("@/modules/Cvs/ui/CVsToolbar/CVsToolbar");
jest.mock("@/modules/Cvs/ui/CVsTable/CVsTable");
jest.mock("@/modules/Cvs/ui/CreateCvModal/CreateCvModal");

import { useGetCVs } from "../../model/hooks/useGetCVs";
import { processCvs } from "../../model/lib/processCvs";
import { CVsToolbar } from "@/modules/Cvs/ui/CVsToolbar/CVsToolbar";
import { CVsTable } from "@/modules/Cvs/ui/CVsTable/CVsTable";
import { CreateCvModal } from "@/modules/Cvs/ui/CreateCvModal/CreateCvModal";

const mockUseGetCVs = useGetCVs as jest.Mock;
const mockProcessCvs = processCvs as jest.Mock;
const MockCVsToolbar = CVsToolbar as jest.Mock;
const MockCVsTable = CVsTable as jest.Mock;
const MockCreateCvModal = CreateCvModal as jest.Mock;

const mockCvs = [
  { id: "1", name: "Alice CV" },
  { id: "2", name: "Bob CV" },
];

MockCVsToolbar.mockImplementation(({ value, changeAction, createAction }) => (
  <div>
    <input
      data-testid="search-input"
      value={value}
      onChange={(e) => changeAction(e.target.value)}
    />
    <button data-testid="create-button" onClick={createAction}>
      Create
    </button>
  </div>
));
MockCVsTable.mockImplementation(
  ({ cvs, loading, sortField, sortOrder, sortAction }) => (
    <div>
      {loading && <span data-testid="loading-indicator">Loading...</span>}
      {cvs.map((cv: { id: string; name: string }) => (
        <div key={cv.id} data-testid="cv-row">
          {cv.name}
        </div>
      ))}
      <span data-testid="sort-field">{sortField}</span>
      <span data-testid="sort-order">{sortOrder}</span>
      <button data-testid="sort-name" onClick={() => sortAction("name")}>
        Sort by Name
      </button>
      <button data-testid="sort-date" onClick={() => sortAction("createdAt")}>
        Sort by Date
      </button>
    </div>
  ),
);

MockCreateCvModal.mockImplementation(({ isOpen, closeAction }) => (
  <div>
    {isOpen && (
      <div data-testid="create-modal">
        <button data-testid="close-modal" onClick={closeAction}>
          Close
        </button>
      </div>
    )}
  </div>
));

mockProcessCvs.mockImplementation((cvs) => cvs);

const renderPage = () => render(<CVsPage />);

describe("CVsPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockProcessCvs.mockImplementation((cvs) => cvs);
  });

  describe("Rendering", () => {
    it("renders page title", () => {
      mockUseGetCVs.mockReturnValue({ data: null, loading: false });
      renderPage();
      expect(screen.getByText("CVs")).toBeInTheDocument();
    });

    it("renders CVsToolbar", () => {
      mockUseGetCVs.mockReturnValue({ data: null, loading: false });
      renderPage();
      expect(screen.getByTestId("search-input")).toBeInTheDocument();
    });

    it("renders CVsTable", () => {
      mockUseGetCVs.mockReturnValue({ data: null, loading: false });
      renderPage();
      expect(screen.getByTestId("sort-field")).toBeInTheDocument();
    });

    it("renders CreateCvModal", () => {
      mockUseGetCVs.mockReturnValue({ data: null, loading: false });
      renderPage();
      expect(MockCreateCvModal).toHaveBeenCalled();
    });

    it("passes loading=true to CVsTable while fetching", () => {
      mockUseGetCVs.mockReturnValue({ data: null, loading: true });
      renderPage();
      expect(screen.getByTestId("loading-indicator")).toBeInTheDocument();
    });

    it("passes loading=false to CVsTable when data is ready", () => {
      mockUseGetCVs.mockReturnValue({ data: { cvs: mockCvs }, loading: false });
      renderPage();
      expect(screen.queryByTestId("loading-indicator")).not.toBeInTheDocument();
    });

    it("renders cv rows returned by processCvs", () => {
      mockUseGetCVs.mockReturnValue({ data: { cvs: mockCvs }, loading: false });
      renderPage();
      expect(screen.getAllByTestId("cv-row")).toHaveLength(2);
      expect(screen.getByText("Alice CV")).toBeInTheDocument();
      expect(screen.getByText("Bob CV")).toBeInTheDocument();
    });

    it("renders empty table when data is null", () => {
      mockUseGetCVs.mockReturnValue({ data: null, loading: false });
      renderPage();
      expect(screen.queryAllByTestId("cv-row")).toHaveLength(0);
    });

    it("renders modal as closed by default", () => {
      mockUseGetCVs.mockReturnValue({ data: null, loading: false });
      renderPage();
      expect(screen.queryByTestId("create-modal")).not.toBeInTheDocument();
    });

    it("initializes sort with field=name and order=asc", () => {
      mockUseGetCVs.mockReturnValue({ data: null, loading: false });
      renderPage();
      expect(screen.getByTestId("sort-field")).toHaveTextContent("name");
      expect(screen.getByTestId("sort-order")).toHaveTextContent("asc");
    });
  });

  describe("Search", () => {
    it("passes search value to CVsToolbar", async () => {
      mockUseGetCVs.mockReturnValue({ data: { cvs: mockCvs }, loading: false });
      renderPage();
      const input = screen.getByTestId("search-input");
      await userEvent.type(input, "Alice");
      expect(input).toHaveValue("Alice");
    });

    it("calls processCvs with updated search term", async () => {
      mockUseGetCVs.mockReturnValue({ data: { cvs: mockCvs }, loading: false });
      renderPage();
      await userEvent.type(screen.getByTestId("search-input"), "Bob");
      await waitFor(() => {
        const lastCall = mockProcessCvs.mock.calls.at(-1);
        expect(lastCall[1]).toBe("Bob");
      });
    });

    it("calls processCvs with empty string initially", () => {
      mockUseGetCVs.mockReturnValue({ data: { cvs: mockCvs }, loading: false });
      renderPage();
      expect(mockProcessCvs).toHaveBeenCalledWith(mockCvs, "", "name", "asc");
    });
  });

  describe("Sorting", () => {
    it("toggles sort order to desc when clicking the active sort field", async () => {
      mockUseGetCVs.mockReturnValue({ data: null, loading: false });
      renderPage();
      await userEvent.click(screen.getByTestId("sort-name"));
      expect(screen.getByTestId("sort-order")).toHaveTextContent("desc");
    });

    it("resets sort order to asc when switching to a different field", async () => {
      mockUseGetCVs.mockReturnValue({ data: null, loading: false });
      renderPage();
      await userEvent.click(screen.getByTestId("sort-name"));
      await userEvent.click(screen.getByTestId("sort-date"));
      expect(screen.getByTestId("sort-field")).toHaveTextContent("createdAt");
      expect(screen.getByTestId("sort-order")).toHaveTextContent("asc");
    });

    it("changes sort field when a different column is clicked", async () => {
      mockUseGetCVs.mockReturnValue({ data: null, loading: false });
      renderPage();
      await userEvent.click(screen.getByTestId("sort-date"));
      expect(screen.getByTestId("sort-field")).toHaveTextContent("createdAt");
    });

    it("toggles back to asc after desc on same field", async () => {
      mockUseGetCVs.mockReturnValue({ data: null, loading: false });
      renderPage();
      await userEvent.click(screen.getByTestId("sort-name"));
      await userEvent.click(screen.getByTestId("sort-name"));
      expect(screen.getByTestId("sort-order")).toHaveTextContent("asc");
    });

    it("passes current sortField and sortOrder to processCvs", async () => {
      mockUseGetCVs.mockReturnValue({ data: { cvs: mockCvs }, loading: false });
      renderPage();
      await userEvent.click(screen.getByTestId("sort-date"));
      await waitFor(() => {
        const lastCall = mockProcessCvs.mock.calls.at(-1);
        expect(lastCall[2]).toBe("createdAt");
        expect(lastCall[3]).toBe("asc");
      });
    });
  });

  describe("Create CV modal", () => {
    it("opens modal when create button is clicked", async () => {
      mockUseGetCVs.mockReturnValue({ data: null, loading: false });
      renderPage();
      await userEvent.click(screen.getByTestId("create-button"));
      expect(screen.getByTestId("create-modal")).toBeInTheDocument();
    });

    it("closes modal when closeAction is called", async () => {
      mockUseGetCVs.mockReturnValue({ data: null, loading: false });
      renderPage();
      await userEvent.click(screen.getByTestId("create-button"));
      await userEvent.click(screen.getByTestId("close-modal"));
      expect(screen.queryByTestId("create-modal")).not.toBeInTheDocument();
    });

    it("does not open modal without clicking create", () => {
      mockUseGetCVs.mockReturnValue({ data: null, loading: false });
      renderPage();
      expect(screen.queryByTestId("create-modal")).not.toBeInTheDocument();
    });
  });

  describe("processCvs integration", () => {
    it("passes empty array to processCvs when data.cvs is undefined", () => {
      mockUseGetCVs.mockReturnValue({ data: {}, loading: false });
      renderPage();
      expect(mockProcessCvs).toHaveBeenCalledWith([], "", "name", "asc");
    });

    it("passes cvs array from data to processCvs", () => {
      mockUseGetCVs.mockReturnValue({ data: { cvs: mockCvs }, loading: false });
      renderPage();
      expect(mockProcessCvs).toHaveBeenCalledWith(mockCvs, "", "name", "asc");
    });

    it("renders filtered cvs returned by processCvs", () => {
      mockUseGetCVs.mockReturnValue({ data: { cvs: mockCvs }, loading: false });
      mockProcessCvs.mockReturnValue([{ id: "1", name: "Alice CV" }]);
      renderPage();
      expect(screen.getAllByTestId("cv-row")).toHaveLength(1);
      expect(screen.getByText("Alice CV")).toBeInTheDocument();
    });
  });
});
