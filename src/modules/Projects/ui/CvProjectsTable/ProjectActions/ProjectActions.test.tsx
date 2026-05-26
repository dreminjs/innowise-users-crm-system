import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ProjectActions } from "./ProjectActions";
import { useRemoveCvProject } from "@/modules/Projects/hooks/useDeleteProject";

const mockRemoveCvProject = jest.fn();

jest.mock("next-intl", () => ({
  useTranslations: jest.fn(() => (key: string) => key),
}));

jest.mock("@/modules/Projects/hooks/useDeleteProject", () => ({
  useRemoveCvProject: jest.fn(),
}));

type MockActionItem =
  | {
      type: "link";
      label: string;
      href: string;
    }
  | {
      type: "button";
      label: string;
      variant: string;
      onClick: () => Promise<void>;
    };

type MockActionsMenuProps = {
  items: MockActionItem[];
};

jest.mock("@/shared/ui/ActionsMenu/ActionsMenu", () => ({
  ActionsMenu: ({ items }: MockActionsMenuProps) => (
    <div>
      {items.map((item) => {
        if (item.type === "link") {
          return (
            <a key={item.label} href={item.href}>
              {item.label}
            </a>
          );
        }

        return (
          <button key={item.label} type="button" onClick={item.onClick}>
            {item.label}
          </button>
        );
      })}
    </div>
  ),
}));

describe("ProjectActions", () => {
  const mockCvId = "cv-123";

  const mockProjectId = "project-456";

  beforeEach(() => {
    jest.clearAllMocks();

    (useRemoveCvProject as jest.Mock).mockReturnValue([mockRemoveCvProject]);
  });

  it("renders edit link", () => {
    render(<ProjectActions cvId={mockCvId} projectId={mockProjectId} />);

    expect(
      screen.getByRole("link", {
        name: "edit",
      }),
    ).toHaveAttribute("href", `/cvs/${mockCvId}/projects/${mockProjectId}`);
  });

  it("renders remove button", () => {
    render(<ProjectActions cvId={mockCvId} projectId={mockProjectId} />);

    expect(
      screen.getByRole("button", {
        name: "remove",
      }),
    ).toBeInTheDocument();
  });

  it("calls removeCvProject on remove click", async () => {
    mockRemoveCvProject.mockResolvedValue({});
    render(<ProjectActions cvId={mockCvId} projectId={mockProjectId} />);
    fireEvent.click(
      screen.getByRole("button", {
        name: "remove",
      }),
    );
    await waitFor(() => {
      expect(mockRemoveCvProject).toHaveBeenCalledWith({
        variables: {
          project: {
            cvId: mockCvId,
            projectId: mockProjectId,
          },
        },
      });
    });
  });
  it("passes cvId to useRemoveCvProject", () => {
    render(<ProjectActions cvId={mockCvId} projectId={mockProjectId} />);
    expect(useRemoveCvProject).toHaveBeenCalledWith(mockCvId);
  });
});
