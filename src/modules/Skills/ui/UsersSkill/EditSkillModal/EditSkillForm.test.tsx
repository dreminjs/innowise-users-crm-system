import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Mastery } from "@/generated/graphql";
import { EditSkillForm } from "./EditSkillForm";
const handleEditProfileSkillMock = jest.fn();
const resetMock = jest.fn();
const handleSubmitMock = jest.fn();
const handleChangeSkillMock = jest.fn();
const handleChangeMasteryMock = jest.fn();
const onToggleMock = jest.fn();

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

jest.mock("@apollo/client/react", () => ({
  useQuery: jest.fn(),
}));

jest.mock("@/modules/Skills/model/hooks/useEditProfileSkill", () => ({
  useEditProfileSkill: () => ({
    handleEditProfileSkill: handleEditProfileSkillMock,
  }),
}));

jest.mock("@/modules/Skills/model/hooks/useSkillForm", () => ({
  useSkillForm: jest.fn(),
}));

jest.mock("@/shared/ui/CustomSelect", () => ({
  CustomSelect: ({
    label,
    value,
    disabled,
    onChange,
    options,
  }: {
    label: string;
    value: string;
    disabled?: boolean;
    onChange?: (value: string) => void;
    options: {
      value: string;
      label: string;
    }[];
  }) => (
    <div>
      <div>{label}</div>
      <div>
        value:
        {value}
      </div>
      <div>
        disabled:
        {String(disabled)}
      </div>
      <button type="button" onClick={() => onChange?.(options[0]?.value ?? "")}>
        change
      </button>
    </div>
  ),
}));

jest.mock("@/shared/ui/ConfirmButtons", () => ({
  ConfirmButtons: ({ cancelAction }: { cancelAction: () => void }) => (
    <div>
      <button type="submit">submit</button>
      <button type="button" onClick={cancelAction}>
        cancel
      </button>
    </div>
  ),
}));

jest.mock("react-hook-form", () => ({
  Controller: ({
    render,
  }: {
    render: (props: {
      field: {
        value: string;
      };
    }) => React.ReactNode;
  }) =>
    render({
      field: {
        value: "1",
      },
    }),
}));

jest.mock("@/modules/Skills/model/skill.constants", () => ({
  skillLevels: ["Novice", "Expert"],
}));
jest.mock("@/modules/Skills/api/queries", () => ({
  GET_SKILLS: "GET_SKILLS",
}));
const { useQuery } = jest.requireMock("@apollo/client/react");
const { useSkillForm } = jest.requireMock(
  "@/modules/Skills/model/hooks/useSkillForm",
);
describe("EditSkillForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    handleSubmitMock.mockImplementation((callback: (data: unknown) => void) => {
      return async (e?: React.FormEvent) => {
        e?.preventDefault();
        callback({
          categoryId: "1",
          mastery: Mastery.Expert,
        });
      };
    });

    useSkillForm.mockReturnValue({
      control: {},
      handleChangeSkill: handleChangeSkillMock,
      handleChangeMastery: handleChangeMasteryMock,
      currentCategoryId: "1",
      handleSubmit: handleSubmitMock,
      reset: resetMock,
    });
    useQuery.mockReturnValue({
      data: {
        skills: [
          {
            id: "1",
            name: "React",
          },
        ],
      },
    });
    handleEditProfileSkillMock.mockResolvedValue(undefined);
  });
  it("renders form", () => {
    render(
      <EditSkillForm
        onToggle={onToggleMock}
        categoryId="1"
        mastery={Mastery.Expert}
      />,
    );
    expect(
      screen.getByRole("button", {
        name: "submit",
      }),
    ).toBeInTheDocument();
  });
  it("renders skill select", () => {
    render(
      <EditSkillForm
        onToggle={onToggleMock}
        categoryId="1"
        mastery={Mastery.Expert}
      />,
    );
    expect(screen.getByText("Skills.chooseSkill")).toBeInTheDocument();
  });
  it("renders mastery select", () => {
    render(
      <EditSkillForm
        onToggle={onToggleMock}
        categoryId="1"
        mastery={Mastery.Expert}
      />,
    );
    expect(screen.getByText("Skills.skillMastery")).toBeInTheDocument();
  });

  it("calls handleChangeSkill", async () => {
    render(
      <EditSkillForm
        onToggle={onToggleMock}
        categoryId="1"
        mastery={Mastery.Expert}
      />,
    );
    const buttons = screen.getAllByRole("button", {
      name: "change",
    });
    await userEvent.click(buttons[0]);
    expect(handleChangeSkillMock).toHaveBeenCalledWith("1");
  });
  it("calls handleChangeMastery", async () => {
    render(
      <EditSkillForm
        onToggle={onToggleMock}
        categoryId="1"
        mastery={Mastery.Expert}
      />,
    );
    const buttons = screen.getAllByRole("button", {
      name: "change",
    });
    await userEvent.click(buttons[1]);
    expect(handleChangeMasteryMock).toHaveBeenCalled();
  });

  it("submits form", async () => {
    render(
      <EditSkillForm
        onToggle={onToggleMock}
        categoryId="1"
        mastery={Mastery.Expert}
      />,
    );

    await userEvent.click(
      screen.getByRole("button", {
        name: "submit",
      }),
    );
    await waitFor(() => {
      expect(handleEditProfileSkillMock).toHaveBeenCalledWith({
        categoryId: "1",
        mastery: Mastery.Expert,
      });
    });
  });

  it("calls onToggle after submit", async () => {
    render(
      <EditSkillForm
        onToggle={onToggleMock}
        categoryId="1"
        mastery={Mastery.Expert}
      />,
    );
    await userEvent.click(
      screen.getByRole("button", {
        name: "submit",
      }),
    );
    await waitFor(() => {
      expect(onToggleMock).toHaveBeenCalled();
    });
  });

  it("calls reset after submit", async () => {
    render(
      <EditSkillForm
        onToggle={onToggleMock}
        categoryId="1"
        mastery={Mastery.Expert}
      />,
    );
    await userEvent.click(
      screen.getByRole("button", {
        name: "submit",
      }),
    );
    await waitFor(() => {
      expect(resetMock).toHaveBeenCalled();
    });
  });

  it("calls cancel button", async () => {
    render(
      <EditSkillForm
        onToggle={onToggleMock}
        categoryId="1"
        mastery={Mastery.Expert}
      />,
    );
    await userEvent.click(
      screen.getByRole("button", {
        name: "cancel",
      }),
    );
    expect(onToggleMock).toHaveBeenCalled();
  });

  it("disables mastery select without currentCategoryId", () => {
    useSkillForm.mockReturnValue({
      control: {},
      handleChangeSkill: handleChangeSkillMock,
      handleChangeMastery: handleChangeMasteryMock,
      currentCategoryId: "",
      handleSubmit: handleSubmitMock,
      reset: resetMock,
    });
    render(
      <EditSkillForm
        onToggle={onToggleMock}
        categoryId="1"
        mastery={Mastery.Expert}
      />,
    );
    expect(screen.getAllByText("disabled:true")[1]).toBeInTheDocument();
  });
});
