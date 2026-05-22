import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CustomSelect } from "./CustomSelect";

jest.mock("@chakra-ui/react", () => ({
  createListCollection: ({ items }: { items: unknown[] }) => ({
    items,
  }),

  Portal: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),

  Select: {
    Root: ({
      children,
      onValueChange,
    }: {
      children: React.ReactNode;
      onValueChange?: (value: { value: string[] }) => void;
    }) => (
      <div>
        <button
          onClick={() =>
            onValueChange?.({
              value: ["test"],
            })
          }
        >
          select-trigger
        </button>

        {children}
      </div>
    ),

    HiddenSelect: () => null,

    Control: ({
      children,
      className,
    }: {
      children: React.ReactNode;
      className?: string;
    }) => <div className={className}>{children}</div>,

    Trigger: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),

    ValueText: ({ placeholder }: { placeholder?: string }) => (
      <span>{placeholder}</span>
    ),

    IndicatorGroup: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),

    Indicator: () => <span>indicator</span>,

    Label: ({ children }: { children: React.ReactNode }) => (
      <label>{children}</label>
    ),

    Positioner: ({
      children,
      className,
    }: {
      children: React.ReactNode;
      className?: string;
    }) => <div className={className}>{children}</div>,

    Content: ({
      children,
      className,
    }: {
      children: React.ReactNode;
      className?: string;
    }) => <div className={className}>{children}</div>,

    Item: ({
      children,
      className,
    }: {
      children: React.ReactNode;
      className?: string;
    }) => <div className={className}>{children}</div>,

    ItemIndicator: () => <span>✓</span>,

    ItemGroup: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
    ItemGroupLabel: ({
      children,
      className,
    }: {
      children: React.ReactNode;
      className?: string;
    }) => <div className={className}>{children}</div>,
  },
}));
describe("CustomSelect", () => {
  const options = [
    {
      label: "Option 1",
      value: "1",
    },
    {
      label: "Option 2",
      value: "2",
    },
  ];
  const groupedOptions = [
    {
      label: "Group 1",
      items: [
        {
          label: "Option 1",
          value: "1",
        },
      ],
    },
    {
      label: "Group 2",
      items: [
        {
          label: "Option 2",
          value: "2",
        },
      ],
    },
  ];

  it("renders label", () => {
    render(<CustomSelect label="Department" options={options} value="" />);
    expect(screen.getByText("Department")).toBeInTheDocument();
  });

  it("renders options", () => {
    render(<CustomSelect label="Select" options={options} value="" />);
    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByText("Option 2")).toBeInTheDocument();
  });

  it("renders grouped options", () => {
    render(<CustomSelect label="Grouped" options={groupedOptions} value="" />);
    expect(screen.getByText("Group 1")).toBeInTheDocument();
    expect(screen.getByText("Group 2")).toBeInTheDocument();
  });

  it("calls onChange", async () => {
    const onChange = jest.fn();

    render(
      <CustomSelect
        label="Select"
        options={options}
        value=""
        onChange={onChange}
      />,
    );
    await userEvent.click(
      screen.getByRole("button", {
        name: /select-trigger/i,
      }),
    );
    expect(onChange).toHaveBeenCalledWith("test");
  });

  it("renders error message", () => {
    render(
      <CustomSelect
        label="Select"
        options={options}
        value=""
        error="Required field"
      />,
    );
    expect(screen.getByText("Required field")).toBeInTheDocument();
  });

  it("renders indicator", () => {
    render(<CustomSelect label="Select" options={options} value="" />);
    expect(screen.getByText("indicator")).toBeInTheDocument();
  });

  it("renders empty options", () => {
    render(<CustomSelect label="Empty" options={[]} value="" />);
    expect(screen.getByText("Empty")).toBeInTheDocument();
  });

  it("renders item indicators", () => {
    render(<CustomSelect label="Select" options={options} value="" />);
    expect(screen.getAllByText("✓").length).toBeGreaterThan(0);
  });
});
