import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SkillsTable } from "./SkillsTable";
const handleSortMock = jest.fn();
jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

jest.mock("@apollo/client/react", () => ({
  useQuery: jest.fn(),
}));
jest.mock("@/modules/Skills/api/queries", () => ({
  GET_SKILLS: "GET_SKILLS",
}));
jest.mock("@/shared/helpers/useTableState", () => ({
  useTableState: () => ({
    sortField: "name",
    sortOrder: "asc",
    handleSort: handleSortMock,
  }),
}));
jest.mock("@/modules/Skills/ui/Skills/SkillActions", () => ({
  SkillActions: ({ skillName }: { skillName: string }) => (
    <div>
      actions:
      {skillName}
    </div>
  ),
}));
jest.mock("@/shared/ui/GenericTable/GenericTable", () => ({
  GenericTable: ({
    data,
    columns,
    onSort,
  }: {
    data: {
      id: string;
      name: string;
    }[];
    columns: {
      key: string;
      title: string;
    }[];
    onSort?: (field: string) => void;
  }) => (
    <div>
      <div>
        rows:
        {data.length}
      </div>

      {columns.map((column) => (
        <button
          key={column.key}
          type="button"
          onClick={() => onSort?.(column.key)}
        >
          {column.title}
        </button>
      ))}
      {data.map((skill) => (
        <div key={skill.id}>{skill.name}</div>
      ))}
    </div>
  ),
}));
const { useQuery } = jest.requireMock("@apollo/client/react");
describe("SkillsTable", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders skills", () => {
    useQuery.mockReturnValue({
      data: {
        skills: [
          {
            id: "1",
            name: "React",
            category: {
              id: "1",
              name: "Frontend",
            },
          },
          {
            id: "2",
            name: "Node",
            category: {
              id: "2",
              name: "Backend",
            },
          },
        ],
      },
      loading: false,
    });
    render(<SkillsTable search="" />);
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Node")).toBeInTheDocument();
  });

  it("filters skills by name", () => {
    useQuery.mockReturnValue({
      data: {
        skills: [
          {
            id: "1",
            name: "React",
            category: {
              id: "1",
              name: "Frontend",
            },
          },
          {
            id: "2",
            name: "Node",
            category: {
              id: "2",
              name: "Backend",
            },
          },
        ],
      },
      loading: false,
    });
    render(<SkillsTable search="react" />);
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.queryByText("Node")).not.toBeInTheDocument();
  });

  it("filters skills by category", () => {
    useQuery.mockReturnValue({
      data: {
        skills: [
          {
            id: "1",
            name: "React",
            category: {
              id: "1",
              name: "Frontend",
            },
          },
          {
            id: "2",
            name: "Node",
            category: {
              id: "2",
              name: "Backend",
            },
          },
        ],
      },
      loading: false,
    });
    render(<SkillsTable search="backend" />);
    expect(screen.getByText("Node")).toBeInTheDocument();
    expect(screen.queryByText("React")).not.toBeInTheDocument();
  });

  it("renders error", () => {
    useQuery.mockReturnValue({
      data: undefined,
      loading: false,
      error: {
        message: "Request failed",
      },
    });
    render(<SkillsTable search="" />);
    expect(screen.getByText("Error: Request failed")).toBeInTheDocument();
  });

  it("calls handleSort", async () => {
    useQuery.mockReturnValue({
      data: {
        skills: [],
      },
      loading: false,
    });
    render(<SkillsTable search="" />);
    await userEvent.click(screen.getByText("name"));
    expect(handleSortMock).toHaveBeenCalledWith("name");
  });

  it("renders translated headers", () => {
    useQuery.mockReturnValue({
      data: {
        skills: [],
      },
      loading: false,
    });
    render(<SkillsTable search="" />);
    expect(screen.getByText("name")).toBeInTheDocument();
    expect(screen.getByText("category")).toBeInTheDocument();
  });

  it("renders empty data", () => {
    useQuery.mockReturnValue({
      data: {
        skills: [],
      },
      loading: false,
    });
    render(<SkillsTable search="" />);
    expect(screen.getByText("rows:0")).toBeInTheDocument();
  });
});
