import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AddSkillModal } from "./AddSkillModal";
const onToggleMock = jest.fn();

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

jest.mock("./AddSkillForm", () => ({
  AddSkillForm: ({ onToggle }: { onToggle: () => void }) => (
    <button type="button" onClick={onToggle}>
      form
    </button>
  ),
}));

jest.mock("@/shared/ui/FormModal", () => ({
  FormModal: ({
    title,
    children,
    toggleAction,
  }: {
    title: string;
    children: React.ReactNode;
    toggleAction: () => void;
  }) => (
    <div>
      <h1>{title}</h1>
      <button type="button" onClick={toggleAction}>
        close
      </button>
      {children}
    </div>
  ),
}));

describe("AddSkillModal", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders modal title", () => {
    render(<AddSkillModal open onToggle={onToggleMock} />);
    expect(screen.getByText("addSkill")).toBeInTheDocument();
  });

  it("renders AddSkillForm", () => {
    render(<AddSkillModal open onToggle={onToggleMock} />);
    expect(screen.getByText("form")).toBeInTheDocument();
  });

  it("calls onToggle from modal close button", async () => {
    render(<AddSkillModal open onToggle={onToggleMock} />);
    await userEvent.click(screen.getByText("close"));
    expect(onToggleMock).toHaveBeenCalled();
  });

  it("calls onToggle from form", async () => {
    render(<AddSkillModal open onToggle={onToggleMock} />);
    await userEvent.click(screen.getByText("form"));
    expect(onToggleMock).toHaveBeenCalled();
  });
});
