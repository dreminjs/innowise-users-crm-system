import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SkillModal } from "./SkillModal";
const submitActionMock = jest.fn();
const toggleActionMock = jest.fn();
jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

jest.mock("@apollo/client/react", () => ({
  useQuery: () => ({
    data: {
      skillCategories: [
        {
          id: "1",
          name: "Frontend",
        },
        {
          id: "2",
          name: "Backend",
        },
      ],
    },
  }),
}));

jest.mock("@/modules/Skills/api/queries", () => ({
  GET_SKILL_CATEGORIES: "GET_SKILL_CATEGORIES",
}));

jest.mock("@/shared/ui/FormModal", () => ({
  FormModal: ({
    children,
    title,
  }: {
    children: React.ReactNode;
    title: string;
  }) => (
    <div>
      <h1>{title}</h1>
      {children}
    </div>
  ),
}));

jest.mock("@/shared/ui/ModalField/ModalField", () => ({
  ModalField: ({
    children,
    label,
    error,
  }: {
    children: React.ReactNode;
    label: string;
    error?: string;
  }) => (
    <div>
      <span>{label}</span>
      {children}
      {error && <span>{error}</span>}
    </div>
  ),
}));

jest.mock("@/shared/ui/CustomSelect/CustomSelect", () => ({
  CustomSelect: ({
    label,
    options,
    onChange,
  }: {
    label: string;
    options: {
      label: string;
      value: string;
    }[];
    onChange?: (value: string) => void;
  }) => (
    <div>
      <span>{label}</span>

      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange?.(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  ),
}));

jest.mock("@/shared/ui/ConfirmButtons", () => ({
  ConfirmButtons: ({
    confirmLabel,
    disabled,
  }: {
    confirmLabel: string;
    disabled?: boolean;
  }) => (
    <button type="submit" disabled={disabled}>
      {confirmLabel}
    </button>
  ),
}));

describe("SkillModal", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("renders modal title", () => {
    render(
      <SkillModal
        open
        title="Create skill"
        toggleAction={toggleActionMock}
        submitAction={submitActionMock}
      />,
    );
    expect(screen.getByText("Create skill")).toBeInTheDocument();
  });

  it("renders name field", () => {
    render(
      <SkillModal
        open
        title="Modal"
        toggleAction={toggleActionMock}
        submitAction={submitActionMock}
      />,
    );
    expect(screen.getByText("name")).toBeInTheDocument();
  });

  it("renders category select", () => {
    render(
      <SkillModal
        open
        title="Modal"
        toggleAction={toggleActionMock}
        submitAction={submitActionMock}
      />,
    );
    expect(screen.getByText("category")).toBeInTheDocument();
  });

  it("renders category options", () => {
    render(
      <SkillModal
        open
        title="Modal"
        toggleAction={toggleActionMock}
        submitAction={submitActionMock}
      />,
    );
    expect(screen.getByText("Frontend")).toBeInTheDocument();
    expect(screen.getByText("Backend")).toBeInTheDocument();
  });

  it("renders confirm button", () => {
    render(
      <SkillModal
        open
        title="Modal"
        confirmLabel="Create"
        toggleAction={toggleActionMock}
        submitAction={submitActionMock}
      />,
    );
    expect(
      screen.getByRole("button", {
        name: "Create",
      }),
    ).toBeInTheDocument();
  });
  it("renders default values", () => {
    render(
      <SkillModal
        open
        title="Modal"
        toggleAction={toggleActionMock}
        submitAction={submitActionMock}
        defaultValues={{
          name: "React",
          categoryId: "1",
        }}
      />,
    );
    expect(screen.getByDisplayValue("React")).toBeInTheDocument();
  });

  it("shows validation error", async () => {
    render(
      <SkillModal
        open
        title="Modal"
        confirmLabel="Save"
        toggleAction={toggleActionMock}
        submitAction={submitActionMock}
      />,
    );
    await userEvent.click(
      screen.getByRole("button", {
        name: "Save",
      }),
    );
    expect(screen.getByText("validation.nameRequired")).toBeInTheDocument();
  });

  it("calls submitAction", async () => {
    submitActionMock.mockResolvedValue(undefined);
    render(
      <SkillModal
        open
        title="Modal"
        confirmLabel="Save"
        toggleAction={toggleActionMock}
        submitAction={submitActionMock}
      />,
    );
    fireEvent.change(screen.getByRole("textbox"), {
      target: {
        value: "React",
      },
    });
    await userEvent.click(screen.getByText("Frontend"));
    await userEvent.click(
      screen.getByRole("button", {
        name: "Save",
      }),
    );
    await waitFor(() => {
      expect(submitActionMock).toHaveBeenCalledWith({
        name: "React",
        categoryId: "1",
      });
    });
  });

  it("calls toggleAction after submit", async () => {
    submitActionMock.mockResolvedValue(undefined);
    render(
      <SkillModal
        open
        title="Modal"
        confirmLabel="Save"
        toggleAction={toggleActionMock}
        submitAction={submitActionMock}
      />,
    );
    fireEvent.change(screen.getByRole("textbox"), {
      target: {
        value: "React",
      },
    });
    await userEvent.click(
      screen.getByRole("button", {
        name: "Save",
      }),
    );
    await waitFor(() => {
      expect(toggleActionMock).toHaveBeenCalled();
    });
  });
  it("disables confirm button while loading", () => {
    render(
      <SkillModal
        open
        title="Modal"
        confirmLabel="Save"
        loading
        toggleAction={toggleActionMock}
        submitAction={submitActionMock}
      />,
    );
    expect(
      screen.getByRole("button", {
        name: "Save",
      }),
    ).toBeDisabled();
  });
});
