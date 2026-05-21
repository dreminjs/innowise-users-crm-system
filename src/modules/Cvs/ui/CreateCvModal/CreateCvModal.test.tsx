import { fireEvent, render, waitFor, screen } from "@testing-library/react";
import { useCreateCv } from "../../model/hooks/useCreateCv";
import { CreateCvModal } from "./CreateCvModal";
import userEvent from "@testing-library/user-event";
import { useUserStore } from "@/application/store/user.store";

jest.mock("next-intl", () => ({
  useTranslations: (ns: string) => (key: string) => `${ns}.${key}`,
}));

jest.mock("@/application/store/user.store", () => ({
  useUserStore: (selector: (state: { userId: string }) => string) =>
    selector({ userId: "user-123" }),
}));

const mockCreateCv = jest.fn();
jest.mock("../../model/hooks/useCreateCv", () => ({
  useCreateCv: () => [mockCreateCv, { loading: false }],
}));

const defaultProps = {
  isOpen: true,
  closeAction: jest.fn(),
};

describe("CreateCvModal", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockCreateCv.mockResolvedValue({});

    jest
      .mocked(useUserStore)
      .mockImplementation((selector: any) => selector({ userId: "user-123" }));

    jest
      .mocked(useCreateCv)
      .mockReturnValue([mockCreateCv, { loading: false }] as any);
  });

  describe("visibility", () => {
    it("renders modal when isOpen is true", () => {
      render(<CreateCvModal {...defaultProps} />);
      expect(screen.getByRole("heading")).toBeInTheDocument();
    });

    it("does not render modal when isOpen is false", () => {
      render(<CreateCvModal {...defaultProps} isOpen={false} />);
      expect(screen.queryByRole("heading")).not.toBeInTheDocument();
    });

    it("renders backdrop when isOpen is true", () => {
      render(<CreateCvModal {...defaultProps} />);
      expect(document.querySelector("[class*='backdrop']")).toBeInTheDocument();
    });
  });

  describe("rendering", () => {
    it("renders translated title", () => {
      render(<CreateCvModal {...defaultProps} />);
      expect(screen.getByText("CvDetails.title")).toBeInTheDocument();
    });

    it("renders name, education and description inputs", () => {
      render(<CreateCvModal {...defaultProps} />);
      const inputs = screen.getAllByRole("textbox");
      expect(inputs.length).toBe(3);
    });

    it("renders close button", () => {
      render(<CreateCvModal {...defaultProps} />);
      expect(screen.getByText("×")).toBeInTheDocument();
    });

    it("renders confirm button with translated create label", () => {
      render(<CreateCvModal {...defaultProps} />);
      expect(
        screen.getByRole("button", { name: /CvDetails.create/i }),
      ).toBeInTheDocument();
    });
  });

  describe("close behavior", () => {
    it("calls closeAction when close button is clicked", async () => {
      const closeAction = jest.fn();
      render(<CreateCvModal {...defaultProps} closeAction={closeAction} />);
      await userEvent.click(screen.getByText("×"));
      expect(closeAction).toHaveBeenCalledTimes(1);
    });

    it("calls closeAction when backdrop is clicked", async () => {
      const closeAction = jest.fn();
      render(<CreateCvModal {...defaultProps} closeAction={closeAction} />);
      await userEvent.click(document.querySelector("[class*='backdrop']")!);
      expect(closeAction).toHaveBeenCalledTimes(1);
    });

    it("calls closeAction when cancel button is clicked", async () => {
      const closeAction = jest.fn();
      render(<CreateCvModal {...defaultProps} closeAction={closeAction} />);
      await userEvent.click(
        screen.getByRole("button", { name: "ConfirmButtons.cancel" }),
      );
      expect(closeAction).toHaveBeenCalledTimes(1);
    });

    it("resets form fields when isOpen changes to false", () => {
      const { rerender } = render(<CreateCvModal {...defaultProps} />);
      const input = screen.getAllByRole("textbox")[0];
      fireEvent.change(input, { target: { value: "My CV" } });

      rerender(<CreateCvModal {...defaultProps} isOpen={false} />);
      rerender(<CreateCvModal {...defaultProps} isOpen={true} />);

      expect(screen.getAllByRole("textbox")[0]).toHaveValue("");
    });
  });

  describe("form validation", () => {
    it("shows validation error when submitting with empty name", async () => {
      render(<CreateCvModal {...defaultProps} />);
      await userEvent.click(
        screen.getByRole("button", { name: /CvDetails.create/i }),
      );
      await waitFor(() => {
        expect(screen.getByText(/CvDetails.name/i)).toBeInTheDocument();
      });
    });

    it("does not call createCv when form is invalid", async () => {
      render(<CreateCvModal {...defaultProps} />);
      await userEvent.click(
        screen.getByRole("button", { name: /CvDetails.create/i }),
      );
      await waitFor(() => {
        expect(mockCreateCv).not.toHaveBeenCalled();
      });
    });
  });

  describe("form submission", () => {
    it("calls createCv with correct variables on valid submit", async () => {
      render(<CreateCvModal {...defaultProps} />);

      const [nameInput, educationInput, descriptionInput] =
        screen.getAllByRole("textbox");

      await userEvent.type(nameInput, "My CV");
      await userEvent.type(educationInput, "Bachelor");
      await userEvent.type(descriptionInput, "Some description");

      await userEvent.click(
        screen.getByRole("button", { name: /CvDetails.create/i }),
      );

      await waitFor(() => {
        expect(mockCreateCv).toHaveBeenCalledWith({
          variables: {
            cv: {
              name: "My CV",
              education: "Bachelor",
              description: "Some description",
              userId: "user-123",
            },
          },
        });
      });
    });

    it("calls closeAction after successful submission", async () => {
      const closeAction = jest.fn();
      render(<CreateCvModal {...defaultProps} closeAction={closeAction} />);

      await userEvent.type(screen.getAllByRole("textbox")[0], "My CV");
      await userEvent.click(
        screen.getByRole("button", { name: /CvDetails.create/i }),
      );

      await waitFor(() => {
        expect(closeAction).toHaveBeenCalledTimes(1);
      });
    });

    it("does not call createCv when userId is missing", async () => {
      jest
        .mocked(useUserStore)
        .mockImplementation((selector: any) => selector({ userId: null }));

      render(<CreateCvModal {...defaultProps} />);
      await userEvent.type(screen.getAllByRole("textbox")[0], "My CV");
      await userEvent.click(
        screen.getByRole("button", { name: /CvDetails.create/i }),
      );

      await waitFor(() => {
        expect(mockCreateCv).not.toHaveBeenCalled();
      });
    });

    it("disables confirm button while loading", () => {
      jest
        .mocked(useCreateCv)
        .mockReturnValue([mockCreateCv, { loading: true }] as any);

      render(<CreateCvModal {...defaultProps} />);

      expect(
        screen.getByRole("button", { name: /CvDetails.create/i }),
      ).toBeDisabled();
    });
  });
});
