import { render, screen } from "@testing-library/react";
import { PreviewSkills } from "./PreviewSkills";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => `translated_${key}`,
}));

const mockUseQuery = jest.fn();
jest.mock("@apollo/client/react", () => ({
  useQuery: (...args) => mockUseQuery(...args),
  gql: (strings: any) => strings,
}));

jest.mock("@/modules/Skills/api/queries.ts", () => ({
  GET_SKILL_CATEGORIES: "GET_SKILL_CATEGORIES",
}));

const mockGroupSkillsByCategory = jest.fn();
jest.mock("../../utils/groupSkillsByCategory", () => ({
  groupSkillsByCategory: (...args) => mockGroupSkillsByCategory(...args),
}));

describe("PreviewSkills", () => {
  const mockMessages = {
    Preview: {
      professionalSkills: "Professional Skills Title",
    },
    Skills: {
      frontend: "Front-End Development",
    },
  } as any;

  const mockSkills = [
    { name: "React" },
    { name: "Node.js" },
    { name: "TypeScript" },
  ];

  beforeEach(() => {
    jest.clearAllMocks();

    // Default useQuery response
    mockUseQuery.mockReturnValue({
      data: {
        skillCategories: [
          { id: "1", name: "frontend" },
          { id: "2", name: "backend" },
        ],
      },
    });
  });

  it("renders the section title from the messages prop", () => {
    mockGroupSkillsByCategory.mockReturnValue([]);

    render(<PreviewSkills skills={mockSkills} messages={mockMessages} />);

    expect(
      screen.getByRole("heading", { name: "Professional Skills Title" }),
    ).toBeInTheDocument();
  });

  it("renders grouped skills and formats commas correctly", () => {
    // Mock the utility to return two groups
    mockGroupSkillsByCategory.mockReturnValue([
      {
        groupName: "frontend",
        skills: [{ name: "React" }, { name: "TypeScript" }],
      },
      {
        groupName: "backend",
        skills: [{ name: "Node.js" }],
      },
    ]);

    render(<PreviewSkills skills={mockSkills} messages={mockMessages} />);

    expect(screen.getByText("Front-End Development")).toBeInTheDocument();
    expect(screen.getByText("React,")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();

    expect(screen.getByText("translated_backend")).toBeInTheDocument();
    expect(screen.getByText("Node.js")).toBeInTheDocument();
  });

  it("handles empty skill categories from useQuery gracefully", () => {
    mockUseQuery.mockReturnValue({ data: undefined });
    mockGroupSkillsByCategory.mockReturnValue([]);

    render(<PreviewSkills skills={mockSkills} messages={mockMessages} />);

    expect(mockGroupSkillsByCategory).toHaveBeenCalledWith(mockSkills, []);
  });
});
