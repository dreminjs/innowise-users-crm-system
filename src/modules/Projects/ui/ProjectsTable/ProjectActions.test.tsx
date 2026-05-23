import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProjectActions } from "./ProjectActions";
const mockDeleteProject = jest.fn();
jest.mock("@/modules/Projects/hooks/useDeleteProject", () => ({
  useDeleteProject: () => ({
    deleteProject: mockDeleteProject,
  }),
}));

const mockUpdateProject = jest.fn();
jest.mock("@/modules/Projects/hooks/useUpdateProject", () => ({
  useUpdateProject: () => ({
    updateProject: mockUpdateProject,
    loading: false,
  }),
}));

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => `translated_${key}`,
}));

jest.mock("@/shared/ui/ActionsMenu/ActionsMenu", () => ({
  ActionsMenu: ({ items }: any) => (
    <div data-testid="actions-menu">
      {items.map((item: any, index: number) => (
        <button
          key={index}
          onClick={item.onClick}
          data-testid={`menu-btn-${item.label}`}
        >
          {item.label}
        </button>
      ))}
    </div>
  ),
}));

jest.mock("../ProjectModal/ProjectModal", () => ({
  ProjectModal: ({ open, toggleAction, submitAction, defaultValues }: any) => {
    if (!open) return null;
    return (
      <div
        data-testid="project-modal"
        data-values={JSON.stringify(defaultValues)}
      >
        <button data-testid="modal-close-btn" onClick={toggleAction}>
          Close
        </button>
        <button
          data-testid="modal-submit-btn"
          onClick={() =>
            submitAction({
              name: "Updated Name",
              domain: "Updated Domain",
              description: "Updated Desc",
              environment: ["Jest"],
              start_date: "2024-01-01",
              end_date: "2024-12-31",
            })
          }
        >
          Submit
        </button>
      </div>
    );
  },
}));

describe("ProjectActions", () => {
  const mockProject = {
    id: "proj-123",
    name: "Initial Project",
    domain: "Fintech",
    description: "Some description",
    environment: ["React"],
    start_date: "2023-01-01",
    end_date: null,
  } as any;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the ActionsMenu", () => {
    render(<ProjectActions project={mockProject} />);

    expect(screen.getByTestId("menu-btn-translated_edit")).toBeInTheDocument();
    expect(
      screen.getByTestId("menu-btn-translated_remove"),
    ).toBeInTheDocument();

    expect(screen.queryByTestId("project-modal")).not.toBeInTheDocument();
  });

  it("calls deleteProject with the correct projectId when clicking 'Delete'", async () => {
    const user = userEvent.setup();
    render(<ProjectActions project={mockProject} />);

    const removeBtn = screen.getByTestId("menu-btn-translated_remove");
    await user.click(removeBtn);

    expect(mockDeleteProject).toHaveBeenCalledTimes(1);
    expect(mockDeleteProject).toHaveBeenCalledWith({
      variables: {
        project: {
          projectId: mockProject.id,
        },
      },
    });
  });

  it("opens a modal and passes the correct defaultValues when clicking 'Edit'", async () => {
    const user = userEvent.setup();
    render(<ProjectActions project={mockProject} />);

    const editBtn = screen.getByTestId("menu-btn-translated_edit");
    await user.click(editBtn);

    const modal = screen.getByTestId("project-modal");
    expect(modal).toBeInTheDocument();

    const expectedValues = {
      name: "Initial Project",
      domain: "Fintech",
      description: "Some description",
      environment: ["React"],
      start_date: "2023-01-01",
      end_date: "",
    };
    expect(modal).toHaveAttribute(
      "data-values",
      JSON.stringify(expectedValues),
    );
  });

  it("calls updateProject and closes the modal upon submission", async () => {
    const user = userEvent.setup();
    render(<ProjectActions project={mockProject} />);

    await user.click(screen.getByTestId("menu-btn-translated_edit"));
    expect(screen.getByTestId("project-modal")).toBeInTheDocument();

    const submitBtn = screen.getByTestId("modal-submit-btn");
    await user.click(submitBtn);

    expect(mockUpdateProject).toHaveBeenCalledTimes(1);
    expect(mockUpdateProject).toHaveBeenCalledWith({
      variables: {
        project: {
          projectId: mockProject.id,
          name: "Updated Name",
          domain: "Updated Domain",
          description: "Updated Desc",
          environment: ["Jest"],
          start_date: "2024-01-01",
          end_date: "2024-12-31",
        },
      },
    });

    await waitFor(() => {
      expect(screen.queryByTestId("project-modal")).not.toBeInTheDocument();
    });
  });

  it("closes the modal when toggleAction is called", async () => {
    const user = userEvent.setup();
    render(<ProjectActions project={mockProject} />);

    await user.click(screen.getByTestId("menu-btn-translated_edit"));
    expect(screen.getByTestId("project-modal")).toBeInTheDocument();

    const closeBtn = screen.getByTestId("modal-close-btn");
    await user.click(closeBtn);

    expect(screen.queryByTestId("project-modal")).not.toBeInTheDocument();
  });
});
