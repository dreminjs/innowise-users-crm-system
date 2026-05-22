import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SkillActions } from "./SkillActions";
const deleteSkillMock = jest.fn();
const updateSkillMock = jest.fn();

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

jest.mock("@/modules/Skills/model/hooks/useDeleteSkill", () => ({
  useDeleteSkill: () => ({
    deleteSkill: deleteSkillMock,
  }),
}));

jest.mock("@/modules/Skills/model/hooks/useUpdateSkill", () => ({
  useUpdateSkill: () => ({
    updateSkill: updateSkillMock,
    loading: false,
  }),
}));

jest.mock("@/shared/ui/ActionsMenu/ActionsMenu", () => ({
  ActionsMenu: ({
    items,
  }: {
    items: {
      label: string;
      onClick: () => void;
    }[];
  }) => (
    <div>
      {items.map((item) => (
        <button key={item.label} type="button" onClick={item.onClick}>
          {item.label}
        </button>
      ))}
    </div>
  ),
}));

jest.mock("@/modules/Skills/ui/SkillModal/SkillModal", () => ({
  SkillModal: ({
    open,
    submitAction,
    defaultValues,
    confirmLabel,
  }: {
    open: boolean;
    submitAction: (values: {
      name: string;
      categoryId: string | null;
    }) => Promise<void>;
    defaultValues: {
      name: string;
      categoryId: string;
    };
    confirmLabel: string;
  }) =>
    open ? (
      <div>
        <div>
          modal:
          {defaultValues.name}
        </div>

        <button
          type="button"
          onClick={() =>
            submitAction({
              name: "Updated React",
              categoryId: "2",
            })
          }
        >
          {confirmLabel}
        </button>
      </div>
    ) : null,
}));

describe("SkillActions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders edit button", () => {
    render(<SkillActions skillId="1" skillName="React" categoryId="1" />);
    expect(screen.getByText("edit")).toBeInTheDocument();
  });

  it("renders delete button", () => {
    render(<SkillActions skillId="1" skillName="React" categoryId="1" />);
    expect(screen.getByText("delete")).toBeInTheDocument();
  });

  it("opens edit modal", async () => {
    render(<SkillActions skillId="1" skillName="React" categoryId="1" />);
    await userEvent.click(screen.getByText("edit"));
    expect(screen.getByText("modal:React")).toBeInTheDocument();
  });

  it("calls deleteSkill", async () => {
    deleteSkillMock.mockResolvedValue(undefined);
    render(<SkillActions skillId="1" skillName="React" categoryId="1" />);
    await userEvent.click(screen.getByText("delete"));
    await waitFor(() => {
      expect(deleteSkillMock).toHaveBeenCalledWith({
        variables: {
          skill: {
            skillId: "1",
          },
        },
      });
    });
  });

  it("calls updateSkill", async () => {
    updateSkillMock.mockResolvedValue(undefined);
    render(<SkillActions skillId="1" skillName="React" categoryId="1" />);
    await userEvent.click(screen.getByText("edit"));
    await userEvent.click(screen.getByText("save"));
    await waitFor(() => {
      expect(updateSkillMock).toHaveBeenCalledWith({
        variables: {
          skill: {
            skillId: "1",
            name: "Updated React",
            categoryId: "2",
          },
        },
      });
    });
  });

  it("passes default values to modal", async () => {
    render(<SkillActions skillId="1" skillName="React" categoryId="1" />);
    await userEvent.click(screen.getByText("edit"));
    expect(screen.getByText("modal:React")).toBeInTheDocument();
  });
  it("renders modal with fallback categoryId", async () => {
    render(<SkillActions skillId="1" skillName="React" />);
    await userEvent.click(screen.getByText("edit"));
    expect(screen.getByText("modal:React")).toBeInTheDocument();
  });
});
