import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { EditCvProjectForm } from "./EditCvProjectForm";

const mockSubmitAction = jest.fn();
const mockCancelAction = jest.fn();

jest.mock("next-intl", () => ({
  useTranslations: jest.fn(() => (key: string) => key),
}));

jest.mock("@/shared/ui/DatePicker/DatePicker", () => ({
  DatePicker: ({
    value,
    changeAction,
  }: {
    value: string;
    changeAction: (value: string) => void;
  }) => (
    <input
      data-testid="date-picker"
      value={value}
      onChange={(e) => changeAction(e.target.value)}
    />
  ),
}));

type MockModalFieldProps = {
  children: React.ReactNode;
  label: string;
};

jest.mock("@/shared/ui/ModalField/ModalField", () => ({
  ModalField: ({ children, label }: MockModalFieldProps) => (
    <div>
      <span>{label}</span>
      {children}
    </div>
  ),
}));

type MockConfirmButtonsProps = {
  confirmLabel: string;
  cancelAction: () => void;
  disabled?: boolean;
  confirmButtonType: "submit" | "button";
};

jest.mock("@/shared/ui/ConfirmButtons", () => ({
  ConfirmButtons: ({
    confirmLabel,
    cancelAction,
    disabled,
    confirmButtonType,
  }: MockConfirmButtonsProps) => (
    <div>
      <button type={confirmButtonType} disabled={disabled}>
        {confirmLabel}
      </button>

      <button type="button" onClick={cancelAction}>
        cancel
      </button>
    </div>
  ),
}));

type MockSelectOption = {
  label: string;
  value: string;
};

type MockCustomSelectProps = {
  label: string;
  value: string | null;
  onChange?: (value: string) => void;
  options: MockSelectOption[];
};

jest.mock("@/shared/ui/CustomSelect/CustomSelect", () => ({
  CustomSelect: ({
    label,
    value,
    onChange,
    options,
  }: MockCustomSelectProps) => (
    <div>
      <label>{label}</label>

      <select
        aria-label={label}
        value={value ?? ""}
        onChange={(e) => onChange?.(e.target.value)}
      >
        <option value="">empty</option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  ),
}));

describe("EditCvProjectForm", () => {
  const initialValues = {
    projectId: "project-1",
    name: "CRM Platform",
    domain: "Fintech",
    description: "CRM description",
    environment: ["React", "GraphQL"],
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    responsibilities: "Build UI",
  };

  const projectOptions = [
    {
      label: "CRM Platform",
      value: "project-1",
      domain: "Fintech",
      description: "CRM description",
      environment: ["React", "GraphQL"],
    },
    {
      label: "HR Dashboard",
      value: "project-2",
      domain: "HR",
      description: "HR description",
      environment: ["Vue"],
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders initial values", () => {
    render(
      <EditCvProjectForm
        initialValues={initialValues}
        loading={false}
        projectOptions={projectOptions}
        usedProjectIds={[]}
        submitAction={mockSubmitAction}
        cancelAction={mockCancelAction}
      />,
    );
    expect(screen.getByDisplayValue("Fintech")).toBeInTheDocument();
    expect(screen.getByDisplayValue("CRM description")).toBeInTheDocument();
    expect(screen.getByDisplayValue("React, GraphQL")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Build UI")).toBeInTheDocument();
  });

  it("changes project values when select changes", () => {
    render(
      <EditCvProjectForm
        initialValues={initialValues}
        loading={false}
        projectOptions={projectOptions}
        usedProjectIds={[]}
        submitAction={mockSubmitAction}
        cancelAction={mockCancelAction}
      />,
    );

    fireEvent.change(screen.getByLabelText("project"), {
      target: {
        value: "project-2",
      },
    });
    expect(screen.getByDisplayValue("HR")).toBeInTheDocument();
    expect(screen.getByDisplayValue("HR description")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Vue")).toBeInTheDocument();
  });

  it("filters used projects", () => {
    render(
      <EditCvProjectForm
        initialValues={initialValues}
        loading={false}
        projectOptions={projectOptions}
        usedProjectIds={["project-2"]}
        submitAction={mockSubmitAction}
        cancelAction={mockCancelAction}
      />,
    );
    expect(screen.queryByText("HR Dashboard")).not.toBeInTheDocument();
  });
  it("calls submitAction", async () => {
    mockSubmitAction.mockResolvedValue(undefined);

    render(
      <EditCvProjectForm
        initialValues={initialValues}
        loading={false}
        projectOptions={projectOptions}
        usedProjectIds={[]}
        submitAction={mockSubmitAction}
        cancelAction={mockCancelAction}
      />,
    );
    fireEvent.change(screen.getByDisplayValue("Build UI"), {
      target: {
        value: "Updated responsibilities",
      },
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: "save",
      }),
    );

    await waitFor(() => {
      expect(mockSubmitAction).toHaveBeenCalled();
    });
  });

  it("calls cancelAction", () => {
    render(
      <EditCvProjectForm
        initialValues={initialValues}
        loading={false}
        projectOptions={projectOptions}
        usedProjectIds={[]}
        submitAction={mockSubmitAction}
        cancelAction={mockCancelAction}
      />,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "cancel",
      }),
    );

    expect(mockCancelAction).toHaveBeenCalled();
  });

  it("disables submit button when loading", () => {
    render(
      <EditCvProjectForm
        initialValues={initialValues}
        loading
        projectOptions={projectOptions}
        usedProjectIds={[]}
        submitAction={mockSubmitAction}
        cancelAction={mockCancelAction}
      />,
    );
    expect(
      screen.getByRole("button", {
        name: "saving",
      }),
    ).toBeDisabled();
  });
});
