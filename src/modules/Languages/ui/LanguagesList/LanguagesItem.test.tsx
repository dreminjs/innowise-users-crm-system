import { render, screen, fireEvent } from "@testing-library/react";
import { LanguagesItem } from "./LanguagesItem";
import { Proficiency } from "@/generated/graphql";

jest.mock("next-intl", () => ({
  useTranslations: jest.fn(() => (key: string) => key),
}));

jest.mock("../../model/languages.constants", () => ({
  languageLevelColors: {
    A1: "gray",
    A2: "blue",
    B1: "green",
    B2: "orange",
    C1: "purple",
    C2: "red",
    Native: "gold",
  },
}));

jest.mock("../EditLanguageModal/EditLanguageModal", () => ({
  EditLanguageModal: ({
    open,
    toggleAction,
    name,
    proficiency,
  }: {
    open: boolean;
    toggleAction: () => void;
    name: string;
    proficiency: string;
  }) => (
    <div>
      <div>
        modal-open:
        {String(open)}
      </div>
      <div>
        modal-name:
        {name}
      </div>
      <div>
        modal-proficiency:
        {proficiency}
      </div>
      <button type="button" onClick={toggleAction}>
        modal-toggle
      </button>
    </div>
  ),
}));

jest.mock("../Languages.module.css", () => ({
  languagesItem: "languagesItem",
  languagesItemActive: "languagesItemActive",
}));

describe("LanguagesItem", () => {
  const onClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders language name", () => {
    render(
      <LanguagesItem
        name="English"
        proficiency={Proficiency.B2}
        isAvailableToChange={true}
        isActive={false}
        isEditModalOpen={false}
        onClick={onClick}
      />,
    );

    expect(screen.getByText("English")).toBeInTheDocument();
  });

  it("renders proficiency", () => {
    render(
      <LanguagesItem
        name="English"
        proficiency={Proficiency.C1}
        isAvailableToChange={true}
        isActive={false}
        isEditModalOpen={false}
        onClick={onClick}
      />,
    );

    expect(screen.getByText("C1")).toBeInTheDocument();
  });

  it("renders translated Native proficiency", () => {
    render(
      <LanguagesItem
        name="English"
        proficiency={Proficiency.Native}
        isAvailableToChange={true}
        isActive={false}
        isEditModalOpen={false}
        onClick={onClick}
      />,
    );

    expect(screen.getByText("Native")).toBeInTheDocument();
  });

  it("calls onClick with name", () => {
    render(
      <LanguagesItem
        name="German"
        proficiency={Proficiency.B1}
        isAvailableToChange={true}
        isActive={false}
        isEditModalOpen={false}
        onClick={onClick}
      />,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /German/,
      }),
    );

    expect(onClick).toHaveBeenCalledWith("German", expect.any(Object));
  });

  it("does not call onClick when change is unavailable", () => {
    render(
      <LanguagesItem
        name="German"
        proficiency={Proficiency.B1}
        isAvailableToChange={false}
        isActive={false}
        isEditModalOpen={false}
        onClick={onClick}
      />,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /German/,
      }),
    );

    expect(onClick).not.toHaveBeenCalled();
  });

  it("applies active class", () => {
    const { container } = render(
      <LanguagesItem
        name="English"
        proficiency={Proficiency.B2}
        isAvailableToChange={true}
        isActive={true}
        isEditModalOpen={false}
        onClick={onClick}
      />,
    );

    expect(container.querySelector(".languagesItemActive")).toBeInTheDocument();
  });

  it("renders EditLanguageModal when onClick exists", () => {
    render(
      <LanguagesItem
        name="English"
        proficiency={Proficiency.B2}
        isAvailableToChange={true}
        isActive={false}
        isEditModalOpen={true}
        onClick={onClick}
      />,
    );

    expect(screen.getByText("modal-open:true")).toBeInTheDocument();
  });

  it("does not render EditLanguageModal when onClick missing", () => {
    render(
      <LanguagesItem
        name="English"
        proficiency={Proficiency.B2}
        isAvailableToChange={true}
        isActive={false}
        isEditModalOpen={false}
      />,
    );

    expect(screen.queryByText(/modal-open:/)).not.toBeInTheDocument();
  });

  it("passes props to EditLanguageModal", () => {
    render(
      <LanguagesItem
        name="Spanish"
        proficiency={Proficiency.C2}
        isAvailableToChange={true}
        isActive={false}
        isEditModalOpen={true}
        onClick={onClick}
      />,
    );

    expect(screen.getByText("modal-name:Spanish")).toBeInTheDocument();

    expect(screen.getByText("modal-proficiency:C2")).toBeInTheDocument();
  });

  it("calls modal toggleAction with name", () => {
    render(
      <LanguagesItem
        name="French"
        proficiency={Proficiency.A2}
        isAvailableToChange={true}
        isActive={false}
        isEditModalOpen={true}
        onClick={onClick}
      />,
    );

    fireEvent.click(screen.getByText("modal-toggle"));

    expect(onClick).toHaveBeenCalledWith("French", expect.any(Object));
  });

  it("applies proficiency color", () => {
    render(
      <LanguagesItem
        name="English"
        proficiency={Proficiency.C2}
        isAvailableToChange={true}
        isActive={false}
        isEditModalOpen={false}
        onClick={onClick}
      />,
    );

    expect(screen.getByText("C2")).toHaveStyle({
      color: "rgb(255, 0, 0)",
    });
  });
});
