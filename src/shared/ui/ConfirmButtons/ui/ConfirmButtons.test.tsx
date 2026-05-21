import userEvent from "@testing-library/user-event";
import { ConfirmButtons } from "./ConfirmButtons";
import { render, screen } from "@testing-library/react";

jest.mock("next-intl", () => ({
  useTranslations: (ns: string) => (key: string) => `${ns}.${key}`,
}));

const defaultProps = {
  confirmLabel: "Save",
  confirmButtonType: "button" as const,
};

describe("ConfirmButtons", () => {
  describe("rendering", () => {
    it("renders cancel button with translated label", () => {
      render(<ConfirmButtons {...defaultProps} />);
      expect(
        screen.getByRole("button", { name: "ConfirmButtons.cancel" }),
      ).toBeInTheDocument();
    });

    it("renders confirm button with provided label", () => {
      render(<ConfirmButtons {...defaultProps} confirmLabel="Save" />);
      expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument();
    });

    it("renders amount badge when amount is provided", () => {
      render(<ConfirmButtons {...defaultProps} amount={5} />);
      expect(screen.getByText("5")).toBeInTheDocument();
    });

    it("does not render amount badge when amount is not provided", () => {
      render(<ConfirmButtons {...defaultProps} />);
      expect(screen.queryByText(/^\d+$/)).not.toBeInTheDocument();
    });

    it("renders confirm button as submit when confirmButtonType is submit", () => {
      render(<ConfirmButtons {...defaultProps} confirmButtonType="submit" />);
      expect(screen.getByRole("button", { name: /save/i })).toHaveAttribute(
        "type",
        "submit",
      );
    });

    it("renders confirm button as button when confirmButtonType is button", () => {
      render(<ConfirmButtons {...defaultProps} confirmButtonType="button" />);
      expect(screen.getByRole("button", { name: /save/i })).toHaveAttribute(
        "type",
        "button",
      );
    });

    it("disables confirm button when disabled is true", () => {
      render(<ConfirmButtons {...defaultProps} disabled={true} />);
      expect(screen.getByRole("button", { name: /save/i })).toBeDisabled();
    });

    it("enables confirm button when disabled is false", () => {
      render(<ConfirmButtons {...defaultProps} disabled={false} />);
      expect(screen.getByRole("button", { name: /save/i })).not.toBeDisabled();
    });
  });

  describe("interactions", () => {
    it("calls cancelAction when cancel button is clicked", async () => {
      const cancelAction = jest.fn();
      render(<ConfirmButtons {...defaultProps} cancelAction={cancelAction} />);
      await userEvent.click(
        screen.getByRole("button", { name: "ConfirmButtons.cancel" }),
      );
      expect(cancelAction).toHaveBeenCalledTimes(1);
    });

    it("calls confirmAction when confirm button is clicked", async () => {
      const confirmAction = jest.fn();
      render(
        <ConfirmButtons {...defaultProps} confirmAction={confirmAction} />,
      );
      await userEvent.click(screen.getByRole("button", { name: /save/i }));
      expect(confirmAction).toHaveBeenCalledTimes(1);
    });

    it("does not call confirmAction when disabled and clicked", async () => {
      const confirmAction = jest.fn();
      render(
        <ConfirmButtons
          {...defaultProps}
          confirmAction={confirmAction}
          disabled={true}
        />,
      );
      await userEvent.click(screen.getByRole("button", { name: /save/i }));
      expect(confirmAction).not.toHaveBeenCalled();
    });
  });
});
