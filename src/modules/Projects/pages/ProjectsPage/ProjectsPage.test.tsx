import { render, screen, fireEvent } from "@testing-library/react";
import { ProjectsPage } from "./ProjectsPage";
import { useGetProjects } from "../../hooks/useGetProjects";
import { processProjects } from "../../model/processProjects";

jest.mock("../../hooks/useGetProjects", () => ({
  useGetProjects: jest.fn(),
}));

jest.mock("../../model/processProjects", () => ({
  processProjects: jest.fn(),
}));

jest.mock("@/modules/Projects/ui/ProjectsSearch/ProjectsSearch", () => ({
  ProjectsSearch: ({ value, changeAction, createAction }: any) => (
    <div data-testid="projects-search">
      <input
        data-testid="search-input"
        value={value}
        onChange={(e) => changeAction(e.target.value)}
      />
      <button data-testid="open-modal-btn" onClick={createAction}>
        Create Project
      </button>
    </div>
  ),
}));

jest.mock("@/modules/Projects/ui/CvProjectsTable/ProjectsTable", () => ({
  ProjectsTable: ({ loading, sortField, sortOrder, sortAction }: any) => (
    <div data-testid="projects-table" data-loading={loading}>
      <span data-testid="sort-status">
        {sortField}-{sortOrder}
      </span>
      <button data-testid="sort-name-btn" onClick={() => sortAction("name")}>
        Sort by Name
      </button>
      <button
        data-testid="sort-date-btn"
        onClick={() => sortAction("start_date")}
      >
        Sort by Date
      </button>
    </div>
  ),
}));

jest.mock("@/modules/Projects/ui/AddCvProjectModal/AddCvProjectModal", () => ({
  AddCvProjectModal: ({ open, closeAction }: any) =>
    open ? (
      <div data-testid="add-project-modal">
        <button data-testid="close-modal-btn" onClick={closeAction}>
          Close
        </button>
      </div>
    ) : null,
}));

describe("ProjectsPage Component", () => {
  const mockCvId = "cv-123";
  const mockProjectsData = [{ id: "1", name: "Test Project" }];

  beforeEach(() => {
    jest.clearAllMocks();

    (useGetProjects as jest.Mock).mockReturnValue({
      data: { cv: { projects: mockProjectsData } },
      loading: false,
    });

    (processProjects as jest.Mock).mockReturnValue(mockProjectsData);
  });

  it("should render all sub-components and pass initial states", () => {
    render(<ProjectsPage cvId={mockCvId} />);

    expect(screen.getByTestId("projects-search")).toBeInTheDocument();
    expect(screen.getByTestId("projects-table")).toBeInTheDocument();

    expect(screen.getByTestId("sort-status")).toHaveTextContent("name-asc");

    expect(screen.queryByTestId("add-project-modal")).not.toBeInTheDocument();
  });

  it("should fetch projects using useGetProjects with the correct cvId", () => {
    render(<ProjectsPage cvId={mockCvId} />);
    expect(useGetProjects).toHaveBeenCalledWith(mockCvId);
  });

  it("should update search state when typing in the search input", () => {
    render(<ProjectsPage cvId={mockCvId} />);

    const searchInput = screen.getByTestId("search-input");
    fireEvent.change(searchInput, { target: { value: "React" } });

    expect(processProjects).toHaveBeenCalledWith(
      mockProjectsData,
      "React",
      "name",
      "asc",
    );
  });

  it("should toggle sorting order when clicking the same sort field", () => {
    render(<ProjectsPage cvId={mockCvId} />);

    const sortNameBtn = screen.getByTestId("sort-name-btn");

    fireEvent.click(sortNameBtn);
    expect(screen.getByTestId("sort-status")).toHaveTextContent("name-desc");

    fireEvent.click(sortNameBtn);
    expect(screen.getByTestId("sort-status")).toHaveTextContent("name-asc");
  });

  it("should change sort field and reset order to 'asc' when a new field is clicked", () => {
    render(<ProjectsPage cvId={mockCvId} />);

    fireEvent.click(screen.getByTestId("sort-name-btn"));
    expect(screen.getByTestId("sort-status")).toHaveTextContent("name-desc");

    fireEvent.click(screen.getByTestId("sort-date-btn"));
    expect(screen.getByTestId("sort-status")).toHaveTextContent(
      "start_date-asc",
    );
  });

  it("should open and close the AddCvProjectModal", () => {
    render(<ProjectsPage cvId={mockCvId} />);

    expect(screen.queryByTestId("add-project-modal")).not.toBeInTheDocument();

    fireEvent.click(screen.getByTestId("open-modal-btn"));
    expect(screen.getByTestId("add-project-modal")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("close-modal-btn"));
    expect(screen.queryByTestId("add-project-modal")).not.toBeInTheDocument();
  });

  it("should gracefully handle null or undefined project data from the query", () => {
    (useGetProjects as jest.Mock).mockReturnValue({
      data: null,
      loading: false,
    });

    render(<ProjectsPage cvId={mockCvId} />);

    expect(processProjects).toHaveBeenCalledWith([], "", "name", "asc");
  });
});
