import { DetailsColumn, DetailsTable } from "./DetailsTable";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

jest.mock("@/shared/ui/Loading", () => ({
  Loading: () => <div data-testid="loading">loading</div>,
}));

jest.mock("@/shared/ui/Empty", () => ({
  Empty: () => <div data-testid="empty">empty</div>,
}));
const mockColumns: DetailsColumn<
  { id: string; name: string },
  "name" | "actions",
  "name"
>[] = [
  {
    key: "name",
    title: "Name",
    sortable: true,
    sortKey: "name",
    render: (item) => <span>{item.name}</span>,
  },
  {
    key: "actions",
    title: "Actions",
    render: (item) => <button>Edit {item.name}</button>,
  },
];

const mockData = [
  { id: "1", name: "Alice" },
  { id: "2", name: "Bob" },
];

const defaultProps = {
  data: mockData,
  columns: mockColumns,
  rowKey: (item: { id: string; name: string }) => item.id,
  renderDetails: (item: { id: string; name: string }) => (
    <span>Details of {item.name}</span>
  ),
};

describe("DetailsTable", () => {
  describe("loading state", () => {
    it("renders Loading component when loading is true", () => {
      render(<DetailsTable {...defaultProps} loading={true} />);
      expect(screen.getByTestId("loading")).toBeInTheDocument();
    });

    it("does not render the table when loading is true", () => {
      render(<DetailsTable {...defaultProps} loading={true} />);
      expect(screen.queryByRole("table")).not.toBeInTheDocument();
    });
  });

  describe("empty state", () => {
    it("renders Empty component when data is empty", () => {
      render(<DetailsTable {...defaultProps} data={[]} />);
      expect(screen.getByTestId("empty")).toBeInTheDocument();
    });

    it("renders custom empty node when provided and data is empty", () => {
      render(
        <DetailsTable
          {...defaultProps}
          data={[]}
          empty={<span>No data available</span>}
        />,
      );
      expect(screen.getByText("No data available")).toBeInTheDocument();
    });

    it("does not render the table when data is empty", () => {
      render(<DetailsTable {...defaultProps} data={[]} />);
      expect(screen.queryByRole("table")).not.toBeInTheDocument();
    });
  });

  describe("table rendering", () => {
    it("renders column headers", () => {
      render(<DetailsTable {...defaultProps} />);
      expect(screen.getByText("Name")).toBeInTheDocument();
      expect(screen.getByText("Actions")).toBeInTheDocument();
    });

    it("renders a row for each data item", () => {
      render(<DetailsTable {...defaultProps} />);
      expect(screen.getByText("Alice")).toBeInTheDocument();
      expect(screen.getByText("Bob")).toBeInTheDocument();
    });

    it("renders details row for each data item", () => {
      render(<DetailsTable {...defaultProps} />);
      expect(screen.getByText("Details of Alice")).toBeInTheDocument();
      expect(screen.getByText("Details of Bob")).toBeInTheDocument();
    });

    it("renders cell content via column render function", () => {
      render(<DetailsTable {...defaultProps} />);
      expect(screen.getByText("Edit Alice")).toBeInTheDocument();
      expect(screen.getByText("Edit Bob")).toBeInTheDocument();
    });

    it("details row spans all columns", () => {
      render(<DetailsTable {...defaultProps} />);
      const detailsCells = screen
        .getAllByRole("cell")
        .filter((cell) => cell.getAttribute("colspan"));
      detailsCells.forEach((cell) => {
        expect(cell).toHaveAttribute("colspan", String(mockColumns.length));
      });
    });
  });

  describe("sorting", () => {
    it("renders sort button for sortable columns", () => {
      render(<DetailsTable {...defaultProps} />);
      expect(screen.getByRole("button", { name: /name/i })).toBeInTheDocument();
    });

    it("does not render sort button for non-sortable columns", () => {
      render(<DetailsTable {...defaultProps} />);
      expect(
        screen.queryByRole("button", { name: /actions/i }),
      ).not.toBeInTheDocument();
    });

    it("calls onSort with the correct sortKey when sort button is clicked", async () => {
      const handleSort = jest.fn();
      render(<DetailsTable {...defaultProps} onSort={handleSort} />);
      await userEvent.click(screen.getByRole("button", { name: /name/i }));
      expect(handleSort).toHaveBeenCalledWith("name");
    });

    it("shows ↑ icon when column is active and sortOrder is asc", () => {
      render(
        <DetailsTable {...defaultProps} sortField="name" sortOrder="asc" />,
      );
      expect(screen.getByText("↑")).toBeInTheDocument();
    });

    it("shows ↓ icon when column is active and sortOrder is desc", () => {
      render(
        <DetailsTable {...defaultProps} sortField="name" sortOrder="desc" />,
      );
      expect(screen.getByText("↓")).toBeInTheDocument();
    });

    it("does not show sort icon for inactive columns", () => {
      render(<DetailsTable {...defaultProps} sortField={undefined} />);
      expect(screen.queryByText("↑")).not.toBeInTheDocument();
      expect(screen.queryByText("↓")).not.toBeInTheDocument();
    });
  });
});
