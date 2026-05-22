import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Mastery } from "@/generated/graphql";
import { SkillsList } from "./SkillsList";
const toggleDeleteSkillMock = jest.fn();

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

jest.mock("../../../model/skill.store", () => ({
  useSkillStore: jest.fn(),
}));

jest.mock("./SkillItem", () => ({
  SkillItem: ({
    name,
    onClick,
    isActive,
  }: {
    name: string;
    onClick?: () => void;
    isActive: boolean;
  }) => (
    <button type="button" onClick={onClick}>
      {name}:{String(isActive)}
    </button>
  ),
}));
jest.mock("@/shared/ui/Empty", () => ({
  Empty: () => <div>empty</div>,
}));
jest.mock("../EditSkillModal/EditSkillModal", () => ({
  EditSkillModal: ({
    open,
    categoryId,
    mastery,
    onClose,
  }: {
    open: boolean;
    categoryId: string;
    mastery: string;
    onClose: () => void;
  }) =>
    open ? (
      <div>
        <div>
          modal:
          {categoryId}:{mastery}
        </div>
        <button type="button" onClick={onClose}>
          close
        </button>
      </div>
    ) : null,
}));
const { useSkillStore } = jest.requireMock("../../../model/skill.store");
describe("SkillsList", () => {
  const categoriesData = {
    skillCategories: [
      {
        id: "1",
        name: "Frontend",
        parent: null,
      },

      {
        id: "2",
        name: "React",
        parent: {
          id: "1",
          name: "Frontend",
        },
      },
    ],
  };
  const profileSkillsData = {
    profile: {
      skills: [
        {
          name: "React",
          mastery: Mastery.Expert,
          categoryId: "2",
        },
      ],
    },
  };
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("renders grouped category name", () => {
    useSkillStore.mockReturnValue({
      deleteSkills: {},
      toggleDeleteSkill: toggleDeleteSkillMock,
      isDeleteMode: false,
    });
    render(
      <SkillsList
        categoriesData={categoriesData}
        profileSkillsData={profileSkillsData}
        isAvailableToChange
      />,
    );
    expect(screen.getByText("Frontend")).toBeInTheDocument();
  });
  it("renders skill item", () => {
    useSkillStore.mockReturnValue({
      deleteSkills: {},
      toggleDeleteSkill: toggleDeleteSkillMock,
      isDeleteMode: false,
    });
    render(
      <SkillsList
        categoriesData={categoriesData}
        profileSkillsData={profileSkillsData}
        isAvailableToChange
      />,
    );
    expect(screen.getByText("React:false")).toBeInTheDocument();
  });
  it("renders Empty when grouped skills are empty", () => {
    useSkillStore.mockReturnValue({
      deleteSkills: {},
      toggleDeleteSkill: toggleDeleteSkillMock,
      isDeleteMode: false,
    });
    render(
      <SkillsList
        categoriesData={{
          skillCategories: [],
        }}
        profileSkillsData={{
          profile: {
            skills: [],
          },
        }}
        isAvailableToChange
      />,
    );
    expect(screen.getByText("empty")).toBeInTheDocument();
  });
  it("opens edit modal on skill click", async () => {
    useSkillStore.mockReturnValue({
      deleteSkills: {},
      toggleDeleteSkill: toggleDeleteSkillMock,
      isDeleteMode: false,
    });
    render(
      <SkillsList
        categoriesData={categoriesData}
        profileSkillsData={profileSkillsData}
        isAvailableToChange
      />,
    );
    await userEvent.click(
      screen.getByRole("button", {
        name: "React:false",
      }),
    );
    expect(screen.getByText("modal:2:Expert")).toBeInTheDocument();
  });
  it("closes edit modal", async () => {
    useSkillStore.mockReturnValue({
      deleteSkills: {},
      toggleDeleteSkill: toggleDeleteSkillMock,
      isDeleteMode: false,
    });
    render(
      <SkillsList
        categoriesData={categoriesData}
        profileSkillsData={profileSkillsData}
        isAvailableToChange
      />,
    );
    await userEvent.click(
      screen.getByRole("button", {
        name: "React:false",
      }),
    );
    expect(screen.getByText("modal:2:Expert")).toBeInTheDocument();
    await userEvent.click(screen.getByText("close"));
    expect(screen.queryByText("modal:2:Expert")).not.toBeInTheDocument();
  });

  it("calls toggleDeleteSkill in delete mode", async () => {
    useSkillStore.mockReturnValue({
      deleteSkills: {},
      toggleDeleteSkill: toggleDeleteSkillMock,
      isDeleteMode: true,
    });
    render(
      <SkillsList
        categoriesData={categoriesData}
        profileSkillsData={profileSkillsData}
        isAvailableToChange
      />,
    );
    await userEvent.click(
      screen.getByRole("button", {
        name: "React:false",
      }),
    );
    expect(toggleDeleteSkillMock).toHaveBeenCalledWith("React");
  });

  it("renders active delete state", () => {
    useSkillStore.mockReturnValue({
      deleteSkills: {
        React: true,
      },
      toggleDeleteSkill: toggleDeleteSkillMock,
      isDeleteMode: false,
    });
    render(
      <SkillsList
        categoriesData={categoriesData}
        profileSkillsData={profileSkillsData}
        isAvailableToChange
      />,
    );
    expect(screen.getByText("React:true")).toBeInTheDocument();
  });
  it("does not open modal when editing is unavailable", async () => {
    useSkillStore.mockReturnValue({
      deleteSkills: {},
      toggleDeleteSkill: toggleDeleteSkillMock,
      isDeleteMode: false,
    });
    render(
      <SkillsList
        categoriesData={categoriesData}
        profileSkillsData={profileSkillsData}
        isAvailableToChange={false}
      />,
    );
    await userEvent.click(
      screen.getByRole("button", {
        name: "React:false",
      }),
    );
    expect(screen.queryByText("modal:2:Expert")).not.toBeInTheDocument();
  });
});
