import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ProjectForm } from "./ProjectForm";

jest.mock("@/shared/ui/DatePicker/DatePicker", () => ({
  DatePicker: (props: any) => (
    <input
      data-testid="mock-datepicker"
      value={props.value || ""}
      onChange={(e) => {
        if (props.changeAction) {
          props.changeAction(e.target.value);
        }
      }}
    />
  ),
}));

describe("ProjectForm", () => {
  const defaultProps = {
    closeAction: jest.fn(),
    submitAction: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should transform environment string to array and submit correctly", async () => {
    render(<ProjectForm {...defaultProps} mode="edit" />);

    const nameInput = screen.getByText("name")
      .previousElementSibling as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: "New Project" } });

    const domainInput = screen.getByText("domain")
      .previousElementSibling as HTMLInputElement;
    fireEvent.change(domainInput, { target: { value: "example.com" } });

    const datePickers = screen.getAllByTestId("mock-datepicker");
    if (datePickers[0]) {
      fireEvent.change(datePickers[0], { target: { value: "2026-05-22" } });
    }
    if (datePickers[1]) {
      fireEvent.change(datePickers[1], { target: { value: "2026-06-01" } });
    }

    const descInput = screen.getByText("description")
      .previousElementSibling as HTMLTextAreaElement;
    fireEvent.change(descInput, {
      target: { value: "Test description for the project" },
    });

    const envInput = screen.getByText("environment")
      .previousElementSibling as HTMLInputElement;
    fireEvent.change(envInput, { target: { value: "dev, staging, prod" } });

    const submitButton = screen.getByRole("button", { name: /save/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(defaultProps.submitAction).toHaveBeenCalledTimes(1);
    });

    expect(defaultProps.submitAction).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "New Project",
        domain: "example.com",
        description: "Test description for the project",
        environment: ["dev", "staging", "prod"],
        start_date: "2026-05-22",
        end_date: "2026-06-01",
      }),
    );

    expect(defaultProps.closeAction).toHaveBeenCalledTimes(1);
  });
});
