import { render, screen } from "@testing-library/react";
import { PreviewSkills } from "./PreviewSkills";
import { Mastery } from "@/generated/graphql";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => `translated_${key}`,
}));
const mockUseQuery = jest.fn();
jest.mock("@apollo/client/react", () => ({
  useQuery: (...args: unknown[]) => mockUseQuery(...args),
  gql: (strings: unknown) => strings,
}));
jest.mock("@/modules/Skills/api/queries.ts", () => ({
  GET_SKILL_CATEGORIES: "GET_SKILL_CATEGORIES",
}));
const mockGroupSkillsByCategory = jest.fn();
jest.mock("../../utils/groupSkillsByCategory", () => ({
  groupSkillsByCategory: (...args: unknown[]) =>
    mockGroupSkillsByCategory(...args),
}));

describe("PreviewSkills", () => {
  const mockMessages = {
    Preview: {
      professionalSkills: "Professional Skills Title",
    },
    Skills: {
      Frontend: "Front-End Development",
    },
  } as unknown as React.ComponentProps<typeof PreviewSkills>["messages"];
  const mockSkills = [
    {
      name: "React",
      mastery: Mastery.Proficient,
      categoryId: "1",
    },
    {
      name: "Node.js",
      mastery: Mastery.Proficient,
      categoryId: "2",
    },
    {
      name: "TypeScript",
      mastery: Mastery.Proficient,
      categoryId: "1",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseQuery.mockReturnValue({
      data: {
        skillCategories: [
          {
            id: "1",
            name: "Frontend",
          },
          {
            id: "2",
            name: "Backend",
          },
        ],
      },
    });
  });

  it("renders the section title from the messages prop", () => {
    mockGroupSkillsByCategory.mockReturnValue([]);
    render(<PreviewSkills skills={mockSkills} messages={mockMessages} />);
    expect(
      screen.getByRole("heading", {
        name: "Professional Skills Title",
      }),
    ).toBeInTheDocument();
  });

  it("renders grouped skills and formats commas correctly", () => {
    mockGroupSkillsByCategory.mockReturnValue([
      {
        groupName: "Frontend",
        skills: [
          {
            name: "React",
            mastery: Mastery.Proficient,
            categoryId: "1",
          },
          {
            name: "TypeScript",
            mastery: Mastery.Proficient,
            categoryId: "1",
          },
        ],
      },
      {
        groupName: "Backend",
        skills: [
          {
            name: "Node.js",
            mastery: Mastery.Proficient,
            categoryId: "2",
          },
        ],
      },
    ]);
    render(<PreviewSkills skills={mockSkills} messages={mockMessages} />);
    expect(screen.getByText("Front-End Development")).toBeInTheDocument();
    expect(screen.getByText("React,")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("translated_Backend")).toBeInTheDocument();
    expect(screen.getByText("Node.js")).toBeInTheDocument();
  });

  it("handles empty skill categories from useQuery gracefully", () => {
    mockUseQuery.mockReturnValue({
      data: undefined,
    });
    mockGroupSkillsByCategory.mockReturnValue([]);
    render(<PreviewSkills skills={mockSkills} messages={mockMessages} />);
    expect(mockGroupSkillsByCategory).toHaveBeenCalledWith(mockSkills, []);
  });
});
