import { render, screen, fireEvent } from "@testing-library/react";
import { ProjectsSearch } from "./ProjectsSearch";

const mockChangeAction = jest.fn();
const mockCreateAction = jest.fn();

jest.mock("next-intl", () => ({
  useTranslations: jest.fn(() => (key: string) => key),
}));

type MockSearchToolbarProps = {
  value: string;
  changeAction: (value: string) => void;
  buttonLabel: string;
  createAction: () => void;
};

jest.mock("@/shared/ui/SearchToolbar/SearchToolbar", () => ({
  SearchToolbar: ({
    value,
    changeAction,
    buttonLabel,
    createAction,
  }: MockSearchToolbarProps) => (
    <div>
      <input
        aria-label="search-input"
        value={value}
        onChange={(e) => changeAction(e.target.value)}
      />

      <button type="button" onClick={createAction}>
        {buttonLabel}
      </button>
    </div>
  ),
}));

describe("ProjectsSearch", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders input value", () => {
    render(
      <ProjectsSearch
        value="crm"
        changeAction={mockChangeAction}
        createAction={mockCreateAction}
      />,
    );

    expect(screen.getByDisplayValue("crm")).toBeInTheDocument();
  });

  it("calls changeAction", () => {
    render(
      <ProjectsSearch
        value=""
        changeAction={mockChangeAction}
        createAction={mockCreateAction}
      />,
    );

    fireEvent.change(screen.getByLabelText("search-input"), {
      target: {
        value: "dashboard",
      },
    });

    expect(mockChangeAction).toHaveBeenCalledWith("dashboard");
  });

  it("calls createAction", () => {
    render(
      <ProjectsSearch
        value=""
        changeAction={mockChangeAction}
        createAction={mockCreateAction}
      />,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "title",
      }),
    );

    expect(mockCreateAction).toHaveBeenCalled();
  });

  it("passes translated button label", () => {
    render(
      <ProjectsSearch
        value=""
        changeAction={mockChangeAction}
        createAction={mockCreateAction}
      />,
    );

    expect(
      screen.getByRole("button", {
        name: "title",
      }),
    ).toBeInTheDocument();
  });
});
