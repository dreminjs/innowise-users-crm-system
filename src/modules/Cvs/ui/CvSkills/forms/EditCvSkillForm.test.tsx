import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { EditCvSkillForm } from "./EditCvSkillForm";
import { useQuery } from "@apollo/client/react";
import { useSkillForm } from "@/modules/Skills/model/hooks/useSkillForm";
import { useUpdateCvSkill } from "@/modules/Cvs/hooks/useUpdateCvSkill";

jest.mock("react-hook-form", () => ({
  ...jest.requireActual("react-hook-form"),
  Controller: ({ render, name }: any) =>
    render({
      field: {
        name,
        value: "",
        onChange: jest.fn(),
        onBlur: jest.fn(),
        ref: jest.fn(),
      },
      fieldState: {},
      formState: {},
    }),
}));

jest.mock("@apollo/client", () => {
  const actual = jest.requireActual("@apollo/client");
  return {
    ...actual,
    useQuery: jest.fn(),
  };
});

jest.mock("@apollo/client/react", () => {
  const actual = jest.requireActual("@apollo/client/react");
  return {
    ...actual,
    useQuery: jest.fn(),
  };
});
jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

jest.mock("@/modules/Skills/model/hooks/useSkillForm", () => ({
  useSkillForm: jest.fn(),
}));

jest.mock("@/modules/Cvs/hooks/useUpdateCvSkill", () => ({
  useUpdateCvSkill: jest.fn(),
}));

jest.mock("@/shared/ui/CustomSelect", () => ({
  CustomSelect: ({ label, disabled }: any) => (
    <div data-testid={`select-${label}`} data-disabled={disabled}>
      <label>{label}</label>
    </div>
  ),
}));

jest.mock("@/shared/ui/ConfirmButtons", () => ({
  ConfirmButtons: ({ cancelAction, confirmButtonType }: any) => (
    <div>
      <button type={confirmButtonType} data-testid="submit-btn">
        Confirm
      </button>
      <button type="button" onClick={cancelAction} data-testid="cancel-btn">
        Cancel
      </button>
    </div>
  ),
}));

describe("EditCvSkillForm", () => {
  const mockToggleAction = jest.fn();
  const mockUpdateCvSkill = jest.fn();
  const mockReset = jest.fn();

  const defaultProps = {
    cvId: "cv-123",
    toggleAction: mockToggleAction,
    mastery: "NOVICE" as any,
    categoryId: "skill-1",
  };

  const mockSkillsData = {
    skills: [
      { id: "skill-1", name: "React" },
      { id: "skill-2", name: "TypeScript" },
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();

    (useQuery as unknown as jest.Mock).mockReturnValue({
      data: mockSkillsData,
    });

    (useUpdateCvSkill as jest.Mock).mockReturnValue([mockUpdateCvSkill]);

    (useSkillForm as jest.Mock).mockReturnValue({
      control: {},
      handleChangeSkill: jest.fn(),
      handleChangeMastery: jest.fn(),
      currentCategoryId: "skill-1",
      reset: mockReset,
      handleSubmit: (callback: any) => (e: React.FormEvent) => {
        e.preventDefault();
        callback({ categoryId: "skill-1", mastery: "ADVANCED" });
      },
    });
  });

  it("should render the form with correct fields and buttons", () => {
    render(<EditCvSkillForm {...defaultProps} />);

    expect(screen.getByTestId("select-Skills.chooseSkill")).toBeInTheDocument();
    expect(
      screen.getByTestId("select-Skills.skillMastery"),
    ).toBeInTheDocument();

    expect(screen.getByTestId("select-Skills.chooseSkill")).toHaveAttribute(
      "data-disabled",
      "true",
    );

    expect(screen.getByTestId("select-Skills.skillMastery")).toHaveAttribute(
      "data-disabled",
      "false",
    );

    expect(screen.getByTestId("submit-btn")).toBeInTheDocument();
    expect(screen.getByTestId("cancel-btn")).toBeInTheDocument();
  });

  it("should successfully call updateCvSkill, toggleAction, and reset on submit", async () => {
    render(<EditCvSkillForm {...defaultProps} />);

    fireEvent.click(screen.getByTestId("submit-btn"));

    await waitFor(() => {
      expect(mockUpdateCvSkill).toHaveBeenCalledWith({
        variables: {
          skill: {
            cvId: "cv-123",
            name: "React",
            categoryId: "skill-1",
            mastery: "ADVANCED",
          },
        },
      });

      expect(mockToggleAction).toHaveBeenCalledTimes(1);
      expect(mockReset).toHaveBeenCalledTimes(1);
    });
  });

  it("should not call updateCvSkill if the selected skill is not found in skills data", async () => {
    (useQuery as unknown as jest.Mock).mockReturnValue({
      data: { skills: [] },
    });

    render(<EditCvSkillForm {...defaultProps} />);

    fireEvent.click(screen.getByTestId("submit-btn"));

    await waitFor(() => {
      expect(mockUpdateCvSkill).not.toHaveBeenCalled();
      expect(mockToggleAction).not.toHaveBeenCalled();
      expect(mockReset).not.toHaveBeenCalled();
    });
  });

  it("should call toggleAction when the cancel button is clicked", () => {
    render(<EditCvSkillForm {...defaultProps} />);

    fireEvent.click(screen.getByTestId("cancel-btn"));

    expect(mockToggleAction).toHaveBeenCalledTimes(1);
    expect(mockUpdateCvSkill).not.toHaveBeenCalled();
  });

  it("should disable the mastery select if currentCategoryId is missing", () => {
    (useSkillForm as jest.Mock).mockReturnValue({
      control: {},
      handleChangeSkill: jest.fn(),
      handleChangeMastery: jest.fn(),
      currentCategoryId: null,
      reset: mockReset,
      handleSubmit: jest.fn(),
    });

    render(<EditCvSkillForm {...defaultProps} />);

    expect(screen.getByTestId("select-Skills.skillMastery")).toHaveAttribute(
      "data-disabled",
      "true",
    );
  });
});
