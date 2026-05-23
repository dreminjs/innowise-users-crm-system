import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProjectModal } from "./ProjectModal";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => `translated_${key}`,
}));

jest.mock("@/shared/ui/FormModal", () => ({
  FormModal: ({ children, title, open, toggleAction }: any) => {
    if (!open) return null;
    return (
      <div data-testid="form-modal" data-title={title}>
        <button data-testid="modal-toggle-btn" onClick={toggleAction}>
          Toggle Modal
        </button>
        {children}
      </div>
    );
  },
}));

jest.mock("./ProjectForm", () => ({
  ProjectForm: ({
    mode,
    loading,
    closeAction,
    submitAction,
    defaultValues,
  }: any) => (
    <div data-testid="project-form" data-mode={mode} data-loading={loading}>
      <button data-testid="form-close-btn" onClick={closeAction}>
        Close Form
      </button>
      <button
        data-testid="form-submit-btn"
        onClick={() => submitAction(defaultValues)}
      >
        Submit Form
      </button>
    </div>
  ),
}));

describe("ProjectModal", () => {
  const mockToggleAction = jest.fn();
  const mockSubmitAction = jest.fn().mockResolvedValue(undefined);

  const defaultProps = {
    open: true,
    toggleAction: mockToggleAction,
    submitAction: mockSubmitAction,
  };

  const dummyDefaultValues = {
    name: "New Project",
    domain: "Healthcare",
    description: "A test project description",
    environment: ["React", "TypeScript"],
    start_date: "2024-01-01",
    end_date: null,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("rendered with the specified title and props in 'create' mode", () => {
    render(<ProjectModal {...defaultProps} mode="create" />);

    const modal = screen.getByTestId("form-modal");
    expect(modal).toHaveAttribute("data-title", "translated_createTitle");

    const form = screen.getByTestId("project-form");
    expect(form).toHaveAttribute("data-mode", "create");
  });

  it("renders with the correct title and props in 'edit' mode", () => {
    render(<ProjectModal {...defaultProps} mode="edit" loading={true} />);

    const modal = screen.getByTestId("form-modal");
    expect(modal).toHaveAttribute("data-title", "translated_editTitle");

    const form = screen.getByTestId("project-form");
    expect(form).toHaveAttribute("data-mode", "edit");
    expect(form).toHaveAttribute("data-loading", "true");
  });

  it("renders nothing if open={false}", () => {
    render(<ProjectModal {...defaultProps} mode="create" open={false} />);

    expect(screen.queryByTestId("form-modal")).not.toBeInTheDocument();
    expect(screen.queryByTestId("project-form")).not.toBeInTheDocument();
  });

  it("propagates toggleAction to both FormModal and ProjectForm (like closeAction)", async () => {
    const user = userEvent.setup();
    render(<ProjectModal {...defaultProps} mode="create" />);

    await user.click(screen.getByTestId("modal-toggle-btn"));
    expect(mockToggleAction).toHaveBeenCalledTimes(1);

    await user.click(screen.getByTestId("form-close-btn"));
    expect(mockToggleAction).toHaveBeenCalledTimes(2);
  });

  it("propagates submitAction and defaultValues ​​to ProjectForm", async () => {
    const user = userEvent.setup();
    render(
      <ProjectModal
        {...defaultProps}
        mode="edit"
        defaultValues={dummyDefaultValues}
      />,
    );

    await user.click(screen.getByTestId("form-submit-btn"));

    expect(mockSubmitAction).toHaveBeenCalledTimes(1);
    expect(mockSubmitAction).toHaveBeenCalledWith(dummyDefaultValues);
  });
});
