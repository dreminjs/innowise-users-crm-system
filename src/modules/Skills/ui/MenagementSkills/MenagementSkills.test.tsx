import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MenagementSkills } from "./MenagementSkills";
const toggleDeleteModeMock = jest.fn();
jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));
jest.mock("../../model/skill.store", () => ({
  useSkillStore: jest.fn(),
}));
jest.mock("@/shared/ui/AddNewButton", () => ({
  AddNewButton: ({
    onClick,
    label,
  }: {
    onClick: () => void;
    label: string;
  }) => (
    <button type="button" onClick={onClick}>
      {label}
    </button>
  ),
}));
jest.mock("@/shared/ui/RemoveItemButton", () => ({
  RemoveItemButton: ({
    onClick,
    label,
  }: {
    onClick: () => void;
    label: string;
  }) => (
    <button type="button" onClick={onClick}>
      {label}
    </button>
  ),
}));

jest.mock("./RemoveSkillsButton", () => ({
  RemoveSkillsButton: () => <button type="button">remove skills</button>,
}));

jest.mock("./AddSkillModal/AddSkillModal", () => ({
  AddSkillModal: ({ open }: { open: boolean }) =>
    open ? <div>add skill modal</div> : null,
}));
const { useSkillStore } = jest.requireMock("../../model/skill.store");
describe("MenagementSkills", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders add skill button", () => {
    useSkillStore.mockReturnValue({
      isDeleteMode: false,
      toggleDeleteMode: toggleDeleteModeMock,
    });
    render(<MenagementSkills isAvailableToDelete />);
    expect(screen.getByText("Skills.addSkill")).toBeInTheDocument();
  });

  it("renders remove skill button", () => {
    useSkillStore.mockReturnValue({
      isDeleteMode: false,
      toggleDeleteMode: toggleDeleteModeMock,
    });
    render(<MenagementSkills isAvailableToDelete />);
    expect(screen.getByText("Skills.deleteSkill")).toBeInTheDocument();
  });

  it("does not render remove button when delete is unavailable", () => {
    useSkillStore.mockReturnValue({
      isDeleteMode: false,
      toggleDeleteMode: toggleDeleteModeMock,
    });
    render(<MenagementSkills isAvailableToDelete={false} />);
    expect(screen.queryByText("Skills.deleteSkill")).not.toBeInTheDocument();
  });

  it("renders delete mode buttons", () => {
    useSkillStore.mockReturnValue({
      isDeleteMode: true,
      toggleDeleteMode: toggleDeleteModeMock,
    });
    render(<MenagementSkills isAvailableToDelete />);
    expect(screen.getByText("ConfirmButtons.cancel")).toBeInTheDocument();
    expect(screen.getByText("remove skills")).toBeInTheDocument();
  });

  it("calls toggleDeleteMode on cancel click", async () => {
    useSkillStore.mockReturnValue({
      isDeleteMode: true,
      toggleDeleteMode: toggleDeleteModeMock,
    });
    render(<MenagementSkills isAvailableToDelete />);
    await userEvent.click(screen.getByText("ConfirmButtons.cancel"));
    expect(toggleDeleteModeMock).toHaveBeenCalled();
  });

  it("calls toggleDeleteMode on remove click", async () => {
    useSkillStore.mockReturnValue({
      isDeleteMode: false,
      toggleDeleteMode: toggleDeleteModeMock,
    });
    render(<MenagementSkills isAvailableToDelete />);
    await userEvent.click(screen.getByText("Skills.deleteSkill"));
    expect(toggleDeleteModeMock).toHaveBeenCalled();
  });

  it("opens add skill modal", async () => {
    useSkillStore.mockReturnValue({
      isDeleteMode: false,
      toggleDeleteMode: toggleDeleteModeMock,
    });
    render(<MenagementSkills isAvailableToDelete />);
    await userEvent.click(screen.getByText("Skills.addSkill"));
    expect(screen.getByText("add skill modal")).toBeInTheDocument();
  });
});
