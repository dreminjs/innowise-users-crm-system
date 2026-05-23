import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { DepartmentModal } from "./DepartmentModal";
import { useTranslations } from "next-intl";

jest.mock("next-intl", () => ({
  useTranslations: jest.fn(),
}));

jest.mock("@/shared/ui/FormModal", () => ({
  FormModal: ({ children, open, title }: any) =>
    open ? (
      <div data-testid="form-modal" title={title}>
        {children}
      </div>
    ) : null,
}));

jest.mock("@/shared/ui/ModalField/ModalField", () => ({
  ModalField: ({ children, label, error }: any) => (
    <div data-testid="modal-field">
      <label>{label}</label>
      {children}
      {error && <span data-testid="field-error">{error}</span>}
    </div>
  ),
}));

jest.mock("@/shared/ui/ConfirmButtons", () => ({
  ConfirmButtons: ({ confirmLabel, cancelAction, disabled }: any) => (
    <div>
      <button type="submit" disabled={disabled} data-testid="confirm-btn">
        {confirmLabel}
      </button>
      <button type="button" onClick={cancelAction} data-testid="cancel-btn">
        Cancel
      </button>
    </div>
  ),
}));

describe("DepartmentModal Component", () => {
  const mockToggleAction = jest.fn();
  const mockSubmitAction = jest.fn().mockResolvedValue(undefined);
  const mockT = jest.fn((key: string) => key);

  const defaultProps = {
    open: true,
    toggleAction: mockToggleAction,
    title: "Create Department",
    confirmLabel: "Save",
    submitAction: mockSubmitAction,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useTranslations as jest.Mock).mockReturnValue(mockT);
  });

  it("should render the modal with empty fields when open is true", () => {
    render(<DepartmentModal {...defaultProps} />);

    expect(screen.getByTestId("form-modal")).toBeInTheDocument();
    expect(screen.getByTestId("form-modal")).toHaveAttribute(
      "title",
      "Create Department",
    );

    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("");

    expect(screen.getByTestId("confirm-btn")).toHaveTextContent("Save");
  });

  it("should not render the modal content when open is false", () => {
    render(<DepartmentModal {...defaultProps} open={false} />);
    expect(screen.queryByTestId("form-modal")).not.toBeInTheDocument();
  });

  it("should populate the input with defaultValues if provided", () => {
    render(
      <DepartmentModal
        {...defaultProps}
        defaultValues={{ name: "Engineering" }}
      />,
    );

    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("Engineering");
  });

  it("should show a validation error and prevent submission if the name is empty", async () => {
    render(<DepartmentModal {...defaultProps} />);

    const submitButton = screen.getByTestId("confirm-btn");
    fireEvent.click(submitButton);

    expect(screen.getByTestId("field-error")).toHaveTextContent(
      "validation.nameRequired",
    );
    expect(mockSubmitAction).not.toHaveBeenCalled();
  });

  it("should show a validation error and prevent submission if the name is only whitespace", async () => {
    render(<DepartmentModal {...defaultProps} />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "   " } });

    const submitButton = screen.getByTestId("confirm-btn");
    fireEvent.click(submitButton);

    expect(screen.getByTestId("field-error")).toHaveTextContent(
      "validation.nameRequired",
    );
    expect(mockSubmitAction).not.toHaveBeenCalled();
  });

  it("should clear the validation error and call submitAction with valid data", async () => {
    render(<DepartmentModal {...defaultProps} />);

    const submitButton = screen.getByTestId("confirm-btn");
    fireEvent.click(submitButton);
    expect(screen.getByTestId("field-error")).toBeInTheDocument();

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "Marketing" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.queryByTestId("field-error")).not.toBeInTheDocument();
      expect(mockSubmitAction).toHaveBeenCalledWith({ name: "Marketing" });
    });
  });

  it("should call toggleAction when the cancel button is clicked", () => {
    render(<DepartmentModal {...defaultProps} />);

    const cancelButton = screen.getByTestId("cancel-btn");
    fireEvent.click(cancelButton);

    expect(mockToggleAction).toHaveBeenCalledTimes(1);
  });

  it("should disable the submit button when loading is true", () => {
    render(<DepartmentModal {...defaultProps} loading={true} />);

    const submitButton = screen.getByTestId("confirm-btn");
    expect(submitButton).toBeDisabled();
  });
});
