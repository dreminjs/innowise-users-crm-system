import { render, screen, fireEvent } from "@testing-library/react";
import { CvManagementSkills } from "./CvManagementSkills";
import { useCvSkillStore } from "../../model/cv-skill.store";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

jest.mock("../../model/cv-skill.store", () => ({
  useCvSkillStore: jest.fn(),
}));

jest.mock("./CvRemoveSkillsButton", () => ({
  CvRemoveSkillsButton: ({ cvId }: { cvId: string }) => (
    <button data-testid="cv-remove-skills-btn">
      Remove Skills Button ({cvId})
    </button>
  ),
}));

jest.mock("../../../../shared/ui/AddNewButton", () => ({
  AddNewButton: ({ onClick, label }: any) => (
    <button data-testid="add-new-btn" onClick={onClick}>
      {label}
    </button>
  ),
}));

jest.mock("@/shared/ui/RemoveItemButton", () => ({
  RemoveItemButton: ({ onClick, label }: any) => (
    <button data-testid="remove-item-btn" onClick={onClick}>
      {label}
    </button>
  ),
}));

jest.mock("./modals/AddCvSkillModal", () => ({
  AddCvSkillModal: ({ open, toggleAction, cvId }: any) => (
    <div data-testid="add-skill-modal" data-open={open}>
      <span>Modal Open Status: {open ? "Open" : "Closed"}</span>
      <span>CV ID: {cvId}</span>
      <button data-testid="close-modal-btn" onClick={toggleAction}>
        Close
      </button>
    </div>
  ),
}));

jest.mock("./styles.module.css", () => ({}));

describe("CvManagementSkills Component", () => {
  const mockToggleDeleteMode = jest.fn();
  const cvId = "cv-456";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("When isDeleteMode is false (Normal Mode)", () => {
    beforeEach(() => {
      (useCvSkillStore as jest.Mock).mockReturnValue({
        isDeleteMode: false,
        toggleDeleteMode: mockToggleDeleteMode,
      });
    });

    it("should render Add and Remove action buttons", () => {
      render(<CvManagementSkills cvId={cvId} />);

      expect(screen.getByTestId("add-new-btn")).toBeInTheDocument();
      expect(screen.getByTestId("remove-item-btn")).toBeInTheDocument();

      expect(
        screen.queryByText("ConfirmButtons.cancel"),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByTestId("cv-remove-skills-btn"),
      ).not.toBeInTheDocument();
    });

    it("should enter delete mode when the Remove item button is clicked", () => {
      render(<CvManagementSkills cvId={cvId} />);

      fireEvent.click(screen.getByTestId("remove-item-btn"));

      expect(mockToggleDeleteMode).toHaveBeenCalledTimes(1);
    });

    it("should manage the Add Skill modal visibility state correctly", () => {
      render(<CvManagementSkills cvId={cvId} />);

      const modalContainer = screen.getByTestId("add-skill-modal");

      expect(modalContainer).toHaveAttribute("data-open", "false");
      expect(screen.getByText("Modal Open Status: Closed")).toBeInTheDocument();

      fireEvent.click(screen.getByTestId("add-new-btn"));
      expect(modalContainer).toHaveAttribute("data-open", "true");
      expect(screen.getByText("Modal Open Status: Open")).toBeInTheDocument();

      fireEvent.click(screen.getByTestId("close-modal-btn"));
      expect(modalContainer).toHaveAttribute("data-open", "false");
    });
  });

  describe("When isDeleteMode is true (Delete Mode)", () => {
    beforeEach(() => {
      (useCvSkillStore as jest.Mock).mockReturnValue({
        isDeleteMode: true,
        toggleDeleteMode: mockToggleDeleteMode,
      });
    });

    it("should render Cancel and CvRemoveSkillsButton instead of Add/Remove buttons", () => {
      render(<CvManagementSkills cvId={cvId} />);

      expect(screen.getByText("ConfirmButtons.cancel")).toBeInTheDocument();
      expect(screen.getByTestId("cv-remove-skills-btn")).toBeInTheDocument();

      expect(screen.queryByTestId("add-new-btn")).not.toBeInTheDocument();
      expect(screen.queryByTestId("remove-item-btn")).not.toBeInTheDocument();
    });

    it("should exit delete mode when the Cancel button is clicked", () => {
      render(<CvManagementSkills cvId={cvId} />);

      fireEvent.click(screen.getByText("ConfirmButtons.cancel"));

      expect(mockToggleDeleteMode).toHaveBeenCalledTimes(1);
    });
  });
});
