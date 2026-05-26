import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useQuery } from "@apollo/client/react";
import { Mastery } from "@/generated/graphql";
import { AddCvSkillForm } from "./AddCvSkillForm";
import { useAddCvSkill } from "@/modules/Cvs/hooks/useAddCvSkill";
import { useSkillForm } from "@/modules/Skills/model/hooks/useSkillForm";

jest.mock("react-hook-form", () => ({
  ...jest.requireActual("react-hook-form"),
  Controller: ({ render: renderFn, name }: any) =>
    renderFn({
      field: {
        value: name === "categoryId" ? "" : Mastery.Novice,
        onChange: jest.fn(),
        onBlur: jest.fn(),
        name,
        ref: jest.fn(),
      },
    }),
}));

jest.mock("@apollo/client/react", () => ({
  useQuery: jest.fn(),
}));

jest.mock("@/modules/Cvs/hooks/useAddCvSkill", () => ({
  useAddCvSkill: jest.fn(),
}));

jest.mock("@/modules/Skills/model/hooks/useSkillForm", () => ({
  useSkillForm: jest.fn(),
}));

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

jest.mock("@/shared/ui/CustomSelect", () => ({
  CustomSelect: ({ label, value, onChange, disabled }: any) => (
    <div>
      <label>{label}</label>
      <select
        data-testid={`select-${label}`}
        value={value ?? ""}
        disabled={!!disabled}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">-- select --</option>
        <option value="skill-1">JavaScript</option>
        <option value="skill-2">TypeScript</option>
        <option value={Mastery.Novice}>{Mastery.Novice}</option>
        <option value={Mastery.Advanced}>{Mastery.Advanced}</option>
        <option value={Mastery.Expert}>{Mastery.Expert}</option>
      </select>
    </div>
  ),
}));

jest.mock("@/shared/ui/ConfirmButtons", () => ({
  ConfirmButtons: ({ cancelAction, confirmLabel, confirmButtonType }: any) => (
    <div>
      <button type="button" onClick={cancelAction} data-testid="cancel-btn">
        Cancel
      </button>
      <button type={confirmButtonType} data-testid="confirm-btn">
        {confirmLabel}
      </button>
    </div>
  ),
}));

const mockSkills = [
  { id: "skill-1", name: "JavaScript" },
  { id: "skill-2", name: "TypeScript" },
  { id: "skill-3", name: "React" },
];

const mockCategories = [
  {
    id: "skill-1",
    name: "JavaScript",
    parent: { id: "cat-fe", name: "Frontend" },
  },
  {
    id: "skill-2",
    name: "TypeScript",
    parent: { id: "cat-fe", name: "Frontend" },
  },
];

const mockCvSkills = [{ categoryId: "skill-3" }];

const mockAddCvSkill = jest.fn();
const mockReset = jest.fn();
const mockHandleChangeSkill = jest.fn();
const mockHandleChangeMastery = jest.fn();

const defaultProps = {
  cvId: "cv-42",
  toggleAction: jest.fn(),
};

function buildUseSkillFormReturn(overrides: Record<string, any> = {}) {
  return {
    control: {},
    handleSubmit: (fn: ({}) => void) => (e: React.FormEvent) => {
      e?.preventDefault?.();
      fn({ categoryId: "skill-1", mastery: Mastery.Novice });
    },
    handleChangeSkill: mockHandleChangeSkill,
    handleChangeMastery: mockHandleChangeMastery,
    currentCategoryId: "",
    reset: mockReset,
    ...overrides,
  };
}

function setupMocks(skillFormOverrides: Record<string, any> = {}) {
  let callCount = 0;
  (useQuery as unknown as jest.Mock).mockImplementation(() => {
    callCount++;
    if (callCount === 1) return { data: { skills: mockSkills } };
    if (callCount === 2) return { data: { skillCategories: mockCategories } };
    return { data: { cv: { skills: mockCvSkills } } };
  });

  (useAddCvSkill as jest.Mock).mockReturnValue([
    mockAddCvSkill,
    { loading: false },
  ]);

  (useSkillForm as jest.Mock).mockReturnValue(
    buildUseSkillFormReturn(skillFormOverrides),
  );
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe("AddCvSkillForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    setupMocks();
  });

  describe("rendering", () => {
    it("renders the skill select with correct label", () => {
      render(<AddCvSkillForm {...defaultProps} />);
      expect(screen.getByText("Skills.chooseSkill")).toBeInTheDocument();
    });

    it("renders the mastery select with correct label", () => {
      render(<AddCvSkillForm {...defaultProps} />);
      expect(screen.getByText("Skills.skillMastery")).toBeInTheDocument();
    });

    it("renders confirm and cancel buttons", () => {
      render(<AddCvSkillForm {...defaultProps} />);
      expect(screen.getByTestId("confirm-btn")).toBeInTheDocument();
      expect(screen.getByTestId("cancel-btn")).toBeInTheDocument();
    });

    it("shows LOADING… label when mutation is in flight", () => {
      (useAddCvSkill as jest.Mock).mockReturnValue([
        mockAddCvSkill,
        { loading: true },
      ]);
      render(<AddCvSkillForm {...defaultProps} />);
      expect(screen.getByTestId("confirm-btn")).toHaveTextContent("LOADING...");
    });

    it("shows translated confirm label when not loading", () => {
      render(<AddCvSkillForm {...defaultProps} />);
      expect(screen.getByTestId("confirm-btn")).toHaveTextContent(
        "ConfirmButtons.confirm",
      );
    });
  });

  describe("mastery select disabled state", () => {
    it("disables mastery select when no skill is selected", () => {
      setupMocks({ currentCategoryId: "" });
      render(<AddCvSkillForm {...defaultProps} />);
      expect(screen.getByTestId("select-Skills.skillMastery")).toBeDisabled();
    });

    it("enables mastery select when a skill is selected", () => {
      setupMocks({ currentCategoryId: "skill-1" });
      render(<AddCvSkillForm {...defaultProps} />);
      expect(
        screen.getByTestId("select-Skills.skillMastery"),
      ).not.toBeDisabled();
    });
  });

  describe("user interactions", () => {
    it("calls toggleAction when cancel button is clicked", async () => {
      const toggleAction = jest.fn();
      render(<AddCvSkillForm {...defaultProps} toggleAction={toggleAction} />);
      await userEvent.click(screen.getByTestId("cancel-btn"));
      expect(toggleAction).toHaveBeenCalledTimes(1);
    });

    it("calls handleChangeSkill when skill select changes", () => {
      render(<AddCvSkillForm {...defaultProps} />);
      fireEvent.change(screen.getByTestId("select-Skills.chooseSkill"), {
        target: { value: "skill-1" },
      });
      expect(mockHandleChangeSkill).toHaveBeenCalledWith("skill-1");
    });

    it("calls handleChangeMastery with correct mastery value", () => {
      setupMocks({ currentCategoryId: "skill-1" });
      render(<AddCvSkillForm {...defaultProps} />);
      fireEvent.change(screen.getByTestId("select-Skills.skillMastery"), {
        target: { value: Mastery.Advanced },
      });
      expect(mockHandleChangeMastery).toHaveBeenCalledWith(Mastery.Advanced);
    });
  });

  describe("form submission", () => {
    it("calls addCvSkill with correct variables on submit", async () => {
      mockAddCvSkill.mockResolvedValueOnce({});
      render(<AddCvSkillForm {...defaultProps} />);
      fireEvent.click(screen.getByTestId("confirm-btn"));

      await waitFor(() => {
        expect(mockAddCvSkill).toHaveBeenCalledWith({
          variables: {
            skill: {
              cvId: "cv-42",
              name: "JavaScript",
              categoryId: "skill-1",
              mastery: Mastery.Novice,
            },
          },
        });
      });
    });

    it("calls reset and toggleAction after successful submission", async () => {
      mockAddCvSkill.mockResolvedValueOnce({});
      const toggleAction = jest.fn();
      render(<AddCvSkillForm {...defaultProps} toggleAction={toggleAction} />);
      fireEvent.click(screen.getByTestId("confirm-btn"));

      await waitFor(() => {
        expect(mockReset).toHaveBeenCalledTimes(1);
        expect(toggleAction).toHaveBeenCalledTimes(1);
      });
    });

    it("does not call toggleAction when mutation throws", async () => {
      mockAddCvSkill.mockRejectedValueOnce(new Error("Network error"));
      const toggleAction = jest.fn();
      render(<AddCvSkillForm {...defaultProps} toggleAction={toggleAction} />);
      fireEvent.click(screen.getByTestId("confirm-btn"));

      await waitFor(() => expect(mockAddCvSkill).toHaveBeenCalled());
      expect(toggleAction).not.toHaveBeenCalled();
    });

    it("does not call addCvSkill when categoryId is missing", async () => {
      (useSkillForm as jest.Mock).mockReturnValue(
        buildUseSkillFormReturn({
          handleSubmit:
            (fn: (values: { categoryId: null; mastery: Mastery }) => void) =>
            (e: React.FormEvent) => {
              e?.preventDefault?.();
              fn({ categoryId: null, mastery: Mastery.Novice });
            },
        }),
      );
      render(<AddCvSkillForm {...defaultProps} />);
      fireEvent.click(screen.getByTestId("confirm-btn"));

      await waitFor(() => expect(mockAddCvSkill).not.toHaveBeenCalled());
    });

    it("does not call addCvSkill when mastery is missing", async () => {
      (useSkillForm as jest.Mock).mockReturnValue(
        buildUseSkillFormReturn({
          handleSubmit:
            (fn: (values: { categoryId: string; mastery: null }) => void) =>
            (e: React.FormEvent) => {
              e?.preventDefault?.();
              fn({ categoryId: "skill-1", mastery: null });
            },
        }),
      );
      render(<AddCvSkillForm {...defaultProps} />);
      fireEvent.click(screen.getByTestId("confirm-btn"));

      await waitFor(() => expect(mockAddCvSkill).not.toHaveBeenCalled());
    });

    it("does not call addCvSkill when skill is absent from availableSkills", async () => {
      (useSkillForm as jest.Mock).mockReturnValue(
        buildUseSkillFormReturn({
          handleSubmit:
            (fn: (values: { categoryId: string; mastery: Mastery }) => void) =>
            (e: React.FormEvent) => {
              e?.preventDefault?.();
              fn({ categoryId: "skill-3", mastery: Mastery.Novice });
            },
        }),
      );
      render(<AddCvSkillForm {...defaultProps} />);
      fireEvent.click(screen.getByTestId("confirm-btn"));

      await waitFor(() => expect(mockAddCvSkill).not.toHaveBeenCalled());
    });
  });

  describe("hook wiring", () => {
    it("initialises useSkillForm with empty categoryId and Novice mastery", () => {
      render(<AddCvSkillForm {...defaultProps} />);
      expect(useSkillForm).toHaveBeenCalledWith({
        categoryId: "",
        mastery: Mastery.Novice,
      });
    });

    it("passes cvId to useAddCvSkill", () => {
      render(<AddCvSkillForm cvId="cv-99" toggleAction={jest.fn()} />);
      expect(useAddCvSkill).toHaveBeenCalledWith("cv-99");
    });
  });
});
