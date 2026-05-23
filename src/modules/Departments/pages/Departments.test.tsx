import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Departments } from "./Departments";
import { useCreateDepartment } from "@/modules/Departments/model/hooks/useCreateDepartment";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

const mockCreateDepartment = jest.fn();
jest.mock("@/modules/Departments/model/hooks/useCreateDepartment", () => ({
  useCreateDepartment: jest.fn(),
}));

jest.mock(
  "@/modules/Departments/ui/DepartmentsToolbar/DepartmentsToolbar",
  () => ({
    DepartmentsToolbar: ({ value, changeAction, createAction }: any) => (
      <div data-testid="departments-toolbar">
        <span data-testid="search-value">{value}</span>
        {/* Кнопки для триггера пропсов-колбеков */}
        <button
          data-testid="trigger-search"
          onClick={() => changeAction("new search query")}
        >
          Search
        </button>
        <button data-testid="trigger-create" onClick={createAction}>
          Create
        </button>
      </div>
    ),
  }),
);

jest.mock("@/modules/Departments/ui/DepartmentsTable/DepartmentsTable", () => ({
  DepartmentsTable: ({ search }: any) => (
    <div data-testid="departments-table">Table Search: {search}</div>
  ),
}));

jest.mock("@/modules/Departments/ui/DepartmentModal/DepartmentModal", () => ({
  DepartmentModal: ({
    open,
    toggleAction,
    submitAction,
    title,
    confirmLabel,
  }: any) => (
    <div data-testid="department-modal" data-open={open}>
      <span data-testid="modal-title">{title}</span>
      <span data-testid="modal-confirm">{confirmLabel}</span>
      <button data-testid="trigger-close" onClick={toggleAction}>
        Close
      </button>
      <button
        data-testid="trigger-submit"
        onClick={() => submitAction({ name: "IT Department" })}
      >
        Submit
      </button>
    </div>
  ),
}));

describe("Component Departments", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useCreateDepartment as jest.Mock).mockReturnValue({
      createDepartment: mockCreateDepartment,
      loading: false,
    });
  });

  it("should render all child components correctly", () => {
    render(<Departments />);

    expect(screen.getByTestId("departments-toolbar")).toBeInTheDocument();
    expect(screen.getByTestId("departments-table")).toBeInTheDocument();
    expect(screen.getByTestId("department-modal")).toBeInTheDocument();
  });

  it("should pass the correct translations to the modal window", () => {
    render(<Departments />);

    expect(screen.getByTestId("modal-title")).toHaveTextContent("createTitle");
    expect(screen.getByTestId("modal-confirm")).toHaveTextContent("create");
  });

  it("must update the search state and pass it to the table", () => {
    render(<Departments />);

    expect(screen.getByTestId("search-value")).toBeEmptyDOMElement();
    expect(screen.getByTestId("departments-table")).toHaveTextContent(
      "Table Search:",
    );

    fireEvent.click(screen.getByTestId("trigger-search"));

    expect(screen.getByTestId("search-value")).toHaveTextContent(
      "new search query",
    );
    expect(screen.getByTestId("departments-table")).toHaveTextContent(
      "Table Search: new search query",
    );
  });

  it("should open and close a modal window", () => {
    render(<Departments />);

    const modal = screen.getByTestId("department-modal");

    expect(modal).toHaveAttribute("data-open", "false");

    fireEvent.click(screen.getByTestId("trigger-create"));
    expect(modal).toHaveAttribute("data-open", "true");

    fireEvent.click(screen.getByTestId("trigger-close"));
    expect(modal).toHaveAttribute("data-open", "false");
  });

  it("should call createDepartment and close the modal window when the form is submitted", async () => {
    mockCreateDepartment.mockResolvedValueOnce(undefined);

    render(<Departments />);

    fireEvent.click(screen.getByTestId("trigger-create"));
    const modal = screen.getByTestId("department-modal");
    expect(modal).toHaveAttribute("data-open", "true");

    fireEvent.click(screen.getByTestId("trigger-submit"));

    await waitFor(() => {
      expect(mockCreateDepartment).toHaveBeenCalledTimes(1);
      expect(mockCreateDepartment).toHaveBeenCalledWith({
        variables: {
          department: { name: "IT Department" },
        },
      });

      expect(modal).toHaveAttribute("data-open", "false");
    });
  });
});
