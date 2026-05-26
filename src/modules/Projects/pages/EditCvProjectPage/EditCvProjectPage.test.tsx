import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { EditCvProjectPage } from "./EditCvProjectPage";
import { useQuery } from "@apollo/client/react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useUpdateCvProject } from "@/modules/Projects/hooks/useUpdateProject";

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

jest.mock("@/modules/Projects/model/addCvProject.schema", () => {
  const { z } = require("zod");
  return {
    createAddCvProjectSchema: jest.fn(() =>
      z.object({
        projectId: z.string().optional(),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        responsibilities: z.string().optional(),
      }),
    ),
  };
});
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
  };

  beforeEach(() => {
    jest.clearAllMocks();

    (useRouter as jest.Mock).mockReturnValue({ replace: mockRouterReplace });
    (useTranslations as jest.Mock).mockReturnValue(mockT);
    (useUpdateCvProject as jest.Mock).mockReturnValue([
      mockUpdateCvProjectFn,
      { loading: false },
    ]);
  });

  it("should render the loading fallback state when data is fetching", () => {
    (useQuery as unknown as jest.Mock).mockReturnValue({
      data: undefined,
      loading: true,
    });

    render(<EditCvProjectPage cvId={mockCvId} projectId={mockProjectId} />);

    expect(screen.getByTestId("loading-state")).toBeInTheDocument();
    expect(screen.queryByRole("form")).not.toBeInTheDocument();
  });

  it("should render the empty state if the specified project ID is not found in payload data", () => {
    (useQuery as unknown as jest.Mock).mockReturnValue({
      data: { cv: { projects: [] } },
      loading: false,
    });

    render(<EditCvProjectPage cvId={mockCvId} projectId="non-existent-id" />);

    expect(screen.getByTestId("empty-state")).toBeInTheDocument();
  });

  it("should correctly populate all read-only fields and prefill input form values", () => {
    (useQuery as unknown as jest.Mock).mockReturnValue({
      data: sampleQueryData,
      loading: false,
    });

    render(<EditCvProjectPage cvId={mockCvId} projectId={mockProjectId} />);

    expect(screen.getByDisplayValue("Phoenix Dashboard")).toBeInTheDocument();
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

    const datePickers = screen.getAllByTestId(
      "date-picker",
    ) as HTMLInputElement[];
    expect(datePickers[0].value).toBe("2024-01-01");
    expect(datePickers[1].value).toBe("2024-12-31");
  });

  it("should redirect back to projects overview list when clicking Cancel", () => {
    (useQuery as unknown as jest.Mock).mockReturnValue({
      data: sampleQueryData,
      loading: false,
    });

    render(<EditCvProjectPage cvId={mockCvId} projectId={mockProjectId} />);

    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    fireEvent.click(cancelButton);

    expect(mockRouterReplace).toHaveBeenCalledWith(`/cvs/${mockCvId}/projects`);
  });

  it("should display a localized saving indicator status and disable buttons during submission", () => {
    (useQuery as unknown as jest.Mock).mockReturnValue({
      data: sampleQueryData,
      loading: false,
    });
    (useUpdateCvProject as jest.Mock).mockReturnValue([
      mockUpdateCvProjectFn,
      { loading: true },
    ]);

    render(<EditCvProjectPage cvId={mockCvId} projectId={mockProjectId} />);

    const submitButton = screen.getByRole("button", { name: /saving/i });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  it("should transform parameters properly, submit the update mutation hook, and redirect upon completion", async () => {
    (useQuery as unknown as jest.Mock).mockReturnValue({
      data: sampleQueryData,
      loading: false,
    });

    render(<EditCvProjectPage cvId={mockCvId} projectId={mockProjectId} />);

    const textarea = screen.getByDisplayValue("Architected core tables");
    fireEvent.change(textarea, {
      target: { value: "Refactored absolute layout structures" },
    });

    const saveButton = screen.getByRole("button", { name: /save/i });
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(mockUpdateCvProjectFn).toHaveBeenCalledWith({
        variables: {
          project: {
            cvId: mockCvId,
            projectId: mockProjectId,
            start_date: "2024-01-01",
            end_date: "2024-12-31",
            roles: ["Lead Frontend Developer"],
            responsibilities: ["Refactored absolute layout structures"],
          },
        },
      });
    });

    expect(mockRouterReplace).toHaveBeenCalledWith(`/cvs/${mockCvId}/projects`);
  });
});
