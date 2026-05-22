import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DatePicker } from "./DatePicker";

jest.mock("react-datepicker", () => {
  return ({
    selected,
    onChange,
    customInput,
  }: {
    selected: Date | null;
    onChange: (date: Date | null) => void;
    customInput: React.ReactElement<{
      value?: string;
    }>;
  }) => (
    <div>
      {customInput}
      <button type="button" onClick={() => onChange(new Date("2024-01-10"))}>
        change-date
      </button>
      <button type="button" onClick={() => onChange(null)}>
        clear-date
      </button>
      <span>{selected?.toISOString().split("T")[0] ?? "empty"}</span>
    </div>
  );
});

describe("DatePicker", () => {
  it("renders placeholder", () => {
    render(
      <DatePicker value="" placeholder="Select date" changeAction={() => {}} />,
    );
    expect(screen.getByText("Select date")).toBeInTheDocument();
  });

  it("renders selected date", () => {
    render(<DatePicker value="2024-01-10" changeAction={() => {}} />);
    expect(screen.getByText("2024-01-10")).toBeInTheDocument();
  });

  it("calls changeAction with formatted date", async () => {
    const changeAction = jest.fn();
    render(<DatePicker value="" changeAction={changeAction} />);
    await userEvent.click(
      screen.getByRole("button", {
        name: /change-date/i,
      }),
    );
    expect(changeAction).toHaveBeenCalledWith("2024-01-10");
  });

  it("calls changeAction with empty string when date is cleared", async () => {
    const changeAction = jest.fn();
    render(<DatePicker value="2024-01-10" changeAction={changeAction} />);
    await userEvent.click(
      screen.getByRole("button", {
        name: /clear-date/i,
      }),
    );
    expect(changeAction).toHaveBeenCalledWith("");
  });

  it("renders empty state when value is empty", () => {
    render(<DatePicker value="" changeAction={() => {}} />);
    expect(screen.getByText("empty")).toBeInTheDocument();
  });

  it("renders custom input button", () => {
    render(<DatePicker value="" changeAction={() => {}} />);
    expect(screen.getAllByRole("button").length).toBeGreaterThan(0);
  });
});
