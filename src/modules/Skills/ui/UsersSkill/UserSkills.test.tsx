import { render, screen } from "@testing-library/react";
import { UserSkills } from "./UserSkills";

jest.mock("@apollo/client/react", () => ({
  useQuery: jest.fn(),
}));
jest.mock("@/application/store/user.store", () => ({
  useUserStore: jest.fn(),
}));
jest.mock("@/modules/Skills", () => ({
  SkillsList: ({ isAvailableToChange }: { isAvailableToChange: boolean }) => (
    <div>
      skills-list:
      {String(isAvailableToChange)}
    </div>
  ),
}));
jest.mock("../MenagementSkills/MenagementSkills", () => ({
  MenagementSkills: ({
    isAvailableToDelete,
  }: {
    isAvailableToDelete: boolean;
  }) => (
    <div>
      management:
      {String(isAvailableToDelete)}
    </div>
  ),
}));
jest.mock("@/shared/ui/Loading", () => ({
  Loading: () => <div>loading</div>,
}));
jest.mock("@/shared/ui/Empty", () => ({
  Empty: () => <div>empty</div>,
}));
jest.mock("../../api/queries", () => ({
  GET_PROFILE_SKILLS: "GET_PROFILE_SKILLS",
  GET_SKILL_CATEGORIES: "GET_SKILL_CATEGORIES",
}));
const { useQuery } = jest.requireMock("@apollo/client/react");
const { useUserStore } = jest.requireMock("@/application/store/user.store");

describe("UserSkills", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading", () => {
    useQuery.mockReturnValueOnce({
      loading: true,
    });
    useQuery.mockReturnValueOnce({});
    useUserStore.mockReturnValue("Admin");
    render(<UserSkills userSkillsId="1" currentUserId="1" isAdmin={false} />);
    expect(screen.getByText("loading")).toBeInTheDocument();
  });

  it("renders empty on error", () => {
    useQuery.mockReturnValueOnce({
      loading: false,
      error: {
        message: "error",
      },
    });
    useQuery.mockReturnValueOnce({});
    useUserStore.mockReturnValue("Admin");
    render(<UserSkills userSkillsId="1" currentUserId="1" isAdmin={false} />);
    expect(screen.getByText("empty")).toBeInTheDocument();
  });

  it("renders empty when categories are missing", () => {
    useQuery.mockReturnValueOnce({
      loading: false,
      data: {},
    });
    useQuery.mockReturnValueOnce({
      data: {
        profile: {
          skills: [],
        },
      },
    });
    useUserStore.mockReturnValue("Admin");
    render(<UserSkills userSkillsId="1" currentUserId="1" isAdmin={false} />);
    expect(screen.getByText("empty")).toBeInTheDocument();
  });

  it("renders empty when profile is missing", () => {
    useQuery.mockReturnValueOnce({
      loading: false,
      data: {
        skillCategories: [],
      },
    });
    useQuery.mockReturnValueOnce({
      data: {},
    });
    useUserStore.mockReturnValue("Admin");
    render(<UserSkills userSkillsId="1" currentUserId="1" isAdmin={false} />);
    expect(screen.getByText("empty")).toBeInTheDocument();
  });

  it("renders SkillsList", () => {
    useQuery.mockReturnValueOnce({
      loading: false,
      data: {
        skillCategories: [
          {
            id: "1",
            name: "Frontend",
          },
        ],
      },
    });
    useQuery.mockReturnValueOnce({
      data: {
        profile: {
          skills: [
            {
              id: "1",
            },
          ],
        },
      },
    });
    useUserStore.mockReturnValue("Admin");
    render(<UserSkills userSkillsId="1" currentUserId="1" isAdmin={false} />);
    expect(screen.getByText("skills-list:true")).toBeInTheDocument();
  });

  it("renders Empty when no skills", () => {
    useQuery.mockReturnValueOnce({
      loading: false,
      data: {
        skillCategories: [
          {
            id: "1",
          },
        ],
      },
    });
    useQuery.mockReturnValueOnce({
      data: {
        profile: {
          skills: [],
        },
      },
    });
    useUserStore.mockReturnValue("Admin");
    render(<UserSkills userSkillsId="1" currentUserId="1" isAdmin={false} />);
    expect(screen.getByText("empty")).toBeInTheDocument();
  });

  it("renders MenagementSkills with delete access", () => {
    useQuery.mockReturnValueOnce({
      loading: false,
      data: {
        skillCategories: [
          {
            id: "1",
          },
        ],
      },
    });
    useQuery.mockReturnValueOnce({
      data: {
        profile: {
          skills: [
            {
              id: "1",
            },
          ],
        },
      },
    });
    useUserStore.mockReturnValue("Admin");
    render(<UserSkills userSkillsId="1" currentUserId="1" isAdmin={false} />);
    expect(screen.getByText("management:true")).toBeInTheDocument();
  });

  it("renders MenagementSkills without delete access", () => {
    useQuery.mockReturnValueOnce({
      loading: false,
      data: {
        skillCategories: [
          {
            id: "1",
          },
        ],
      },
    });
    useQuery.mockReturnValueOnce({
      data: {
        profile: {
          skills: [],
        },
      },
    });
    useUserStore.mockReturnValue("Admin");
    render(<UserSkills userSkillsId="1" currentUserId="1" isAdmin={false} />);
    expect(screen.getByText("management:false")).toBeInTheDocument();
  });

  it("allows editing for current user", () => {
    useQuery.mockReturnValueOnce({
      loading: false,
      data: {
        skillCategories: [
          {
            id: "1",
          },
        ],
      },
    });
    useQuery.mockReturnValueOnce({
      data: {
        profile: {
          skills: [
            {
              id: "1",
            },
          ],
        },
      },
    });
    useUserStore.mockReturnValue("Employee");
    render(<UserSkills userSkillsId="1" currentUserId="1" isAdmin={false} />);
    expect(screen.getByText("skills-list:true")).toBeInTheDocument();
  });

  it("disables editing for another employee", () => {
    useQuery.mockReturnValueOnce({
      loading: false,
      data: {
        skillCategories: [
          {
            id: "1",
          },
        ],
      },
    });
    useQuery.mockReturnValueOnce({
      data: {
        profile: {
          skills: [
            {
              id: "1",
            },
          ],
        },
      },
    });
    useUserStore.mockReturnValue("Employee");
    render(<UserSkills userSkillsId="2" currentUserId="1" isAdmin={false} />);
    expect(screen.getByText("skills-list:false")).toBeInTheDocument();
  });
});
