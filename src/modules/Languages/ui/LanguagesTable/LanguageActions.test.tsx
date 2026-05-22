import { render, screen, fireEvent } from "@testing-library/react";
import { LanguageActions } from "./LanguageActions";
const deleteLanguageMock = jest.fn();
const updateLanguageMock = jest.fn();

jest.mock("next-intl", () => ({
  useTranslations: jest.fn(() => (key: string) => key),
}));

jest.mock("@/modules/Languages/model/hooks/useDeleteLanguage", () => ({
  useDeleteLanguage: jest.fn(() => ({
    deleteLanguage: deleteLanguageMock,
  })),
}));

jest.mock("@/modules/Languages/model/hooks/useUpdateLanguage", () => ({
  useUpdateLanguage: jest.fn(() => ({
    updateLanguage: updateLanguageMock,
    loading: false,
  })),
}));

jest.mock("@/shared/ui/ActionsMenu/ActionsMenu", () => ({
  ActionsMenu: ({
    items,
  }: {
    items: Array<{
      label: string;
      onClick: () => void | Promise<void>;
    }>;
  }) => (
    <div>
      {items.map((item) => (
        <button key={item.label} type="button" onClick={item.onClick}>
          {item.label}
        </button>
      ))}
    </div>
  ),
}));

jest.mock("@/modules/Languages/ui/LanguageModal/LanguageModal", () => ({
  LanguageModal: ({
    open,
    toggleAction,
    title,
    confirmLabel,
    loading,
    defaultValues,
    submitAction,
  }: {
    open: boolean;
    toggleAction: () => void;
    title: string;
    confirmLabel: string;
    loading?: boolean;
    defaultValues?: {
      name: string;
      nativeName: string;
      iso2: string;
    };
    submitAction: (values: {
      name: string;
      native_name: string;
      iso2: string;
    }) => Promise<void>;
  }) => (
    <div>
      <div>
        modal-open:
        {String(open)}
      </div>
      <div>
        modal-title:
        {title}
      </div>
      <div>
        modal-confirm:
        {confirmLabel}
      </div>
      <div>
        modal-loading:
        {String(loading)}
      </div>
      <div>
        modal-name:
        {defaultValues?.name}
      </div>
      <div>
        modal-native:
        {defaultValues?.nativeName}
      </div>
      <div>
        modal-iso2:
        {defaultValues?.iso2}
      </div>
      <button type="button" onClick={toggleAction}>
        close-modal
      </button>
      <button
        type="button"
        onClick={() =>
          submitAction({
            name: "Updated",
            native_name: "Updated Native",
            iso2: "up",
          })
        }
      >
        submit-modal
      </button>
    </div>
  ),
}));

describe("LanguageActions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    deleteLanguageMock.mockResolvedValue(undefined);
    updateLanguageMock.mockResolvedValue(undefined);
  });

  it("renders action buttons", () => {
    render(
      <LanguageActions
        languageId="1"
        languageName="English"
        nativeName="English"
        iso2="en"
      />,
    );
    expect(screen.getByText("edit")).toBeInTheDocument();
    expect(screen.getByText("delete")).toBeInTheDocument();
  });

  it("opens modal on edit click", () => {
    render(
      <LanguageActions
        languageId="1"
        languageName="English"
        nativeName="English"
        iso2="en"
      />,
    );
    expect(screen.getByText("modal-open:false")).toBeInTheDocument();
    fireEvent.click(screen.getByText("edit"));
    expect(screen.getByText("modal-open:true")).toBeInTheDocument();
  });

  it("calls deleteLanguage", async () => {
    render(
      <LanguageActions
        languageId="55"
        languageName="German"
        nativeName="Deutsch"
        iso2="de"
      />,
    );
    fireEvent.click(screen.getByText("delete"));
    await Promise.resolve();
    expect(deleteLanguageMock).toHaveBeenCalledWith({
      variables: {
        language: {
          languageId: "55",
        },
      },
    });
  });

  it("passes modal props", () => {
    render(
      <LanguageActions
        languageId="1"
        languageName="French"
        nativeName="Français"
        iso2="fr"
      />,
    );
    expect(screen.getByText("modal-title:editTitle")).toBeInTheDocument();
    expect(screen.getByText("modal-confirm:save")).toBeInTheDocument();
    expect(screen.getByText("modal-name:French")).toBeInTheDocument();
    expect(screen.getByText("modal-native:Français")).toBeInTheDocument();
    expect(screen.getByText("modal-iso2:fr")).toBeInTheDocument();
  });

  it("passes loading state", () => {
    jest.doMock("@/modules/Languages/model/hooks/useUpdateLanguage", () => ({
      useUpdateLanguage: jest.fn(() => ({
        updateLanguage: updateLanguageMock,
        loading: true,
      })),
    }));
  });

  it("calls updateLanguage on modal submit", async () => {
    render(
      <LanguageActions
        languageId="99"
        languageName="Spanish"
        nativeName="Español"
        iso2="es"
      />,
    );
    fireEvent.click(screen.getByText("submit-modal"));
    await Promise.resolve();
    expect(updateLanguageMock).toHaveBeenCalledWith({
      variables: {
        language: {
          languageId: "99",
          name: "Updated",
          native_name: "Updated Native",
          iso2: "up",
        },
      },
    });
  });

  it("closes modal after submit", async () => {
    render(
      <LanguageActions
        languageId="1"
        languageName="English"
        nativeName="English"
        iso2="en"
      />,
    );
    fireEvent.click(screen.getByText("edit"));
    expect(screen.getByText("modal-open:true")).toBeInTheDocument();
    fireEvent.click(screen.getByText("submit-modal"));
    await screen.findByText("modal-open:false");
    expect(screen.getByText("modal-open:false")).toBeInTheDocument();
  });

  it("closes modal from toggleAction", () => {
    render(
      <LanguageActions
        languageId="1"
        languageName="English"
        nativeName="English"
        iso2="en"
      />,
    );
    fireEvent.click(screen.getByText("edit"));
    fireEvent.click(screen.getByText("close-modal"));
    expect(screen.getByText("modal-open:false")).toBeInTheDocument();
  });
  it("renders closed modal initially", () => {
    render(
      <LanguageActions
        languageId="1"
        languageName="English"
        nativeName="English"
        iso2="en"
      />,
    );
    expect(screen.getByText("modal-open:false")).toBeInTheDocument();
  });
});
