import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DetailsTable, DetailsTableHeader } from "./DetailsTable";

jest.mock("@/shared/ui/Loading", () => ({
  Loading: () => <div data-testid="loading">loading</div>,
}));
jest.mock("@/shared/ui/Empty", () => ({
  Empty: () => <div data-testid="empty">empty</div>,
}));
type Field = "name" | "email";
describe("DetailsTable", () => {
  const headers: DetailsTableHeader<Field>[] = [
    {
      key: "name",
      title: "Name",
      sortable: true,
    },
    {
      key: "email",
      title: "Email",
      sortable: true,
    },
  ];
  it("renders loading state", () => {
    render(
      <DetailsTable loading headers={headers}>
        <tr>
          <td>row</td>
        </tr>
      </DetailsTable>,
    );
    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });

  it("renders empty state", () => {
    render(
      <DetailsTable isEmpty headers={headers}>
        <tr>
          <td>row</td>
        </tr>
      </DetailsTable>,
    );
    expect(screen.getByTestId("empty")).toBeInTheDocument();
  });
  it("renders headers", () => {
    render(
      <DetailsTable headers={headers}>
        <tr>
          <td>John</td>
          <td>john@test.com</td>
        </tr>
      </DetailsTable>,
    );
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
  });

  it("renders children", () => {
    render(
      <DetailsTable headers={headers}>
        <tr>
          <td>John</td>
        </tr>
      </DetailsTable>,
    );
    expect(screen.getByText("John")).toBeInTheDocument();
  });

  it("calls onSort", async () => {
    const onSort = jest.fn();
    render(
      <DetailsTable headers={headers} onSort={onSort}>
        <tr>
          <td>John</td>
        </tr>
      </DetailsTable>,
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
      <DetailsTable headers={headers} sortField="name" sortOrder="asc">
        <tr>
          <td>John</td>
        </tr>
      </DetailsTable>,
    );
    expect(screen.getByText("↑")).toBeInTheDocument();
  });

  it("renders desc sort indicator", () => {
    render(
      <DetailsTable headers={headers} sortField="name" sortOrder="desc">
        <tr>
          <td>John</td>
        </tr>
      </DetailsTable>,
    );
    expect(screen.getByText("↓")).toBeInTheDocument();
  });
  it("renders non sortable header", () => {
    render(
      <DetailsTable
        headers={[
          {
            key: "name",
            title: "Name",
          },
        ]}
      >
        <tr>
          <td>John</td>
        </tr>
      </DetailsTable>,
    );
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
  it("renders wrapper table", () => {
    const { container } = render(
      <DetailsTable headers={headers}>
        <tr>
          <td>John</td>
        </tr>
      </DetailsTable>,
    );
    expect(container.querySelector("table")).toBeInTheDocument();
  });
});
