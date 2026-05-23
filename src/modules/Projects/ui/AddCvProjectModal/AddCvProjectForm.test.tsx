import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { AddCvProjectForm } from "./AddCvProjectForm";
import { useQuery } from "@apollo/client/react";
import { useAddCvProject } from "@/modules/Projects/hooks/useAddCvProject";

jest.mock("@apollo/client", () => {
  const actual = jest.requireActual("@apollo/client");
  return { ...actual, useQuery: jest.fn(), useMutation: jest.fn() };
});

jest.mock("@apollo/client/react", () => {
  const actual = jest.requireActual("@apollo/client/react");
  return { ...actual, useQuery: jest.fn() };
});

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

jest.mock("@/modules/Projects/model/addCvProject.schema", () => ({
  createAddCvProjectSchema: jest.fn(),
}));

jest.mock("@hookform/resolvers/zod", () => ({
  zodResolver: jest.fn(() => async (data: any) => ({
    values: data,
    errors: {},
  })),
}));

jest.mock("@/modules/Projects/hooks/useAddCvProject", () => ({
  useAddCvProject: jest.fn(),
}));

jest.mock("@/shared/ui/CustomSelect/CustomSelect", () => ({
  CustomSelect: ({ label, value, onChange, options }: any) => (
    <div data-testid={`select-wrapper-${label}`}>
      <label>{label}</label>
      <select
        data-testid={`select-${label}`}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="" disabled>
          Select
        </option>
        {options.map((opt: any) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  ),
}));

jest.mock("@/shared/ui/DatePicker/DatePicker", () => ({
  DatePicker: ({ value, changeAction }: any) => (
    <input
      type="date"
      data-testid="datepicker"
      value={value || ""}
      onChange={(e) => changeAction(e.target.value)}
    />
  ),
}));

jest.mock("@/shared/ui/ModalField/ModalField", () => ({
  ModalField: ({ label, children, error }: any) => (
    <div data-testid={`modal-field-${label}`}>
      <label>{label}</label>
      {children}
      {error && <span data-testid={`error-${label}`}>{error}</span>}
    </div>
  ),
}));

describe("AddCvProjectForm Component", () => {
  const mockCloseAction = jest.fn();
  const mockAddCvProjectMutation = jest.fn();

  const defaultProps = {
    cvId: "cv-123",
    closeAction: mockCloseAction,
  };

  const mockProjectsData = {
    projects: [
      {
        id: "proj-1",
        name: "Alpha Project",
        domain: "Fintech",
        description: "A financial app",
        environment: ["React", "Node.js", "AWS"],
      },
      {
        id: "proj-2",
        name: "Beta Project",
        domain: "Healthcare",
        description: "A medical app",
        environment: ["Vue", "Python"],
      },
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();

    (useQuery as jest.Mock).mockReturnValue({
      data: mockProjectsData,
    });

    (useAddCvProject as jest.Mock).mockReturnValue([mockAddCvProjectMutation]);
  });

  it("should render all form fields correctly", () => {
    render(<AddCvProjectForm {...defaultProps} />);

    expect(screen.getByTestId("select-project")).toBeInTheDocument();

    const datePickers = screen.getAllByTestId("datepicker");
    expect(datePickers).toHaveLength(2);

    expect(screen.getByTestId("modal-field-domain")).toBeInTheDocument();
    expect(screen.getByTestId("modal-field-description")).toBeInTheDocument();
    expect(screen.getByTestId("modal-field-environment")).toBeInTheDocument();
    expect(
      screen.getByTestId("modal-field-responsibilities"),
    ).toBeInTheDocument();

    expect(screen.getByText("cancel")).toBeInTheDocument();
    expect(screen.getByText("add")).toBeInTheDocument();
  });

  it("should auto-fill domain, description, and environment when a project is selected", () => {
    render(<AddCvProjectForm {...defaultProps} />);

    fireEvent.change(screen.getByTestId("select-project"), {
      target: { value: "proj-1" },
    });

    expect(screen.getByDisplayValue("Fintech")).toBeInTheDocument();
    expect(screen.getByDisplayValue("A financial app")).toBeInTheDocument();
    expect(screen.getByDisplayValue("React, Node.js, AWS")).toBeInTheDocument();
  });

  it("should submit the form with correct payload and call closeAction", async () => {
    render(<AddCvProjectForm {...defaultProps} />);

    fireEvent.change(screen.getByTestId("select-project"), {
      target: { value: "proj-1" },
    });

    const datePickers = screen.getAllByTestId("datepicker");
    fireEvent.change(datePickers[0], { target: { value: "2023-01-01" } });
    fireEvent.change(datePickers[1], { target: { value: "2023-12-31" } });

    const responsibilitiesWrapper = screen.getByTestId(
      "modal-field-responsibilities",
    );
    const responsibilitiesInput =
      responsibilitiesWrapper.querySelector("textarea")!;
    fireEvent.change(responsibilitiesInput, {
      target: { value: "Developed frontend features." },
    });

    fireEvent.click(screen.getByText("add"));

    await waitFor(() => {
      expect(mockAddCvProjectMutation).toHaveBeenCalledWith({
        variables: {
          project: {
            cvId: "cv-123",
            projectId: "proj-1",
            start_date: "2023-01-01",
            end_date: "2023-12-31",
            roles: [],
            responsibilities: ["Developed frontend features."],
          },
        },
      });

      expect(mockCloseAction).toHaveBeenCalledTimes(1);
    });
  });

  it("should send end_date as null if it is not provided", async () => {
    render(<AddCvProjectForm {...defaultProps} />);

    fireEvent.change(screen.getByTestId("select-project"), {
      target: { value: "proj-2" },
    });

    const datePickers = screen.getAllByTestId("datepicker");
    fireEvent.change(datePickers[0], { target: { value: "2024-01-01" } }); // Only Start Date

    const responsibilitiesWrapper = screen.getByTestId(
      "modal-field-responsibilities",
    );
    const responsibilitiesInput =
      responsibilitiesWrapper.querySelector("textarea")!;
    fireEvent.change(responsibilitiesInput, {
      target: { value: "Backend work." },
    });

    fireEvent.click(screen.getByText("add"));

    await waitFor(() => {
      expect(mockAddCvProjectMutation).toHaveBeenCalledWith({
        variables: {
          project: expect.objectContaining({
            end_date: null,
          }),
        },
      });
    });
  });

  it("should call closeAction when cancel button is clicked", () => {
    render(<AddCvProjectForm {...defaultProps} />);

    fireEvent.click(screen.getByText("cancel"));

    expect(mockCloseAction).toHaveBeenCalledTimes(1);
    expect(mockAddCvProjectMutation).not.toHaveBeenCalled();
  });
});
