import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useQuery } from "@apollo/client/react";
import { Projects } from "./Projects";

const mockCreateProject = jest.fn();
jest.mock("@/modules/Projects/hooks/useCreateProject", () => ({
  useCreateProject: () => ({
    createProject: mockCreateProject,
    loading: false,
  }),
}));

const mockHandleSort = jest.fn();
jest.mock("@/shared/helpers/useTableState", () => ({
  useTableState: () => ({
    sortField: "name",
    sortOrder: "asc",
    handleSort: mockHandleSort,
  }),
}));

const mockProcessProjects = jest.fn();
jest.mock("@/modules/Projects/model/lib/processProjects", () => ({
  processProjects: (...args: any[]) => mockProcessProjects(...args),
}));

jest.mock("@/modules/Projects/ui/ProjectsToolbar/ProjectsToolbar", () => ({
  ProjectsToolbar: ({ value, changeAction, createAction }: any) => (
    <div data-testid="projects-toolbar">
      <input
        data-testid="toolbar-search"
        value={value}
        onChange={(e) => changeAction(e.target.value)}
      />
      <button data-testid="toolbar-create-btn" onClick={createAction}>
        Create
      </button>
    </div>
  ),
}));

jest.mock("@/modules/Projects/ui/ProjectsTable/ProjectsTable", () => ({
  ProjectsTable: ({ projects, sortAction }: any) => (
    <div data-testid="projects-table">
      <span data-testid="table-projects-data">{JSON.stringify(projects)}</span>
      <button data-testid="table-sort-btn" onClick={() => sortAction("domain")}>
        Sort
      </button>
    </div>
  ),
}));

jest.mock("@/modules/Projects/ui/ProjectModal/ProjectModal", () => ({
  ProjectModal: ({ open, toggleAction, submitAction }: any) =>
    open ? (
      <div data-testid="project-modal">
        <button data-testid="modal-close-btn" onClick={toggleAction}>
          Close
        </button>
        <button
          data-testid="modal-submit-btn"
          onClick={() =>
            submitAction({
              name: "New Mock Project",
              domain: "mock.com",
              description: "Mock desc",
              environment: ["dev"],
              start_date: "2026-05-22",
            })
          }
        >
          Submit
        </button>
      </div>
    ) : null,
}));

jest.mock("@apollo/client/react", () => ({
  useQuery: jest.fn(),
}));

describe("Projects Component", () => {
  const mockProjectsData = {
    projects: [{ id: "1", name: "Project 1" }],
  };

  const mockUseQuery = useQuery as unknown as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseQuery.mockReturnValue({ data: mockProjectsData, loading: false });

    mockProcessProjects.mockReturnValue([{ id: "1", name: "Project 1" }]);
  });

  it("should render Toolbar and Table correctly", () => {
    render(<Projects />);

    expect(screen.getByTestId("projects-toolbar")).toBeInTheDocument();
    expect(screen.getByTestId("projects-table")).toBeInTheDocument();
    expect(screen.getByTestId("table-projects-data")).toHaveTextContent(
      JSON.stringify([{ id: "1", name: "Project 1" }]),
    );
  });

  it("should handle search input changes", () => {
    render(<Projects />);

    fireEvent.change(screen.getByTestId("toolbar-search"), {
      target: { value: "test search" },
    });

    expect(mockProcessProjects).toHaveBeenCalledWith(
      mockProjectsData.projects,
      "test search",
      "name",
      "asc",
    );
  });

  it("should handle sorting from table", () => {
    render(<Projects />);

    fireEvent.click(screen.getByTestId("table-sort-btn"));

    expect(mockHandleSort).toHaveBeenCalledWith("domain");
  });

  it("should open modal when create action is triggered", () => {
    render(<Projects />);

    expect(screen.queryByTestId("project-modal")).not.toBeInTheDocument();

    fireEvent.click(screen.getByTestId("toolbar-create-btn"));

    expect(screen.getByTestId("project-modal")).toBeInTheDocument();
  });

  it("should close modal when toggle action is triggered", () => {
    render(<Projects />);

    fireEvent.click(screen.getByTestId("toolbar-create-btn"));
    expect(screen.getByTestId("project-modal")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("modal-close-btn"));

    expect(screen.queryByTestId("project-modal")).not.toBeInTheDocument();
  });

  it("should submit new project and close modal", async () => {
    render(<Projects />);

    fireEvent.click(screen.getByTestId("toolbar-create-btn"));
    fireEvent.click(screen.getByTestId("modal-submit-btn"));

    expect(mockCreateProject).toHaveBeenCalledWith({
      variables: {
        project: {
          name: "New Mock Project",
          domain: "mock.com",
          description: "Mock desc",
          environment: ["dev"],
          start_date: "2026-05-22",
        },
      },
    });

    await waitFor(() => {
      expect(screen.queryByTestId("project-modal")).not.toBeInTheDocument();
    });
  });
});
