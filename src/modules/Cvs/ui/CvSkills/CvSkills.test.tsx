import { render, screen, fireEvent } from "@testing-library/react";
import { CvSkills } from "./CvSkills";
import { useQuery } from "@apollo/client/react";
import { useCvSkillStore } from "@/modules/Cvs/model/cv-skill.store";

jest.mock("@/modules/Skills/api/queries", () => ({
  GET_SKILL_CATEGORIES: "GET_SKILL_CATEGORIES",
  GET_CV_SKILLS: "GET_CV_SKILLS",
}));
import { GET_SKILL_CATEGORIES } from "@/modules/Skills/api/queries";
import { GET_CV_SKILLS } from "../../api/queries";

jest.mock("@apollo/client", () => ({
  ...jest.requireActual("@apollo/client"),
  useQuery: jest.fn(),
}));

jest.mock("@apollo/client/react", () => ({
  ...jest.requireActual("@apollo/client/react"),
  useQuery: jest.fn(),
}));

jest.mock("@/modules/Cvs/model/cv-skill.store.ts", () => ({
  useCvSkillStore: jest.fn(),
}));

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

jest.mock("@/shared/ui/Loading", () => ({
  Loading: () => <div data-testid="loading-component">Loading...</div>,
}));

jest.mock("@/modules/Skills/ui/UsersSkill/SkillsList/SkillItem", () => ({
  SkillItem: ({ name, onClick, isActive }: any) => (
    <li
      data-testid={`skill-item-${name}`}
      data-active={isActive}
      onClick={onClick}
    >
      {name}
    </li>
  ),
}));

jest.mock("./CvManagementSkills", () => ({
  CvManagementSkills: ({ cvId }: any) => (
    <div data-testid="cv-management-skills">Manage Skills for {cvId}</div>
  ),
}));

jest.mock("./modals/EditCvSkillModal", () => ({
  EditCvSkillModal: ({ open, categoryId, mastery, toggleAction }: any) => (
    <div data-testid="edit-skill-modal" data-open={open}>
      Modal Open: {String(open)} | Category: {categoryId} | Mastery: {mastery}
      <button onClick={toggleAction} data-testid="close-modal-btn">
        Close
      </button>
    </div>
  ),
}));

describe("CvSkills Component", () => {
  const mockCvId = "cv-123";
  const mockToggleSkill = jest.fn();
  const mockCategoriesData = {
    skillCategories: [
      { id: "cat-1", name: "Frontend", parent: null },
      {
        id: "cat-2",
        name: "React Ecosystem",
        parent: { id: "cat-1", name: "Frontend" },
      },
      { id: "cat-3", name: "Backend", parent: null },
    ],
  };

  const mockCvSkillsData = {
    cv: {
      skills: [
        { name: "React", categoryId: "cat-2", mastery: "ADVANCED" },
        { name: "Node.js", categoryId: "cat-3", mastery: "NOVICE" },
      ],
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();

    (useCvSkillStore as unknown as jest.Mock).mockReturnValue({
      isDeleteMode: false,
      toggleSkill: mockToggleSkill,
      deleteSkills: {},
    });

    (useQuery as unknown as jest.Mock).mockImplementation((query) => {
      if (query === GET_SKILL_CATEGORIES) {
        return { data: mockCategoriesData, loading: false, error: undefined };
      }
      if (query === GET_CV_SKILLS) {
        return { data: mockCvSkillsData, loading: false, error: undefined };
      }
      return { data: undefined, loading: false, error: undefined };
    });
  });

  it("should render loading state when queries are loading", () => {
    (useQuery as unknown as jest.Mock).mockReturnValue({ loading: true });
    render(<CvSkills cvId={mockCvId} />);
    expect(screen.getByTestId("loading-component")).toBeInTheDocument();
  });

  it("should render error message if categories query fails", () => {
    (useQuery as unknown as jest.Mock).mockImplementation((query) => {
      if (query === GET_SKILL_CATEGORIES)
        return { error: { message: "Categories failed" } };
      return { loading: false };
    });

    render(<CvSkills cvId={mockCvId} />);
    expect(screen.getByText("Error: Categories failed")).toBeInTheDocument();
  });

  it("should render error message if CV skills query fails", () => {
    (useQuery as unknown as jest.Mock).mockImplementation((query) => {
      if (query === GET_CV_SKILLS)
        return { error: { message: "Skills failed" } };
      return { data: mockCategoriesData, loading: false };
    });

    render(<CvSkills cvId={mockCvId} />);
    expect(screen.getByText("Error: Skills failed")).toBeInTheDocument();
  });

  it("should render grouped skills and child components successfully", () => {
    render(<CvSkills cvId={mockCvId} />);

    expect(screen.getByText("Frontend")).toBeInTheDocument();
    expect(screen.getByText("Backend")).toBeInTheDocument();

    expect(screen.getByTestId("skill-item-React")).toBeInTheDocument();
    expect(screen.getByTestId("skill-item-Node.js")).toBeInTheDocument();

    expect(screen.getByTestId("cv-management-skills")).toBeInTheDocument();
    expect(screen.getByTestId("edit-skill-modal")).toHaveAttribute(
      "data-open",
      "false",
    );
  });

  it("should open edit modal with correct data when clicking a skill in normal mode", () => {
    render(<CvSkills cvId={mockCvId} />);

    fireEvent.click(screen.getByTestId("skill-item-React"));

    const modal = screen.getByTestId("edit-skill-modal");
    expect(modal).toHaveAttribute("data-open", "true");
    expect(modal).toHaveTextContent("Category: cat-2");
    expect(modal).toHaveTextContent("Mastery: ADVANCED");

    fireEvent.click(screen.getByTestId("close-modal-btn"));
    expect(screen.getByTestId("edit-skill-modal")).toHaveAttribute(
      "data-open",
      "false",
    );
  });

  it("should call toggleSkill and not open modal when clicking a skill in delete mode", () => {
    (useCvSkillStore as unknown as jest.Mock).mockReturnValue({
      isDeleteMode: true,
      toggleSkill: mockToggleSkill,
      deleteSkills: {},
    });

    render(<CvSkills cvId={mockCvId} />);

    fireEvent.click(screen.getByTestId("skill-item-Node.js"));

    expect(mockToggleSkill).toHaveBeenCalledWith("Node.js");

    expect(screen.getByTestId("edit-skill-modal")).toHaveAttribute(
      "data-open",
      "false",
    );
  });

  it("should pass isActive=true to SkillItem if skill is marked for deletion", () => {
    (useCvSkillStore as unknown as jest.Mock).mockReturnValue({
      isDeleteMode: true,
      toggleSkill: mockToggleSkill,
      deleteSkills: { React: true },
    });

    render(<CvSkills cvId={mockCvId} />);

    expect(screen.getByTestId("skill-item-React")).toHaveAttribute(
      "data-active",
      "true",
    );
    expect(screen.getByTestId("skill-item-Node.js")).toHaveAttribute(
      "data-active",
      "false",
    );
  });
});
