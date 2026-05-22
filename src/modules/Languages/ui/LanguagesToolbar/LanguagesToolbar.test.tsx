import { render, screen, fireEvent } from "@testing-library/react";
import { LanguagesToolbar } from "./LanguagesToolbar";
const changeAction = jest.fn();
const createAction = jest.fn();
jest.mock("next-intl", () => ({
  useTranslations: jest.fn(() => (key: string) => key),
}));

jest.mock("@/shared/ui/SearchToolbar/SearchToolbar", () => ({
  SearchToolbar: ({
    value,
    changeAction,
    placeholder,
    buttonLabel,
    createAction,
  }: {
    value: string;
    changeAction: (value: string) => void;
    placeholder: string;
    buttonLabel: string;
    createAction: () => void;
  }) => (
    <div>
      <div>
        value:
        {value}
      </div>
      <div>
        placeholder:
        {placeholder}
      </div>
      <div>
        button:
        {buttonLabel}
      </div>
      <button type="button" onClick={() => changeAction("updated")}>
        change
      </button>
      <button type="button" onClick={createAction}>
        create
      </button>
    </div>
  ),
}));

describe("LanguagesToolbar", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("renders SearchToolbar props", () => {
    render(
      <LanguagesToolbar
        value="english"
        changeAction={changeAction}
        createAction={createAction}
      />,
    );
    expect(screen.getByText("value:english")).toBeInTheDocument();
    expect(screen.getByText("placeholder:search")).toBeInTheDocument();
    expect(screen.getByText("button:create")).toBeInTheDocument();
  });

  it("calls changeAction", () => {
    render(
      <LanguagesToolbar
        value=""
        changeAction={changeAction}
        createAction={createAction}
      />,
    );
    fireEvent.click(screen.getByText("change"));
    expect(changeAction).toHaveBeenCalledWith("updated");
  });

  it("calls createAction", () => {
    render(
      <LanguagesToolbar
        value=""
        changeAction={changeAction}
        createAction={createAction}
      />,
    );
    fireEvent.click(screen.getByText("create"));
    expect(createAction).toHaveBeenCalled();
  });

  it("renders empty value", () => {
    render(
      <LanguagesToolbar
        value=""
        changeAction={changeAction}
        createAction={createAction}
      />,
    );
    expect(screen.getByText("value:")).toBeInTheDocument();
  });
  it("renders custom value", () => {
    render(
      <LanguagesToolbar
        value="german"
        changeAction={changeAction}
        createAction={createAction}
      />,
    );
    expect(screen.getByText("value:german")).toBeInTheDocument();
  });
});
