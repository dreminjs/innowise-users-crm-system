import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { DepartmentActions } from "./DepartmentActions";

jest.mock("next-intl", () => ({
  useTranslations: (namespace: string) => (key: string) =>
    `${namespace}_${key}`,
}));

const mockDeleteDepartment = jest.fn();
jest.mock("../../model/hooks/useDeleteDepartment", () => ({
  useDeleteDepartment: () => ({
    deleteDepartment: mockDeleteDepartment,
  }),
}));

const mockUpdateDepartment = jest.fn();
jest.mock("../../model/hooks/useUpdateDepartment", () => ({
  useUpdateDepartment: () => ({
    updateDepartment: mockUpdateDepartment,
    loading: false,
  }),
}));

jest.mock("@/shared/ui/ActionsMenu/ActionsMenu", () => ({
  ActionsMenu: ({ items }: any) => (
    <div data-testid="actions-menu">
      {items.map((item: any, index: number) => (
        <button
          key={index}
          data-testid={`menu-btn-${item.label}`}
          onClick={item.onClick}
        >
          {item.label}
        </button>
      ))}
    </div>
  ),
}));

jest.mock("../DepartmentModal/DepartmentModal", () => ({
  DepartmentModal: ({
    open,
    toggleAction,
    submitAction,
    title,
    defaultValues,
  }: any) => {
    if (!open) return null;
    return (
      <div data-testid="department-modal" data-title={title}>
        <span data-testid="modal-default-name">{defaultValues?.name}</span>
        <button data-testid="modal-close-btn" onClick={toggleAction}>
          Close
        </button>
        <button
          data-testid="modal-submit-btn"
          onClick={() => submitAction({ name: "New Department Name" })}
        >
          Submit
        </button>
      </div>
    );
  },
}));

describe("DepartmentActions Component", () => {
  const defaultProps = {
    departmentId: "dep-123",
    departmentName: "Engineering",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render ActionsMenu with Edit and Delete buttons", () => {
    render(<DepartmentActions {...defaultProps} />);

    expect(screen.getByTestId("actions-menu")).toBeInTheDocument();
    expect(
      screen.getByTestId("menu-btn-DepartmentActions_edit"),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("menu-btn-DepartmentActions_delete"),
    ).toBeInTheDocument();
  });

  it("should call deleteDepartment with correct variables when delete is clicked", async () => {
    render(<DepartmentActions {...defaultProps} />);

    fireEvent.click(screen.getByTestId("menu-btn-DepartmentActions_delete"));

    expect(mockDeleteDepartment).toHaveBeenCalledTimes(1);
    expect(mockDeleteDepartment).toHaveBeenCalledWith({
      variables: {
        department: {
          departmentId: "dep-123",
        },
      },
    });
  });

  it("should open edit modal when edit button is clicked", () => {
    render(<DepartmentActions {...defaultProps} />);

    expect(screen.queryByTestId("department-modal")).not.toBeInTheDocument();

    fireEvent.click(screen.getByTestId("menu-btn-DepartmentActions_edit"));

    expect(screen.getByTestId("department-modal")).toBeInTheDocument();
    expect(screen.getByTestId("department-modal")).toHaveAttribute(
      "data-title",
      "DepartmentModal_editTitle",
    );
    expect(screen.getByTestId("modal-default-name")).toHaveTextContent(
      "Engineering",
    );
  });

  it("should close the modal when toggleAction is called", () => {
    render(<DepartmentActions {...defaultProps} />);

    fireEvent.click(screen.getByTestId("menu-btn-DepartmentActions_edit"));
    expect(screen.getByTestId("department-modal")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("modal-close-btn"));

    expect(screen.queryByTestId("department-modal")).not.toBeInTheDocument();
  });

  it("should call updateDepartment and close modal upon submit", async () => {
    render(<DepartmentActions {...defaultProps} />);

    fireEvent.click(screen.getByTestId("menu-btn-DepartmentActions_edit"));

    fireEvent.click(screen.getByTestId("modal-submit-btn"));

    expect(mockUpdateDepartment).toHaveBeenCalledTimes(1);
    expect(mockUpdateDepartment).toHaveBeenCalledWith({
      variables: {
        department: {
          departmentId: "dep-123",
          name: "New Department Name",
        },
      },
    });

    await waitFor(() => {
      expect(screen.queryByTestId("department-modal")).not.toBeInTheDocument();
    });
  });
});
