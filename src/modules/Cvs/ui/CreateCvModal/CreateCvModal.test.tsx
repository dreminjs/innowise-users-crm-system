import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CreateCvModal } from "./CreateCvModal";
import { useCreateCv } from "../../model/hooks/useCreateCv";
import { useUserStore } from "@/application/store/user.store";

jest.mock("next-intl", () => ({
  useTranslations: (ns: string) => (key: string) => `${ns}.${key}`,
}));

jest.mock("@/application/store/user.store", () => ({
  useUserStore: jest.fn(),
}));
jest.mock("../../model/hooks/useCreateCv", () => ({
  useCreateCv: jest.fn(),
}));
jest.mock("@/modules/Notifications", () => ({
  useNotification: jest.fn(),
}));
const mockCreateCv = jest.fn();
const addNotificationMock = jest.fn();
const defaultProps = {
  isOpen: true,
  closeAction: jest.fn(),
};

describe("CreateCvModal", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockCreateCv.mockResolvedValue({});
    (useUserStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        userId: "user-123",
      }),
    );
    (useCreateCv as unknown as jest.Mock).mockReturnValue([
      mockCreateCv,
      { loading: false },
    ]);
    const { useNotification } = jest.requireMock("@/modules/Notifications");
    (useNotification as jest.Mock).mockImplementation((selector) =>
      selector({
        addNotification: addNotificationMock,
      }),
    );
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

    it("renders inputs", () => {
      render(<CreateCvModal {...defaultProps} />);
      expect(screen.getAllByRole("textbox").length).toBe(3);
    });

    it("renders close button", () => {
      render(<CreateCvModal {...defaultProps} />);
      expect(screen.getByText("×")).toBeInTheDocument();
    });

    it("renders confirm button", () => {
      render(<CreateCvModal {...defaultProps} />);
      expect(
        screen.getByRole("button", {
          name: /CvDetails.create/i,
        }),
      ).toBeInTheDocument();
    });
  });

  describe("close behavior", () => {
    it("calls closeAction on close button click", async () => {
      const closeAction = jest.fn();
      render(<CreateCvModal {...defaultProps} closeAction={closeAction} />);
      await userEvent.click(screen.getByText("×"));
      expect(closeAction).toHaveBeenCalledTimes(1);
    });

    it("calls closeAction on backdrop click", async () => {
      const closeAction = jest.fn();
      render(<CreateCvModal {...defaultProps} closeAction={closeAction} />);
      await userEvent.click(
        document.querySelector("[class*='backdrop']") as HTMLElement,
      );
      expect(closeAction).toHaveBeenCalledTimes(1);
    });
    it("resets fields after close", () => {
      const { rerender } = render(<CreateCvModal {...defaultProps} />);
      const input = screen.getAllByRole("textbox")[0];
      fireEvent.change(input, {
        target: {
          value: "My CV",
        },
      });
      rerender(<CreateCvModal {...defaultProps} isOpen={false} />);
      rerender(<CreateCvModal {...defaultProps} isOpen />);
      expect(screen.getAllByRole("textbox")[0]).toHaveValue("");
    });
  });

  describe("form submission", () => {
    it("calls createCv with valid data", async () => {
      render(<CreateCvModal {...defaultProps} />);
      const [nameInput, educationInput, descriptionInput] =
        screen.getAllByRole("textbox");
      await userEvent.type(nameInput, "My CV");
      await userEvent.type(educationInput, "Bachelor");
      await userEvent.type(descriptionInput, "Description");
      await userEvent.click(
        screen.getByRole("button", {
          name: /CvDetails.create/i,
        }),
      );

      await waitFor(() => {
        expect(mockCreateCv).toHaveBeenCalledWith({
          variables: {
            cv: {
              name: "My CV",
              education: "Bachelor",
              description: "Description",
              userId: "user-123",
            },
          },
        });
      });
    });

    it("calls closeAction after submit", async () => {
      const closeAction = jest.fn();
      render(<CreateCvModal {...defaultProps} closeAction={closeAction} />);
      const [nameInput, educationInput, descriptionInput] =
        screen.getAllByRole("textbox");
      await userEvent.type(nameInput, "My CV");
      await userEvent.type(educationInput, "Bachelor");
      await userEvent.type(descriptionInput, "Description");
      await userEvent.click(
        screen.getByRole("button", {
          name: /CvDetails.create/i,
        }),
      );
      await waitFor(() => {
        expect(closeAction).toHaveBeenCalled();
      });
    });
    it("does not call createCv without userId", async () => {
      (useUserStore as unknown as jest.Mock).mockImplementation((selector) =>
        selector({
          userId: null,
        }),
      );
      render(<CreateCvModal {...defaultProps} />);
      const [nameInput, educationInput, descriptionInput] =
        screen.getAllByRole("textbox");
      await userEvent.type(nameInput, "My CV");
      await userEvent.type(educationInput, "Bachelor");
      await userEvent.type(descriptionInput, "Description");
      await userEvent.click(
        screen.getByRole("button", {
          name: /CvDetails.create/i,
        }),
      );
      await waitFor(() => {
        expect(mockCreateCv).not.toHaveBeenCalled();
      });
    });
    it("disables button while loading", () => {
      (useCreateCv as unknown as jest.Mock).mockReturnValue([
        mockCreateCv,
        { loading: true },
      ]);
      render(<CreateCvModal {...defaultProps} />);
      expect(
        screen.getByRole("button", {
          name: /CvDetails.create/i,
        }),
      ).toBeDisabled();
    });
  });
});
