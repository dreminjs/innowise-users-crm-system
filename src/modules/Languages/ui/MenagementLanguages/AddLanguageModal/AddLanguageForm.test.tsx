import { render, screen, fireEvent } from "@testing-library/react";
import { useQuery } from "@apollo/client/react";
import { useTranslations } from "next-intl";
import { useLanguageForm } from "@/modules/Languages/model/hooks/useLanguageForm";
import { useAddProfileLanguage } from "@/modules/Languages/model/hooks/useAddProfileLanguage";
import { AddLanguageForm } from "./AddLanguageForm";
jest.mock("@apollo/client/react", () => ({
  useQuery: jest.fn(),
}));
jest.mock("next-intl", () => ({
  useTranslations: jest.fn(),
}));
jest.mock("react-hook-form", () => ({
  Controller: ({
    render,
  }: {
    render: (props: {
      field: {
        value: string;
      };
    }) => React.ReactNode;
  }) =>
    render({
      field: {
        value: "English",
      },
    }),
}));
jest.mock("@/modules/Languages/model/hooks/useLanguageForm", () => ({
  useLanguageForm: jest.fn(),
}));
jest.mock("@/modules/Languages/model/hooks/useAddProfileLanguage", () => ({
  useAddProfileLanguage: jest.fn(),
}));
jest.mock("@/shared/ui/CustomSelect", () => ({
  CustomSelect: ({
    label,
    options,
    value,
    disabled,
    onChange,
  }: {
    label: string;
    options: Array<{
      value: string;
      label: string;
    }>;
    value: string;
    disabled?: boolean;
    onChange: (value: string) => void;
  }) => (
    <div>
      <div>
        label:
        {label}
      </div>
      <div>
        value:
        {value}
      </div>
      <div>
        disabled:
        {String(disabled)}
      </div>
      <div>
        options:
        {options.length}
      </div>
      <button type="button" onClick={() => onChange("Changed")}>
        change
      </button>
    </div>
  ),
}));

jest.mock("@/shared/ui/ConfirmButtons", () => ({
  ConfirmButtons: ({
    cancelAction,
    confirmLabel,
  }: {
    cancelAction: () => void;
    confirmLabel: string;
  }) => (
    <div>
      <div>
        confirm:
        {confirmLabel}
      </div>
      <button type="button" onClick={cancelAction}>
        cancel
      </button>
      <button type="submit">submit</button>
    </div>
  ),
}));

jest.mock("@/modules/Languages/model/languages.constants", () => ({
  languageProfiency: ["A1", "B2", "Native"],
}));

jest.mock("../../Languages.module.css", () => ({
  addLanguageForm: "addLanguageForm",
}));

describe("AddLanguageForm", () => {
  const handleAddProfileLanguage = jest.fn();
  const handleChangeName = jest.fn();
  const handleChangeProficiency = jest.fn();
  const handleSubmitMock = jest.fn();
  const resetMock = jest.fn();
  const onToggle = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useTranslations as jest.Mock).mockReturnValue((key: string) => key);
    (useQuery as unknown as jest.Mock)
      .mockReturnValueOnce({
        data: {
          languages: [
            {
              name: "English",
            },
            {
              name: "German",
            },
          ],
        },
      })
      .mockReturnValueOnce({
        data: {
          profile: {
            languages: [
              {
                name: "English",
              },
            ],
          },
        },
      });
    (useAddProfileLanguage as jest.Mock).mockReturnValue({
      handleAddProfileLanguage,
    });
    (useLanguageForm as jest.Mock).mockReturnValue({
      control: {},
      handleChangeProficiency,
      handleSubmit: (callback: (values: unknown) => void) => async () => {
        callback({
          name: "German",
          proficiency: "B2",
        });
      },
      reset: resetMock,
      currentName: "German",
      handleChangeName,
    });
    handleAddProfileLanguage.mockResolvedValue(undefined);
    handleSubmitMock.mockImplementation(async (callback) => {
      await callback({
        name: "German",
        proficiency: "B2",
      });
    });
  });

  it("renders form", () => {
    const { container } = render(
      <AddLanguageForm onToggle={onToggle} currentUserId="user-1" />,
    );
    expect(container.querySelector("form")).toBeInTheDocument();
  });

  it("renders language select", () => {
    render(<AddLanguageForm onToggle={onToggle} currentUserId="user-1" />);
    expect(
      screen.getByText("label:Languages.chooseLanguage"),
    ).toBeInTheDocument();
  });

  it("renders proficiency select", () => {
    render(<AddLanguageForm onToggle={onToggle} currentUserId="user-1" />);
    expect(
      screen.getByText("label:Languages.languageMastery"),
    ).toBeInTheDocument();
  });

  it("filters already selected languages", () => {
    render(<AddLanguageForm onToggle={onToggle} currentUserId="user-1" />);
    expect(screen.getByText("options:1")).toBeInTheDocument();
  });

  it("calls handleChangeName", () => {
    render(<AddLanguageForm onToggle={onToggle} currentUserId="user-1" />);
    fireEvent.click(screen.getAllByText("change")[0]);
    expect(handleChangeName).toHaveBeenCalledWith("Changed");
  });

  it("calls handleChangeProficiency", () => {
    render(<AddLanguageForm onToggle={onToggle} currentUserId="user-1" />);
    fireEvent.click(screen.getAllByText("change")[1]);
    expect(handleChangeProficiency).toHaveBeenCalledWith("Changed");
  });

  it("submits form", async () => {
    const { container } = render(
      <AddLanguageForm onToggle={onToggle} currentUserId="user-1" />,
    );
    fireEvent.submit(container.querySelector("form")!);
    await Promise.resolve();
    expect(handleAddProfileLanguage).toHaveBeenCalledWith({
      name: "German",
      proficiency: "B2",
    });
  });

  it("calls reset and onToggle after submit", async () => {
    const { container } = render(
      <AddLanguageForm onToggle={onToggle} currentUserId="user-1" />,
    );
    fireEvent.submit(container.querySelector("form")!);
    await Promise.resolve();
    expect(resetMock).toHaveBeenCalled();
    expect(onToggle).toHaveBeenCalled();
  });

  it("disables proficiency select when currentName empty", () => {
    (useLanguageForm as jest.Mock).mockReturnValue({
      control: {},
      handleChangeProficiency,
      handleSubmit: jest.fn(),
      reset: resetMock,
      currentName: "",
      handleChangeName,
    });
    render(<AddLanguageForm onToggle={onToggle} currentUserId="user-1" />);
    expect(screen.getAllByText("disabled:true")[0]).toBeInTheDocument();
  });

  it("renders confirm buttons", () => {
    render(<AddLanguageForm onToggle={onToggle} currentUserId="user-1" />);
    expect(
      screen.getByText("confirm:ConfirmButtons.confirm"),
    ).toBeInTheDocument();
  });

  it("calls cancel action", () => {
    render(<AddLanguageForm onToggle={onToggle} currentUserId="user-1" />);
    fireEvent.click(screen.getByText("cancel"));
    expect(onToggle).toHaveBeenCalled();
  });
});
