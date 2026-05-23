import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PositionModal } from "./PositionModal";
import { Provider } from "@/components/ui/provider";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      name: "Name",
      "validation.nameRequired": "Name is required",
    };
    return translations[key] ?? key;
  },
}));

const defaultProps = {
  open: true,
  toggleAction: jest.fn(),
  title: "Test Modal",
  confirmLabel: "Confirm",
  submitAction: jest.fn().mockResolvedValue(undefined),
};

const renderModal = (props = {}) =>
  render(
    <Provider>
      <PositionModal {...defaultProps} {...props} />
    </Provider>,
  );

describe("PositionModal", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });
  describe("Rendering", () => {
    it("renders modal with title when open is true", () => {
      renderModal();
      expect(screen.getByText("Test Modal")).toBeInTheDocument();
    });

    it("renders name input field", () => {
      renderModal();
      expect(screen.getByText("Name")).toBeInTheDocument();
    });

    it("renders confirm button with provided label", () => {
      renderModal({ confirmLabel: "Create Position" });
      expect(
        screen.getByRole("button", { name: "Create Position" }),
      ).toBeInTheDocument();
    });

    it("renders cancel button", () => {
      renderModal();
      expect(
        screen.getByRole("button", { name: /cancel/i }),
      ).toBeInTheDocument();
    });

    it("pre-fills input with defaultValues.name", () => {
      renderModal({ defaultValues: { name: "Developer" } });
      expect(screen.getByDisplayValue("Developer")).toBeInTheDocument();
    });

    it("renders empty input when no defaultValues provided", () => {
      renderModal();
      expect(screen.getByRole("textbox")).toHaveValue("");
    });

    it("disables confirm button when loading is true", () => {
      renderModal({ loading: true });
      expect(screen.getByRole("button", { name: "Confirm" })).toBeDisabled();
    });

    it("does not disable confirm button when loading is false", () => {
      renderModal({ loading: false });
      expect(
        screen.getByRole("button", { name: "Confirm" }),
      ).not.toBeDisabled();
    });
  });

  describe("User interaction", () => {
    it("updates input value when user types", async () => {
      renderModal();
      const input = screen.getByRole("textbox");
      await userEvent.type(input, "Manager");
      expect(input).toHaveValue("Manager");
    });

    it("clears input value when user clears the field", async () => {
      renderModal({ defaultValues: { name: "Developer" } });
      const input = screen.getByRole("textbox");
      await userEvent.clear(input);
      expect(input).toHaveValue("");
    });

    it("calls toggleAction when cancel button is clicked", async () => {
      const toggleAction = jest.fn();
      renderModal({ toggleAction });
      await userEvent.click(screen.getByRole("button", { name: /cancel/i }));
      expect(toggleAction).toHaveBeenCalledTimes(1);
    });
  });

  describe("Form validation", () => {
    it("shows validation error when submitting empty name", async () => {
      renderModal();
      await userEvent.click(screen.getByRole("button", { name: "Confirm" }));
      expect(screen.getByText("Name is required")).toBeInTheDocument();
    });

    it("shows validation error when submitting whitespace-only name", async () => {
      renderModal();
      await userEvent.type(screen.getByRole("textbox"), "   ");
      await userEvent.click(screen.getByRole("button", { name: "Confirm" }));
      expect(screen.getByText("Name is required")).toBeInTheDocument();
    });

    it("clears validation error after valid input is provided and submitted", async () => {
      renderModal();
      await userEvent.click(screen.getByRole("button", { name: "Confirm" }));
      expect(screen.getByText("Name is required")).toBeInTheDocument();

      await userEvent.type(screen.getByRole("textbox"), "Manager");
      await userEvent.click(screen.getByRole("button", { name: "Confirm" }));

      await waitFor(() => {
        expect(screen.queryByText("Name is required")).not.toBeInTheDocument();
      });
    });

    it("does not call submitAction when name is empty", async () => {
      const submitAction = jest.fn();
      renderModal({ submitAction });
      await userEvent.click(screen.getByRole("button", { name: "Confirm" }));
      expect(submitAction).not.toHaveBeenCalled();
    });
  });

  describe("Form submission", () => {
    it("calls submitAction with trimmed name on valid submit", async () => {
      const submitAction = jest.fn().mockResolvedValue(undefined);
      renderModal({ submitAction });
      await userEvent.type(screen.getByRole("textbox"), "Developer");
      await userEvent.click(screen.getByRole("button", { name: "Confirm" }));
      await waitFor(() => {
        expect(submitAction).toHaveBeenCalledWith({ name: "Developer" });
      });
    });

    it("calls submitAction once on single submit click", async () => {
      const submitAction = jest.fn().mockResolvedValue(undefined);
      renderModal({ submitAction });
      await userEvent.type(screen.getByRole("textbox"), "Designer");
      await userEvent.click(screen.getByRole("button", { name: "Confirm" }));
      await waitFor(() => {
        expect(submitAction).toHaveBeenCalledTimes(1);
      });
    });

    it("submits form on Enter key press", async () => {
      const submitAction = jest.fn().mockResolvedValue(undefined);
      renderModal({ submitAction });
      const input = screen.getByRole("textbox");
      await userEvent.type(input, "Manager{enter}");
      await waitFor(() => {
        expect(submitAction).toHaveBeenCalledWith({ name: "Manager" });
      });
    });

    it("passes defaultValues name to submitAction if unchanged", async () => {
      const submitAction = jest.fn().mockResolvedValue(undefined);
      renderModal({ defaultValues: { name: "Developer" }, submitAction });
      await userEvent.click(screen.getByRole("button", { name: "Confirm" }));
      await waitFor(() => {
        expect(submitAction).toHaveBeenCalledWith({ name: "Developer" });
      });
    });
  });
});
