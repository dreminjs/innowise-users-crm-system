import { render, screen, fireEvent } from "@testing-library/react";
import { LanguagesList } from "./LanguagesList";
import { useLanguageStore } from "../../model/language.store";
import { Proficiency } from "@/generated/graphql";

jest.mock("../../model/language.store", () => ({
  useLanguageStore: jest.fn(),
}));

jest.mock("./LanguagesItem", () => ({
  LanguagesItem: ({
    name,
    proficiency,
    isAvailableToChange,
    isActive,
    onClick,
    isEditModalOpen,
  }: {
    name: string;
    proficiency: string;
    isAvailableToChange: boolean;
    isActive: boolean;
    onClick?: (name: string) => void;
    isEditModalOpen: boolean;
  }) => (
    <div>
      <div>
        name:
        {name}
      </div>
      <div>
        proficiency:
        {proficiency}
      </div>
      <div>
        editable:
        {String(isAvailableToChange)}
      </div>
      <div>
        active:
        {String(isActive)}
      </div>
      <div>
        modal:
        {String(isEditModalOpen)}
      </div>
      <button type="button" onClick={() => onClick?.(name)}>
        click-
        {name}
      </button>
    </div>
  ),
}));

jest.mock("../Languages.module.css", () => ({
  languagesList: "languagesList",
}));

describe("LanguagesList", () => {
  const addDeleteLanguage = jest.fn();

  const languagesData = {
    profile: {
      languages: [
        {
          name: "English",
          proficiency: Proficiency.B2,
        },
        {
          name: "German",
          proficiency: Proficiency.C1,
        },
      ],
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useLanguageStore as unknown as jest.Mock).mockReturnValue({
      isDeleteMode: false,
      addDeleteLanguage,
      deleteLanguages: {},
    });
  });

  it("renders all languages", () => {
    render(
      <LanguagesList
        languagesData={languagesData as never}
        isAvailableToChange={true}
      />,
    );
    expect(screen.getByText("name:English")).toBeInTheDocument();
    expect(screen.getByText("name:German")).toBeInTheDocument();
  });

  it("renders proficiencies", () => {
    render(
      <LanguagesList
        languagesData={languagesData as never}
        isAvailableToChange={true}
      />,
    );
    expect(screen.getByText("proficiency:B2")).toBeInTheDocument();
    expect(screen.getByText("proficiency:C1")).toBeInTheDocument();
  });

  it("passes isAvailableToChange", () => {
    render(
      <LanguagesList
        languagesData={languagesData as never}
        isAvailableToChange={false}
      />,
    );
    expect(screen.getAllByText("editable:false")).toHaveLength(2);
  });

  it("marks active delete languages", () => {
    (useLanguageStore as unknown as jest.Mock).mockReturnValue({
      isDeleteMode: false,
      addDeleteLanguage,
      deleteLanguages: {
        English: "English",
      },
    });
    render(
      <LanguagesList
        languagesData={languagesData as never}
        isAvailableToChange={true}
      />,
    );
    expect(screen.getByText("active:true")).toBeInTheDocument();
  });

  it("adds language to delete list in delete mode", () => {
    (useLanguageStore as unknown as jest.Mock).mockReturnValue({
      isDeleteMode: true,
      addDeleteLanguage,
      deleteLanguages: {},
    });
    render(
      <LanguagesList
        languagesData={languagesData as never}
        isAvailableToChange={true}
      />,
    );
    fireEvent.click(screen.getByText("click-English"));
    expect(addDeleteLanguage).toHaveBeenCalledWith("English");
  });

  it("opens edit modal when not in delete mode", () => {
    render(
      <LanguagesList
        languagesData={languagesData as never}
        isAvailableToChange={true}
      />,
    );
    expect(screen.getAllByText("modal:false")).toHaveLength(2);
    fireEvent.click(screen.getByText("click-English"));
    expect(screen.getAllByText("modal:true")).toHaveLength(2);
  });

  it("toggles edit modal state", () => {
    render(
      <LanguagesList
        languagesData={languagesData as never}
        isAvailableToChange={true}
      />,
    );
    fireEvent.click(screen.getByText("click-English"));
    expect(screen.getAllByText("modal:true")).toHaveLength(2);
    fireEvent.click(screen.getByText("click-English"));
    expect(screen.getAllByText("modal:false")).toHaveLength(2);
  });

  it("renders empty list", () => {
    render(
      <LanguagesList
        languagesData={
          {
            profile: {
              languages: [],
            },
          } as never
        }
        isAvailableToChange={true}
      />,
    );
    expect(screen.queryByText(/name:/)).not.toBeInTheDocument();
  });

  it("applies languagesList class", () => {
    const { container } = render(
      <LanguagesList
        languagesData={languagesData as never}
        isAvailableToChange={true}
      />,
    );
    expect(container.querySelector(".languagesList")).toBeInTheDocument();
  });

  it("passes modal state to all items", () => {
    render(
      <LanguagesList
        languagesData={languagesData as never}
        isAvailableToChange={true}
      />,
    );
    fireEvent.click(screen.getByText("click-German"));
    expect(screen.getAllByText("modal:true")).toHaveLength(2);
  });
});
