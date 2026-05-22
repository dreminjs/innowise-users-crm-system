import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SkillsToolbar } from "./SkillsToolbar";
const createActionMock = jest.fn();
const changeActionMock = jest.fn();
jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));
jest.mock("@/shared/ui/SearchToolbar/SearchToolbar", () => ({
  SearchToolbar: ({
    value,
    placeholder,
    buttonLabel,
    changeAction,
    createAction,
  }: {
    value: string;
    placeholder: string;
    buttonLabel: string;
    changeAction: (value: string) => void;
    createAction: () => void;
  }) => (
    <div>
      <input
        value={value}
        placeholder={placeholder}
        onChange={(e) => changeAction(e.target.value)}
      />
      <button type="button" onClick={createAction}>
        {buttonLabel}
      </button>
    </div>
  ),
}));

describe("SkillsToolbar", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("renders input value", () => {
    render(
      <SkillsToolbar
        value="react"
        changeAction={changeActionMock}
        createAction={createActionMock}
      />,
    );
    expect(screen.getByDisplayValue("react")).toBeInTheDocument();
  });
  it("renders translated placeholder", () => {
    render(
      <SkillsToolbar
        value=""
        changeAction={changeActionMock}
        createAction={createActionMock}
      />,
    );
    expect(screen.getByPlaceholderText("search")).toBeInTheDocument();
  });
  it("renders translated button label", () => {
    render(
      <SkillsToolbar
        value=""
        changeAction={changeActionMock}
        createAction={createActionMock}
      />,
    );
    expect(
      screen.getByRole("button", {
        name: "create",
      }),
    ).toBeInTheDocument();
  });
  it("calls changeAction", async () => {
    render(
      <SkillsToolbar
        value=""
        changeAction={changeActionMock}
        createAction={createActionMock}
      />,
    );
    await userEvent.type(screen.getByRole("textbox"), "a");
    expect(changeActionMock).toHaveBeenCalledWith("a");
  });

  it("calls createAction", async () => {
    render(
      <SkillsToolbar
        value=""
        changeAction={changeActionMock}
        createAction={createActionMock}
      />,
    );
    await userEvent.click(
      screen.getByRole("button", {
        name: "create",
      }),
    );
    expect(createActionMock).toHaveBeenCalled();
  });
});
