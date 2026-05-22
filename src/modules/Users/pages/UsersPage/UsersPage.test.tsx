import { render, screen } from "@testing-library/react";
import { useQuery } from "@apollo/client/react";
import { UsersPage } from "./UsersPage";
import { useUsersTable } from "@/modules/Users/model/hooks/useUsersTable";

jest.mock("@apollo/client/react", () => ({
  useQuery: jest.fn(),
}));

jest.mock("@/modules/Users/model/hooks/useUsersTable", () => ({
  useUsersTable: jest.fn(),
}));

jest.mock("../../api/queries", () => ({
  GET_USERS: "GET_USERS",
}));

jest.mock("@/shared/ui/Loading", () => ({
  Loading: () => <div>loading</div>,
}));

jest.mock("@/modules/Users/ui/UsersSearch", () => ({
  UsersSearch: ({
    value,
    changeAction,
  }: {
    value: string;
    changeAction: (value: string) => void;
  }) => (
    <div>
      <div>
        search:
        {value}
      </div>
      <button type="button" onClick={() => changeAction("updated")}>
        change-search
      </button>
    </div>
  ),
}));
jest.mock("@/modules/Users/ui/UsersTable", () => ({
  UsersTable: ({
    users,
    sortField,
    sortOrder,
    sortAction,
    loading,
  }: {
    users: Array<{
      id: string;
      email: string;
    }>;
    sortField: string;
    sortOrder: string;
    sortAction: (field: string) => void;
    loading: boolean;
  }) => (
    <div>
      <div>
        users:
        {users.length}
      </div>
      <div>
        sort-field:
        {sortField}
      </div>
      <div>
        sort-order:
        {sortOrder}
      </div>
      <div>
        loading:
        {String(loading)}
      </div>
      <button type="button" onClick={() => sortAction("email")}>
        sort
      </button>
    </div>
  ),
}));
jest.mock("./UsersPage.module.css", () => ({
  page: "page",
  state: "state",
}));

describe("UsersPage", () => {
  const setSearch = jest.fn();
  const handleSort = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
    (useQuery as unknown as jest.Mock).mockReturnValue({
      data: {
        users: [
          {
            id: "1",
            email: "test@test.com",
          },
        ],
      },
      loading: false,
      error: null,
    });
    (useUsersTable as jest.Mock).mockReturnValue({
      users: [
        {
          id: "1",
          email: "test@test.com",
        },
      ],
      search: "john",
      setSearch,
      sortField: "email",
      sortOrder: "asc",
      handleSort,
    });
  });
  it("renders loading state", () => {
    (useQuery as unknown as jest.Mock).mockReturnValue({
      data: undefined,
      loading: true,
      error: null,
    });
    render(<UsersPage />);
    expect(screen.getByText("loading")).toBeInTheDocument();
  });
  it("renders error state", () => {
    (useQuery as unknown as jest.Mock).mockReturnValue({
      data: undefined,
      loading: false,
      error: new Error("Failed"),
    });

    render(<UsersPage />);
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  it("renders UsersSearch", () => {
    render(<UsersPage />);
    expect(screen.getByText("search:john")).toBeInTheDocument();
  });
  it("renders UsersTable", () => {
    render(<UsersPage />);
    expect(screen.getByText("users:1")).toBeInTheDocument();
  });

  it("passes sortField to UsersTable", () => {
    render(<UsersPage />);
    expect(screen.getByText("sort-field:email")).toBeInTheDocument();
  });

  it("passes sortOrder to UsersTable", () => {
    render(<UsersPage />);
    expect(screen.getByText("sort-order:asc")).toBeInTheDocument();
  });

  it("passes loading=false to UsersTable", () => {
    render(<UsersPage />);
    expect(screen.getByText("loading:false")).toBeInTheDocument();
  });

  it("calls useUsersTable with users data", () => {
    render(<UsersPage />);
    expect(useUsersTable).toHaveBeenCalledWith([
      {
        id: "1",
        email: "test@test.com",
      },
    ]);
  });

  it("calls useUsersTable with undefined users", () => {
    (useQuery as unknown as jest.Mock).mockReturnValue({
      data: undefined,
      loading: false,
      error: null,
    });
    render(<UsersPage />);
    expect(useUsersTable).toHaveBeenCalledWith(undefined);
  });
  it("renders page section", () => {
    const { container } = render(<UsersPage />);
    expect(container.querySelector(".page")).toBeInTheDocument();
  });
  it("renders error state class", () => {
    (useQuery as unknown as jest.Mock).mockReturnValue({
      data: undefined,
      loading: false,
      error: new Error("Failed"),
    });
    const { container } = render(<UsersPage />);
    expect(container.querySelector(".state")).toBeInTheDocument();
  });
});
