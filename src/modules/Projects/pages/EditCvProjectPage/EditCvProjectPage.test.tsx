import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { EditCvProjectPage } from "./EditCvProjectPage";
import { useQuery } from "@apollo/client/react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useUpdateCvProject } from "@/modules/Projects/hooks/useUpdateProject";
import { useAddCvProject } from "@/modules/Projects/hooks/useAddCvProject";
import { useRemoveCvProject } from "@/modules/Projects/hooks/useDeleteProject";

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

type MockModalFieldProps = {
  children: React.ReactNode;
  label: string;
  error?: string;
};

type MockConfirmButtonsProps = {
  confirmLabel: string;
  cancelAction: () => void;
  disabled?: boolean;
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
        {options.map((option: MockSelectOption) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  ),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("next-intl", () => ({
  useTranslations: jest.fn(),
}));

jest.mock("@apollo/client/react", () => ({
  useQuery: jest.fn(),
}));

jest.mock("@/modules/Projects/hooks/useUpdateProject", () => ({
  useUpdateCvProject: jest.fn(),
}));

jest.mock("@/modules/Projects/hooks/useAddCvProject", () => ({
  useAddCvProject: jest.fn(),
}));

jest.mock("@/modules/Projects/hooks/useDeleteProject", () => ({
  useRemoveCvProject: jest.fn(),
}));

jest.mock("@/shared/ui/Loading", () => ({
  Loading: () => <div data-testid="loading-state">Loading...</div>,
}));

jest.mock("@/shared/ui/Empty", () => ({
  Empty: () => <div data-testid="empty-state">No project found</div>,
}));

jest.mock("@/shared/ui/DatePicker/DatePicker", () => ({
  DatePicker: ({
    value,
    changeAction,
  }: {
    value: string;
    changeAction: (v: string) => void;
  }) => (
    <input
      type="date"
      data-testid="date-picker"
      value={value}
      onChange={(e) => changeAction(e.target.value)}
    />
  ),
}));

jest.mock("@/shared/ui/ModalField/ModalField", () => ({
  ModalField: ({ children, label, error }: MockModalFieldProps) => (
    <div data-testid="modal-field">
      <label>{label}</label>
      {children}
      {error && <span data-testid="field-error">{error}</span>}
    </div>
  ),
}));

jest.mock("@/shared/ui/ConfirmButtons", () => ({
  ConfirmButtons: ({
    confirmLabel,
    cancelAction,
    disabled,
  }: MockConfirmButtonsProps) => (
    <div>
      <button type="submit" disabled={disabled}>
        {confirmLabel}
      </button>
      <button type="button" onClick={cancelAction}>
        Cancel
      </button>
    </div>
  ),
}));

describe("EditCvProjectPage Component", () => {
  const mockCvId = "cv-111";
  const mockProjectId = "project-222";
  const mockRouterReplace = jest.fn();
  const mockUpdateCvProjectFn = jest.fn().mockResolvedValue({});
  const mockAddCvProjectFn = jest.fn().mockResolvedValue({});
  const mockRemoveCvProjectFn = jest.fn().mockResolvedValue({});
  const mockT = jest.fn((key: string) => key);

  const sampleQueryData = {
    cv: {
      projects: [
        {
          project: {
            id: mockProjectId,
            name: "Phoenix Dashboard",
            domain: "Fintech",
            description: "High scale financial layout",
            environment: ["Next.js", "GraphQL", "TypeScript"],
          },
          start_date: "2024-01-01",
          end_date: "2024-12-31",
          responsibilities: ["Architected core tables"],
          roles: ["Lead Frontend Developer"],
        },
      ],
    },
    projects: [
      {
        id: mockProjectId,
        name: "Phoenix Dashboard",
        domain: "Fintech",
        description: "High scale financial layout",
        environment: ["Next.js", "GraphQL", "TypeScript"],
      },
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      replace: mockRouterReplace,
    });
    (useTranslations as jest.Mock).mockReturnValue(mockT);
    (useUpdateCvProject as jest.Mock).mockReturnValue([
      mockUpdateCvProjectFn,
      {
        loading: false,
      },
    ]);
    (useAddCvProject as jest.Mock).mockReturnValue([
      mockAddCvProjectFn,
      {
        loading: false,
      },
    ]);
    (useRemoveCvProject as jest.Mock).mockReturnValue([
      mockRemoveCvProjectFn,
      {
        loading: false,
      },
    ]);
  });

  it("should render the loading fallback state when data is fetching", () => {
    (useQuery as unknown as jest.Mock).mockReturnValue({
      data: undefined,
      loading: true,
    });
    render(<EditCvProjectPage cvId={mockCvId} projectId={mockProjectId} />);
    expect(screen.getByTestId("loading-state")).toBeInTheDocument();
  });

  it("should render the empty state if the specified project ID is not found in payload data", () => {
    (useQuery as unknown as jest.Mock).mockReturnValue({
      data: {
        cv: {
          projects: [],
        },
        projects: [],
      },
      loading: false,
    });
    render(<EditCvProjectPage cvId={mockCvId} projectId="missing-project" />);
    expect(screen.getByTestId("empty-state")).toBeInTheDocument();
  });

  it("should correctly populate form values", () => {
    (useQuery as unknown as jest.Mock).mockReturnValue({
      data: sampleQueryData,
      loading: false,
    });
    render(<EditCvProjectPage cvId={mockCvId} projectId={mockProjectId} />);
    expect(screen.getByDisplayValue("Fintech")).toBeInTheDocument();
    expect(
      screen.getByDisplayValue("High scale financial layout"),
    ).toBeInTheDocument();
    expect(
      screen.getByDisplayValue("Next.js, GraphQL, TypeScript"),
    ).toBeInTheDocument();
    expect(
      screen.getByDisplayValue("Architected core tables"),
    ).toBeInTheDocument();
  });

  it("should redirect on cancel click", () => {
    (useQuery as unknown as jest.Mock).mockReturnValue({
      data: sampleQueryData,
      loading: false,
    });
    render(<EditCvProjectPage cvId={mockCvId} projectId={mockProjectId} />);
    fireEvent.click(
      screen.getByRole("button", {
        name: /cancel/i,
      }),
    );
    expect(mockRouterReplace).toHaveBeenCalledWith(`/cvs/${mockCvId}/projects`);
  });

  it("should show saving state", () => {
    (useQuery as unknown as jest.Mock).mockReturnValue({
      data: sampleQueryData,
      loading: false,
    });
    (useUpdateCvProject as jest.Mock).mockReturnValue([
      mockUpdateCvProjectFn,
      {
        loading: true,
      },
    ]);
    render(<EditCvProjectPage cvId={mockCvId} projectId={mockProjectId} />);
    expect(
      screen.getByRole("button", {
        name: /saving/i,
      }),
    ).toBeDisabled();
  });

  it("should submit update mutation", async () => {
    (useQuery as unknown as jest.Mock).mockReturnValue({
      data: sampleQueryData,
      loading: false,
    });
    render(<EditCvProjectPage cvId={mockCvId} projectId={mockProjectId} />);
    fireEvent.change(screen.getByDisplayValue("Architected core tables"), {
      target: {
        value: "Updated responsibility",
      },
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: /save/i,
      }),
    );
    await waitFor(() => {
      expect(mockUpdateCvProjectFn).toHaveBeenCalled();
    });
    expect(mockRouterReplace).toHaveBeenCalledWith(`/cvs/${mockCvId}/projects`);
  });
});
