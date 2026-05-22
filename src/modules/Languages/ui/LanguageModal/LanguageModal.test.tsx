import { render, screen, fireEvent } from "@testing-library/react";
import { LanguageModal } from "./LanguageModal";

jest.mock("next-intl", () => ({
  useTranslations: jest.fn(() => (key: string) => key),
}));

jest.mock("@/shared/ui/FormModal", () => ({
  FormModal: ({
    open,
    toggleAction,
    title,
    children,
  }: {
    open: boolean;
    toggleAction: () => void;
    title: string;
    children: React.ReactNode;
  }) => (
    <div>
      <div>
        open:
        {String(open)}
      </div>
      <div>
        title:
        {title}
      </div>
      <button type="button" onClick={toggleAction}>
        close-modal
      </button>
      {children}
    </div>
  ),
}));

jest.mock("@/shared/ui/ModalField/ModalField", () => ({
  ModalField: ({
    label,
    active,
    error,
    children,
  }: {
    label: string;
    active: boolean;
    error: string;
    children: React.ReactNode;
  }) => (
    <div>
      <div>
        label:
        {label}
      </div>
      <div>
        active:
        {String(active)}
      </div>
      <div>
        error:
        {error}
      </div>
      {children}
    </div>
  ),
}));

jest.mock("@/shared/ui/ConfirmButtons", () => ({
  ConfirmButtons: ({
    confirmLabel,
    cancelAction,
    disabled,
  }: {
    confirmLabel: string;
    cancelAction: () => void;
    disabled?: boolean;
  }) => (
    <div>
      <div>
        confirm:
        {confirmLabel}
      </div>
      <div>
        disabled:
        {String(disabled)}
      </div>
      <button type="button" onClick={cancelAction}>
        cancel
      </button>
      <button type="submit">submit</button>
    </div>
  ),
}));
jest.mock("./LanguageModal.module.css", () => ({
  form: "form",
  input: "input",
}));

describe("LanguageModal", () => {
  const toggleAction = jest.fn();
  const submitAction = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
    submitAction.mockResolvedValue(undefined);
  });
  it("renders modal", () => {
    render(
      <LanguageModal
        open={true}
        toggleAction={toggleAction}
        title="Create language"
        confirmLabel="Create"
        submitAction={submitAction}
      />,
    );
    expect(screen.getByText("open:true")).toBeInTheDocument();
  });
  it("renders title", () => {
    render(
      <LanguageModal
        open={true}
        toggleAction={toggleAction}
        title="Edit language"
        confirmLabel="Save"
        submitAction={submitAction}
      />,
    );
    expect(screen.getByText("title:Edit language")).toBeInTheDocument();
  });
  it("renders confirm label", () => {
    render(
      <LanguageModal
        open={true}
        toggleAction={toggleAction}
        title="Title"
        confirmLabel="Confirm"
        submitAction={submitAction}
      />,
    );
    expect(screen.getByText("confirm:Confirm")).toBeInTheDocument();
  });
  it("renders inputs with default values", () => {
    render(
      <LanguageModal
        open={true}
        toggleAction={toggleAction}
        title="Title"
        confirmLabel="Confirm"
        submitAction={submitAction}
        defaultValues={{
          name: "English",
          nativeName: "English",
          iso2: "en",
        }}
      />,
    );
    const inputs = screen.getAllByRole("textbox");
    expect(inputs[0]).toHaveValue("English");
    expect(inputs[1]).toHaveValue("English");
    expect(inputs[2]).toHaveValue("en");
  });
  it("changes input values", () => {
    render(
      <LanguageModal
        open={true}
        toggleAction={toggleAction}
        title="Title"
        confirmLabel="Confirm"
        submitAction={submitAction}
      />,
    );
    const inputs = screen.getAllByRole("textbox");
    fireEvent.change(inputs[0], {
      target: {
        value: "German",
      },
    });
    expect(inputs[0]).toHaveValue("German");
  });
  it("calls submitAction with correct values", async () => {
    const { container } = render(
      <LanguageModal
        open={true}
        toggleAction={toggleAction}
        title="Title"
        confirmLabel="Confirm"
        submitAction={submitAction}
      />,
    );
    const inputs = screen.getAllByRole("textbox");
    fireEvent.change(inputs[0], {
      target: {
        value: "English",
      },
    });
    fireEvent.change(inputs[1], {
      target: {
        value: "English Native",
      },
    });
    fireEvent.change(inputs[2], {
      target: {
        value: "en",
      },
    });
    fireEvent.submit(container.querySelector("form")!);
    await Promise.resolve();
    expect(submitAction).toHaveBeenCalledWith({
      name: "English",
      native_name: "English Native",
      iso2: "en",
    });
  });
  it("shows validation errors", async () => {
    const { container } = render(
      <LanguageModal
        open={true}
        toggleAction={toggleAction}
        title="Title"
        confirmLabel="Confirm"
        submitAction={submitAction}
      />,
    );
    fireEvent.submit(container.querySelector("form")!);
    await Promise.resolve();
    expect(
      screen.getByText("error:validation.nameRequired"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("error:validation.nativeNameRequired"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("error:validation.iso2Required"),
    ).toBeInTheDocument();
  });

  it("does not call submitAction when validation fails", async () => {
    const { container } = render(
      <LanguageModal
        open={true}
        toggleAction={toggleAction}
        title="Title"
        confirmLabel="Confirm"
        submitAction={submitAction}
      />,
    );
    fireEvent.submit(container.querySelector("form")!);
    await Promise.resolve();
    expect(submitAction).not.toHaveBeenCalled();
  });

  it("calls toggleAction from cancel button", () => {
    render(
      <LanguageModal
        open={true}
        toggleAction={toggleAction}
        title="Title"
        confirmLabel="Confirm"
        submitAction={submitAction}
      />,
    );
    fireEvent.click(screen.getByText("cancel"));
    expect(toggleAction).toHaveBeenCalled();
  });

  it("passes loading state to ConfirmButtons", () => {
    render(
      <LanguageModal
        open={true}
        toggleAction={toggleAction}
        title="Title"
        confirmLabel="Confirm"
        loading={true}
        submitAction={submitAction}
      />,
    );
    expect(screen.getByText("disabled:true")).toBeInTheDocument();
  });
});
