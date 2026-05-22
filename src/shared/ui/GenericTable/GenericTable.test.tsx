import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Column, GenericTable } from "./GenericTable";

jest.mock("@/shared/ui/Loading", () => ({
  Loading: () => <div data-testid="loading">loading</div>,
}));

jest.mock("@/shared/ui/Empty", () => ({
  Empty: () => <div data-testid="empty">empty</div>,
}));

type User = {
  id: string;
  name: string;
  email: string;
};

type SortField = "name" | "email";
type ColumnKey = "name" | "email";

describe("GenericTable", () => {
  const data: User[] = [
    {
      id: "1",
      name: "John",
      email: "john@test.com",
    },
    {
      id: "2",
      name: "Jane",
      email: "jane@test.com",
    },
  ];

  const columns: Column<User, ColumnKey, SortField>[] = [
    {
      key: "name",
      title: "Name",
      sortable: true,
      sortKey: "name",
      render: (item) => item.name,
    },
    {
      key: "email",
      title: "Email",
      sortable: true,
      sortKey: "email",
      render: (item) => item.email,
    },
  ];

  it("renders loading state", () => {
    render(
      <GenericTable
        data={[]}
        columns={columns}
        rowKey={(item) => item.id}
        loading
      />,
    );
    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });

  it("renders empty state", () => {
    render(
      <GenericTable data={[]} columns={columns} rowKey={(item) => item.id} />,
    );
    expect(screen.getByTestId("empty")).toBeInTheDocument();
  });

  it("renders custom empty state", () => {
    render(
      <GenericTable
        data={[]}
        columns={columns}
        rowKey={(item) => item.id}
        empty={<div>no data</div>}
      />,
    );

    expect(screen.getByText("no data")).toBeInTheDocument();
  });

  it("renders table headers", () => {
    render(
      <GenericTable data={data} columns={columns} rowKey={(item) => item.id} />,
    );
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
  });

  it("renders table rows", () => {
    render(
      <GenericTable data={data} columns={columns} rowKey={(item) => item.id} />,
    );
    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("Jane")).toBeInTheDocument();
  });

  it("calls onSort", async () => {
    const onSort = jest.fn();

    render(
      <GenericTable
        data={data}
        columns={columns}
        rowKey={(item) => item.id}
        onSort={onSort}
      />,
    );

    await userEvent.click(
      screen.getByRole("button", {
        name: /name/i,
      }),
    );
    expect(onSort).toHaveBeenCalledWith("name");
  });

  it("renders asc sort indicator", () => {
    render(
      <GenericTable
        data={data}
        columns={columns}
        rowKey={(item) => item.id}
        sortField="name"
        sortOrder="asc"
      />,
    );
    expect(screen.getByText("↑")).toBeInTheDocument();
  });
  it("renders desc sort indicator", () => {
    render(
      <GenericTable
        data={data}
        columns={columns}
        rowKey={(item) => item.id}
        sortField="name"
        sortOrder="desc"
      />,
    );
    expect(screen.getByText("↓")).toBeInTheDocument();
  });
  it("renders non sortable column", () => {
    const nonSortableColumns: Column<User, ColumnKey, SortField>[] = [
      {
        key: "name",
        title: "Name",
        render: (item) => item.name,
      },
    ];
    render(
      <GenericTable
        data={data}
        columns={nonSortableColumns}
        rowKey={(item) => item.id}
      />,
    );
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
