import { fireEvent, render, screen } from "@testing-library/react";
import { UsersTable } from "./UsersTable";
import { useUserStore } from "@/application/store/user.store";
import { UserRole } from "@/generated/graphql";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

jest.mock("@/application/store/user.store", () => ({
  useUserStore: jest.fn(),
}));
jest.mock("@/shared/ui/Avatar/Avatar", () => ({
  Avatar: ({
    firstName,
    lastName,
  }: {
    firstName?: string | null;
    lastName?: string | null;
  }) => (
    <div>
      {firstName} {lastName}
    </div>
  ),
}));
jest.mock("@/shared/ui/Icon/Icon", () => ({
  Icon: () => <div>icon</div>,
}));
jest.mock("./UsersTableRow/UserActions/UserActions", () => ({
  UserActions: () => <div>actions</div>,
}));
jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => <a href={href}>{children}</a>,
}));
jest.mock("@/shared/ui/GenericTable/GenericTable", () => ({
  GenericTable: ({
    data,
    columns,
    onSort,
  }: {
    data: {
      id: string;
    }[];
    columns: {
      key: string;
      title: string;
      render: (user: { id: string }) => React.ReactNode;
    }[];
    onSort: (
      field: "first_name" | "last_name" | "email" | "department" | "position",
    ) => void;
  }) => (
    <div>
      {columns.map((column) => (
        <button
          key={column.key}
          onClick={() =>
            onSort(
              column.key as
                | "first_name"
                | "last_name"
                | "email"
                | "department"
                | "position",
            )
          }
        >
          {column.title}
        </button>
      ))}
      {data.map((user) => (
        <div key={user.id}>
          {columns.map((column) => (
            <div key={column.key}>{column.render(user)}</div>
          ))}
        </div>
      ))}
    </div>
  ),
}));

describe("UsersTable", () => {
  const sortActionMock = jest.fn();
  const users = [
    {
      id: "1",
      email: "john@test.com",
      department_name: "IT",
      position_name: "Developer",
      profile: {
        first_name: "John",
        last_name: "Doe",
        avatar: "avatar.png",
      },
    },
  ];
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should render user data", () => {
    (useUserStore as unknown as jest.Mock)
      .mockReturnValueOnce(UserRole.Admin)
      .mockReturnValueOnce("1");
    render(
      <UsersTable
        users={users as never}
        loading={false}
        sortField="first_name"
        sortOrder="asc"
        sortAction={sortActionMock}
      />,
    );
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john@test.com")).toBeInTheDocument();
    expect(screen.getByText("IT")).toBeInTheDocument();
    expect(screen.getByText("Developer")).toBeInTheDocument();
  });

  it("should render actions for admin", () => {
    (useUserStore as unknown as jest.Mock)
      .mockReturnValueOnce(UserRole.Admin)
      .mockReturnValueOnce("2");

    render(
      <UsersTable
        users={users as never}
        loading={false}
        sortField="first_name"
        sortOrder="asc"
        sortAction={sortActionMock}
      />,
    );
    expect(screen.getByText("actions")).toBeInTheDocument();
  });

  it("should render actions for current user", () => {
    (useUserStore as unknown as jest.Mock)
      .mockReturnValueOnce(UserRole.Employee)
      .mockReturnValueOnce("1");
    render(
      <UsersTable
        users={users as never}
        loading={false}
        sortField="first_name"
        sortOrder="asc"
        sortAction={sortActionMock}
      />,
    );
    expect(screen.getByText("actions")).toBeInTheDocument();
  });

  it("should render link for non admin", () => {
    (useUserStore as unknown as jest.Mock)
      .mockReturnValueOnce(UserRole.Employee)
      .mockReturnValueOnce("2");
    render(
      <UsersTable
        users={users as never}
        loading={false}
        sortField="first_name"
        sortOrder="asc"
        sortAction={sortActionMock}
      />,
    );
    expect(screen.getByRole("link")).toHaveAttribute("href", "/users/1");
  });

  it("should call sort action", () => {
    (useUserStore as unknown as jest.Mock)
      .mockReturnValueOnce(UserRole.Admin)
      .mockReturnValueOnce("1");
    render(
      <UsersTable
        users={users as never}
        loading={false}
        sortField="first_name"
        sortOrder="asc"
        sortAction={sortActionMock}
      />,
    );
    fireEvent.click(screen.getByText("Email"));
    expect(sortActionMock).toHaveBeenCalledWith("email");
  });
  it("should render fallback values", () => {
    (useUserStore as unknown as jest.Mock)
      .mockReturnValueOnce(UserRole.Admin)
      .mockReturnValueOnce("1");
    render(
      <UsersTable
        users={
          [
            {
              id: "2",
              email: "test@test.com",
              department_name: null,
              position_name: null,
              profile: {
                first_name: null,
                last_name: null,
                avatar: null,
              },
            },
          ] as never
        }
        loading={false}
        sortField="first_name"
        sortOrder="asc"
        sortAction={sortActionMock}
      />,
    );
    expect(screen.getAllByText("-").length).toBeGreaterThan(0);
  });
});
