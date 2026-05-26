import { render, screen, fireEvent } from "@testing-library/react";
import { ProjectsTable } from "./ProjectsTable";

const mockSortAction = jest.fn();

jest.mock("next-intl", () => ({
  useTranslations: jest.fn(() => (key: string) => key),
}));

type MockProjectActionsProps = {
  cvId: string;
  projectId: string;
};

jest.mock("./ProjectActions/ProjectActions", () => ({
  ProjectActions: ({ cvId, projectId }: MockProjectActionsProps) => (
    <div>
      actions:
      {cvId}:{projectId}
    </div>
  ),
}));

type MockColumn<T> = {
  key: string;
  title: string;
  sortable?: boolean;
  render: (item: T) => React.ReactNode;
};

type MockDetailsTableProps<T> = {
  data: T[];
  columns: MockColumn<T>[];
  loading: boolean;
  rowKey: (item: T) => string;
  sortField: string;
  sortOrder: string;
  onSort: (field: string) => void;
  renderDetails: (item: T) => React.ReactNode;
};

jest.mock("@/shared/ui/DetailsTable/DetailsTable", () => ({
  DetailsTable: <T,>({
    data,
    columns,
    onSort,
    renderDetails,
  }: MockDetailsTableProps<T>) => (
    <div>
      {columns.map((column) => (
        <button
          key={column.key}
          type="button"
          onClick={() => onSort(column.key)}
        >
          {column.title}
        </button>
      ))}

      {data.map((item) => (
        <div key={JSON.stringify(item)}>
          {columns.map((column) => (
            <div key={column.key}>{column.render(item)}</div>
          ))}

          <div>{renderDetails(item)}</div>
        </div>
      ))}
    </div>
  ),
}));

jest.mock("./ProjectsTable.module.css", () => ({
  nameColumn: "nameColumn",
  domainColumn: "domainColumn",
  dateColumn: "dateColumn",
  actionsColumn: "actionsColumn",
  cellContent: "cellContent",
  details: "details",
  description: "description",
  responsibilities: "responsibilities",
  environment: "environment",
  tag: "tag",
}));

describe("ProjectsTable", () => {
  const mockProjects = [
    {
      id: "cv-project-1",
      project: {
        id: "project-1",
        name: "CRM Platform",
        internal_name: "crm-platform",
        domain: "Fintech",
        description: "Internal CRM system",
        environment: ["React", "GraphQL"],
      },
      start_date: "2024-01-01",
      end_date: "2024-12-31",
      responsibilities: ["Created UI", "Configured Apollo"],
      roles: ["Frontend Developer"],
    },
    {
      id: "cv-project-2",
      project: {
        id: "project-2",
        name: "HR Dashboard",
        internal_name: "hr-dashboard",
        domain: "HR",
        description: "Dashboard for HR",
        environment: [],
      },
      start_date: "2023-01-01",
      end_date: null,
      responsibilities: [],
      roles: [],
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders project names", () => {
    render(
      <ProjectsTable
        cvId="cv-1"
        projects={mockProjects}
        loading={false}
        sortField="name"
        sortOrder="asc"
        sortAction={mockSortAction}
      />,
    );
    expect(screen.getByText("CRM Platform")).toBeInTheDocument();
    expect(screen.getByText("HR Dashboard")).toBeInTheDocument();
  });

  it("renders domains", () => {
    render(
      <ProjectsTable
        cvId="cv-1"
        projects={mockProjects}
        loading={false}
        sortField="name"
        sortOrder="asc"
        sortAction={mockSortAction}
      />,
    );
    expect(screen.getByText("Fintech")).toBeInTheDocument();
    expect(screen.getByText("HR")).toBeInTheDocument();
  });

  it("renders Till now when end_date is null", () => {
    render(
      <ProjectsTable
        cvId="cv-1"
        projects={mockProjects}
        loading={false}
        sortField="name"
        sortOrder="asc"
        sortAction={mockSortAction}
      />,
    );
    expect(screen.getByText("Till now")).toBeInTheDocument();
  });

  it("renders ProjectActions", () => {
    render(
      <ProjectsTable
        cvId="cv-99"
        projects={mockProjects}
        loading={false}
        sortField="name"
        sortOrder="asc"
        sortAction={mockSortAction}
      />,
    );
    expect(screen.getByText("actions:cv-99:project-1")).toBeInTheDocument();
    expect(screen.getByText("actions:cv-99:project-2")).toBeInTheDocument();
  });

  it("renders description", () => {
    render(
      <ProjectsTable
        cvId="cv-1"
        projects={mockProjects}
        loading={false}
        sortField="name"
        sortOrder="asc"
        sortAction={mockSortAction}
      />,
    );
    expect(screen.getByText("Internal CRM system")).toBeInTheDocument();
    expect(screen.getByText("Dashboard for HR")).toBeInTheDocument();
  });

  it("renders responsibilities", () => {
    render(
      <ProjectsTable
        cvId="cv-1"
        projects={mockProjects}
        loading={false}
        sortField="name"
        sortOrder="asc"
        sortAction={mockSortAction}
      />,
    );
    expect(screen.getByText("Created UI")).toBeInTheDocument();
    expect(screen.getByText("Configured Apollo")).toBeInTheDocument();
  });

  it("renders environment tags", () => {
    render(
      <ProjectsTable
        cvId="cv-1"
        projects={mockProjects}
        loading={false}
        sortField="name"
        sortOrder="asc"
        sortAction={mockSortAction}
      />,
    );
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("GraphQL")).toBeInTheDocument();
  });

  it("calls sortAction", () => {
    render(
      <ProjectsTable
        cvId="cv-1"
        projects={mockProjects}
        loading={false}
        sortField="name"
        sortOrder="asc"
        sortAction={mockSortAction}
      />,
    );
    fireEvent.click(
      screen.getByRole("button", {
        name: "name",
      }),
    );
    expect(mockSortAction).toHaveBeenCalledWith("name");
  });
});
