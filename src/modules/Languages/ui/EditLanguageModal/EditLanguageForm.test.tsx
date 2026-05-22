import { render, screen, fireEvent } from "@testing-library/react";
import { useQuery } from "@apollo/client/react";
import { useTranslations } from "next-intl";
import { useLanguageForm } from "../../model/hooks/useLanguageForm";
import { useEditProfileLanguage } from "../../model/hooks/useEditProfileLanguage";
import { EditLanguageForm } from "./EditLanguageForm";
import { Proficiency } from "@/generated/graphql";

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

jest.mock("../../model/hooks/useEditProfileLanguage", () => ({
  useEditProfileLanguage: jest.fn(),
}));

jest.mock("../../model/hooks/useLanguageForm", () => ({
  useLanguageForm: jest.fn(),
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
    disabled: boolean;
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

      <button type="button" onClick={() => onChange("Changed")}>
        change
      </button>

      <div>
        options:
        {options.length}
      </div>
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
      <button type="button" onClick={cancelAction}>
        cancel
      </button>

      <div>
        confirm:
        {confirmLabel}
      </div>
    </div>
  ),
}));

jest.mock("../../model/languages.constants", () => ({
  languageProfiency: ["A1", "B2", "Native"],
}));

jest.mock("../Languages.module.css", () => ({
  addLanguageForm: "addLanguageForm",
}));

describe("EditLanguageForm", () => {
  const resetMock = jest.fn();
  const handleChangeName = jest.fn();
  const handleChangeProficiency = jest.fn();
  const handleEditProfileLanguage = jest.fn();
  const toggleAction = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useTranslations as jest.Mock).mockReturnValue((key: string) => key);
    (useQuery as unknown as jest.Mock).mockReturnValue({
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
    });
    (useEditProfileLanguage as jest.Mock).mockReturnValue({
      handleEditProfileLanguage,
    });

    (useLanguageForm as jest.Mock).mockReturnValue({
      control: {},
      handleSubmit: (callback: (values: unknown) => void) => async () => {
        callback({
          name: "English",
          proficiency: "B2",
        });
      },
      reset: resetMock,
      currentName: "English",
      handleChangeName,
      handleChangeProficiency,
    });
    handleEditProfileLanguage.mockResolvedValue(undefined);
  });

  it("renders form", () => {
    const { container } = render(
      <EditLanguageForm
        toggleAction={toggleAction}
        name="English"
        proficiency={Proficiency.B2}
      />,
    );
    expect(container.querySelector("form")).toBeInTheDocument();
  });

  it("renders language select", () => {
    render(
      <EditLanguageForm
        toggleAction={toggleAction}
        name="English"
        proficiency={Proficiency.B2}
      />,
    );
    expect(
      screen.getByText("label:Languages.chooseLanguage"),
    ).toBeInTheDocument();
  });

  it("renders proficiency select", () => {
    render(
      <EditLanguageForm
        toggleAction={toggleAction}
        name="English"
        proficiency={Proficiency.B2}
      />,
    );
    expect(
      screen.getByText("label:Languages.languageMastery"),
    ).toBeInTheDocument();
  });

  it("passes default values to useLanguageForm", () => {
    render(
      <EditLanguageForm
        toggleAction={toggleAction}
        name="German"
        proficiency={Proficiency.C1}
      />,
    );
    expect(useLanguageForm).toHaveBeenCalledWith({
      name: "German",
      proficiency: "C1",
    });
  });

  it("calls handleChangeName", () => {
    render(
      <EditLanguageForm
        toggleAction={toggleAction}
        name="English"
        proficiency={Proficiency.B2}
      />,
    );
    fireEvent.click(screen.getAllByText("change")[0]);
    expect(handleChangeName).toHaveBeenCalledWith("Changed");
  });

  it("calls handleChangeProficiency", () => {
    render(
      <EditLanguageForm
        toggleAction={toggleAction}
        name="English"
        proficiency={Proficiency.B2}
      />,
    );
    fireEvent.click(screen.getAllByText("change")[1]);
    expect(handleChangeProficiency).toHaveBeenCalledWith("Changed");
  });

  it("calls handleEditProfileLanguage on submit", async () => {
    const { container } = render(
      <EditLanguageForm
        toggleAction={toggleAction}
        name="English"
        proficiency={Proficiency.B2}
      />,
    );
    fireEvent.submit(container.querySelector("form")!);
    expect(handleEditProfileLanguage).toHaveBeenCalledWith({
      name: "English",
      proficiency: "B2",
    });
  });

  it("calls toggleAction and reset after submit", async () => {
    const { container } = render(
      <EditLanguageForm
        toggleAction={toggleAction}
        name="English"
        proficiency={Proficiency.B2}
      />,
    );
    fireEvent.submit(container.querySelector("form")!);
    await Promise.resolve();
    expect(toggleAction).toHaveBeenCalled();
    expect(resetMock).toHaveBeenCalled();
  });

  it("disables proficiency select when currentName is empty", () => {
    (useLanguageForm as jest.Mock).mockReturnValue({
      control: {},
      handleSubmit: jest.fn(() => jest.fn()),
      reset: resetMock,
      currentName: "",
      handleChangeName,
      handleChangeProficiency,
    });

    render(
      <EditLanguageForm
        toggleAction={toggleAction}
        name="English"
        proficiency={Proficiency.B1}
      />,
    );

    expect(screen.getAllByText("disabled:true")[1]).toBeInTheDocument();
  });

  it("renders confirm buttons", () => {
    render(
      <EditLanguageForm
        toggleAction={toggleAction}
        name="English"
        proficiency={Proficiency.B2}
      />,
    );
    expect(
      screen.getByText("confirm:ConfirmButtons.confirm"),
    ).toBeInTheDocument();
  });
});
