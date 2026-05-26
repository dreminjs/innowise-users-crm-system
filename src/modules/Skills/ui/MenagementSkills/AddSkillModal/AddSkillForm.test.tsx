import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { AddSkillForm } from "./AddSkillForm";
const handleAddProfileSkillMock = jest.fn();
const resetMock = jest.fn();
const handleSubmitMock =
  (callback: (data: unknown) => void) => (e?: React.FormEvent) => {
    e?.preventDefault();
    return callback({
      categoryId: "1",
      mastery: "Middle",
    });
  };
jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));
jest.mock("@/application/store/user.store", () => ({
  useUserStore: (selector: (state: { userId: string }) => unknown) =>
    selector({
      userId: "1",
    }),
}));
jest.mock("@apollo/client/react", () => ({
  useQuery: jest.fn((query: unknown) => {
    if (query === "GET_SKILLS") {
      return {
        data: {
          skills: [
            {
              id: "1",
              name: "React",
            },
            {
              id: "2",
              name: "Node",
            },
          ],
        },
      };
    }
    return {
      data: {
        profile: {
          skills: [
            {
              categoryId: "2",
            },
          ],
        },
      },
    };
  }),
}));
jest.mock("@/modules/Skills/api/queries", () => ({
  GET_PROFILE_SKILLS: "GET_PROFILE_SKILLS",
  GET_SKILLS: "GET_SKILLS",
}));
jest.mock("@/modules/Skills/model/hooks/useAddProfileSkill", () => ({
  useAddProfileSkill: () => ({
    handleAddProfileSkill:
      handleAddProfileSkillMock.mockResolvedValue(undefined),
  }),
}));
jest.mock("@/modules/Skills/model/hooks/useSkillForm", () => ({
  useSkillForm: () => ({
    control: {},
    currentCategoryId: "1",
    handleChangeSkill: jest.fn(),
    handleChangeMastery: jest.fn(),
    reset: resetMock,
    handleSubmit: handleSubmitMock,
  }),
}));

jest.mock("@/shared/ui/CustomSelect", () => ({
  CustomSelect: ({
    label,
    disabled,
  }: {
    label: string;
    disabled?: boolean;
  }) => (
    <div>
      <span>{label}</span>
      <span>{disabled ? "disabled" : "enabled"}</span>
    </div>
  ),
}));

jest.mock("@/shared/ui/ConfirmButtons", () => ({
  ConfirmButtons: ({ confirmLabel }: { confirmLabel: string }) => (
    <button type="submit">{confirmLabel}</button>
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
        value: "",
      },
    }),
}));
describe("AddSkillForm", () => {
  const onToggleMock = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("renders form", () => {
    render(<AddSkillForm onToggle={onToggleMock} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
  it("renders skill select", () => {
    render(<AddSkillForm onToggle={onToggleMock} />);
    expect(screen.getByText("Skills.chooseSkill")).toBeInTheDocument();
  });
  it("renders mastery select", () => {
    render(<AddSkillForm onToggle={onToggleMock} />);
    expect(screen.getByText("Skills.skillMastery")).toBeInTheDocument();
  });

  it("renders confirm button", () => {
    render(<AddSkillForm onToggle={onToggleMock} />);
    expect(
      screen.getByRole("button", {
        name: "ConfirmButtons.confirm",
      }),
    ).toBeInTheDocument();
  });
  it("calls handleAddProfileSkill on submit", async () => {
    render(<AddSkillForm onToggle={onToggleMock} />);
    fireEvent.click(screen.getByRole("button"));
    await waitFor(() => {
      expect(handleAddProfileSkillMock).toHaveBeenCalledWith({
        categoryId: "1",
        mastery: "Middle",
      });
    });
  });
  it("calls reset after submit", async () => {
    render(<AddSkillForm onToggle={onToggleMock} />);
    fireEvent.click(screen.getByRole("button"));
    await waitFor(() => {
      expect(resetMock).toHaveBeenCalled();
    });
  });
  it("calls onToggle after submit", async () => {
    render(<AddSkillForm onToggle={onToggleMock} />);
    fireEvent.click(screen.getByRole("button"));
    await waitFor(() => {
      expect(onToggleMock).toHaveBeenCalled();
    });
  });
});
