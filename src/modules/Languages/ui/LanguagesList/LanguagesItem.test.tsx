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
        onClick={onClick}
      />,
    );

    expect(screen.getByText("Native")).toBeInTheDocument();
  });

  it("calls onClick with dto", () => {
    render(
      <LanguagesItem
        name="German"
        proficiency={Proficiency.B1}
        isAvailableToChange={true}
        isActive={false}
        onClick={onClick}
      />,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /German/,
      }),
    );

    expect(onClick).toHaveBeenCalledWith(
      {
        name: "German",
        proficiency: Proficiency.B1,
      },
      expect.any(Object),
    );
  });

  it("does not call onClick when change is unavailable", () => {
    render(
      <LanguagesItem
        name="German"
        proficiency={Proficiency.B1}
        isAvailableToChange={false}
        isActive={false}
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
        onClick={onClick}
      />,
    );

    expect(container.querySelector(".languagesItemActive")).toBeInTheDocument();
  });

  it("applies proficiency color", () => {
    render(
      <LanguagesItem
        name="English"
        proficiency={Proficiency.C2}
        isAvailableToChange={true}
        isActive={false}
        onClick={onClick}
      />,
    );

    expect(screen.getByText("C2")).toHaveStyle({
      color: "rgb(255, 0, 0)",
    });
  });
});
