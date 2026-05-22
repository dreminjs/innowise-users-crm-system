import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { CvRemoveSkillsButton } from "./CvRemoveSkillsButton";
import { useDeleteCvSkill } from "../../hooks/useDeleteCvSkill";
import { useCvSkillStore } from "../../model/cv-skill.store";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

jest.mock("../../model/cv-skill.store", () => ({
  useCvSkillStore: jest.fn(),
}));

jest.mock("../../hooks/useDeleteCvSkill", () => ({
  useDeleteCvSkill: jest.fn(),
}));

jest.mock("./styles.module.css", () => ({}));

describe("CvRemoveSkillsButton", () => {
  const mockDeleteCvSkill = jest.fn();
  const mockClearSkills = jest.fn();
  const mockToggleDeleteMode = jest.fn();
  const cvId = "cv-789";

  const defaultStoreState = {
    deleteSkills: { "skill-1": true, "skill-2": true },
    clearSkills: mockClearSkills,
    toggleDeleteMode: mockToggleDeleteMode,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    (useCvSkillStore as jest.Mock).mockReturnValue(defaultStoreState);
    (useDeleteCvSkill as jest.Mock).mockReturnValue([
      mockDeleteCvSkill,
      { loading: false },
    ]);
  });

  it("should correctly display the number of skills and the button text", () => {
    render(<CvRemoveSkillsButton cvId={cvId} />);

    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("deleteSkill")).toBeInTheDocument();

    const button = screen.getByRole("button");
    expect(button).not.toBeDisabled();
  });

  it("should block the button and change the text when loading: true", () => {
    (useDeleteCvSkill as jest.Mock).mockReturnValue([
      mockDeleteCvSkill,
      { loading: true },
    ]);

    render(<CvRemoveSkillsButton cvId={cvId} />);

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(screen.getByText("loading")).toBeInTheDocument();
  });

  it("should successfully trigger a mutation, clear the store, and close the delete mode", async () => {
    mockDeleteCvSkill.mockResolvedValueOnce({});

    render(<CvRemoveSkillsButton cvId={cvId} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(mockDeleteCvSkill).toHaveBeenCalledWith({
      variables: {
        skill: {
          cvId: cvId,
          name: ["skill-1", "skill-2"],
        },
      },
    });

    await waitFor(() => {
      expect(mockClearSkills).toHaveBeenCalledTimes(1);
      expect(mockToggleDeleteMode).toHaveBeenCalledTimes(1);
    });
  });

  it("must fix the error and NOT reset the store state.", async () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    mockDeleteCvSkill.mockRejectedValueOnce(new Error("GraphQL Error"));

    render(<CvRemoveSkillsButton cvId={cvId} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalled();
    });

    expect(mockClearSkills).not.toHaveBeenCalled();
    expect(mockToggleDeleteMode).not.toHaveBeenCalled();

    consoleSpy.mockRestore();
  });
});
