import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Mastery } from "@/generated/graphql";
import { EditSkillModal } from "./EditSkillModal";
const onCloseMock = jest.fn();
jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
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

jest.mock("./EditSkillForm", () => ({
  EditSkillForm: ({
    categoryId,
    mastery,
    onToggle,
  }: {
    categoryId: string;
    mastery: string;
    onToggle: () => void;
  }) => (
    <div>
      <div>
        form:
        {categoryId}:{mastery}
      </div>

      <button type="button" onClick={onToggle}>
        form-close
      </button>
    </div>
  ),
}));

describe("EditSkillModal", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders modal title", () => {
    render(
      <EditSkillModal
        open
        onClose={onCloseMock}
        categoryId="1"
        mastery={Mastery.Expert}
      />,
    );
    expect(screen.getByText("editSkill")).toBeInTheDocument();
  });

  it("renders EditSkillForm when modal is open", () => {
    render(
      <EditSkillModal
        open
        onClose={onCloseMock}
        categoryId="1"
        mastery={Mastery.Expert}
      />,
    );
    expect(screen.getByText("form:1:Expert")).toBeInTheDocument();
  });

  it("does not render EditSkillForm when modal is closed", () => {
    render(
      <EditSkillModal
        open={false}
        onClose={onCloseMock}
        categoryId="1"
        mastery={Mastery.Expert}
      />,
    );
    expect(screen.queryByText("form:1:Expert")).not.toBeInTheDocument();
  });

  it("does not render EditSkillForm without categoryId", () => {
    render(
      <EditSkillModal
        open
        onClose={onCloseMock}
        categoryId={null}
        mastery={Mastery.Expert}
      />,
    );
    expect(screen.queryByText(/form:/i)).not.toBeInTheDocument();
  });

  it("calls onClose from modal close button", async () => {
    render(
      <EditSkillModal
        open
        onClose={onCloseMock}
        categoryId="1"
        mastery={Mastery.Expert}
      />,
    );
    await userEvent.click(screen.getByText("close"));
    expect(onCloseMock).toHaveBeenCalled();
  });

  it("calls onClose from form", async () => {
    render(
      <EditSkillModal
        open
        onClose={onCloseMock}
        categoryId="1"
        mastery={Mastery.Expert}
      />,
    );
    await userEvent.click(screen.getByText("form-close"));
    expect(onCloseMock).toHaveBeenCalled();
  });

  it("passes mastery to form", () => {
    render(
      <EditSkillModal
        open
        onClose={onCloseMock}
        categoryId="1"
        mastery={Mastery.Advanced}
      />,
    );
    expect(screen.getByText("form:1:Advanced")).toBeInTheDocument();
  });
});
