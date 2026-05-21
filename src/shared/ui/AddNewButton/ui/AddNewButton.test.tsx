import { AddNewButton } from "./AddNewButton";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("AddNewButton", () => {
  it("renders the label", () => {
    render(<AddNewButton onClick={() => {}} label="Add CV" />);
    expect(screen.getByText("Add CV")).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const handleClick = jest.fn();
    render(<AddNewButton onClick={handleClick} label="Add" />);
    await userEvent.click(screen.getByRole("button"));
    await userEvent.click(screen.getByRole("button"));

    expect(handleClick).toHaveBeenCalledTimes(2);
  });
});
