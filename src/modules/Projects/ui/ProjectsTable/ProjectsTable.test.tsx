import { render, screen, fireEvent } from "@testing-library/react";
import { ProjectsTable } from "./ProjectsTable";

const mockSortAction = jest.fn();

jest.mock("next-intl", () => ({
  useTranslations: jest.fn(() => (key: string) => key),
}));

type MockProjectActionsProps = {
  project: {
    id: string;
    name: string;
  };
};

jest.mock("./ProjectActions", () => ({
  ProjectActions: ({ project }: MockProjectActionsProps) => (
    <div>
      actions:
      {project.id}
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
  environment: "environment",
  tag: "tag",
}));

describe("ProjectsTable", () => {
  const mockProjects = [
    {
      id: "project-1",
      name: "CRM Platform",
      domain: "Fintech",
      description: "CRM description",
      environment: ["React", "GraphQL"],
      start_date: "2024-01-01",
      end_date: "2024-12-31",
    },
    {
      id: "project-2",
      name: "HR Dashboard",
      domain: "",
      description: "HR description",
      environment: [],
      start_date: "2023-01-01",
      end_date: null,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();

    jest.spyOn(global.crypto, "randomUUID").mockReturnValue("mock-uuid");
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders project names", () => {
    render(
      <ProjectsTable
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
        projects={mockProjects}
        loading={false}
        sortField="name"
        sortOrder="asc"
        sortAction={mockSortAction}
      />,
    );

    expect(screen.getByText("Fintech")).toBeInTheDocument();

    expect(screen.getByText("-")).toBeInTheDocument();
  });

  it("renders dates", () => {
    render(
      <ProjectsTable
        projects={mockProjects}
        loading={false}
        sortField="name"
        sortOrder="asc"
        sortAction={mockSortAction}
      />,
    );

    expect(screen.getByText("2024-01-01")).toBeInTheDocument();

    expect(screen.getByText("2024-12-31")).toBeInTheDocument();

    expect(screen.getByText("Till now")).toBeInTheDocument();
  });

  it("renders descriptions", () => {
    render(
      <ProjectsTable
        projects={mockProjects}
        loading={false}
        sortField="name"
        sortOrder="asc"
        sortAction={mockSortAction}
      />,
    );

    expect(screen.getByText("CRM description")).toBeInTheDocument();

    expect(screen.getByText("HR description")).toBeInTheDocument();
  });

  it("renders environment tags", () => {
    render(
      <ProjectsTable
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

  it("renders ProjectActions", () => {
    render(
      <ProjectsTable
        projects={mockProjects}
        loading={false}
        sortField="name"
        sortOrder="asc"
        sortAction={mockSortAction}
      />,
    );

    expect(screen.getByText("actions:project-1")).toBeInTheDocument();

    expect(screen.getByText("actions:project-2")).toBeInTheDocument();
  });

  it("calls sortAction", () => {
    render(
      <ProjectsTable
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

  it("does not render environment block when environment is empty", () => {
    render(
      <ProjectsTable
        projects={[mockProjects[1]]}
        loading={false}
        sortField="name"
        sortOrder="asc"
        sortAction={mockSortAction}
      />,
    );
    expect(screen.queryByText("React")).not.toBeInTheDocument();
  });
});
