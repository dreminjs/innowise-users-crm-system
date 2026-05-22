import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Skills } from "./Skills";
const createSkillMock = jest.fn();
jest.mock("@/modules/Skills/model/hooks/useCreateSkill", () => ({
  useCreateSkill: () => ({
    createSkill: createSkillMock,
    loading: false,
  }),
}));
jest.mock("./SkillsToolbar/SkillsToolbar", () => ({
  SkillsToolbar: ({
    value,
    changeAction,
    createAction,
  }: {
    value: string;
    changeAction: (value: string) => void;
    createAction: () => void;
  }) => (
    <div>
      <input value={value} onChange={(e) => changeAction(e.target.value)} />
      <button type="button" onClick={createAction}>
        open modal
      </button>
    </div>
  ),
}));

jest.mock("./SkillsTable", () => ({
  SkillsTable: ({ search }: { search: string }) => (
    <div>
      table:
      {search}
    </div>
  ),
}));

jest.mock("@/modules/Skills/ui/SkillModal/SkillModal", () => ({
  SkillModal: ({
    open,
    submitAction,
    toggleAction,
  }: {
    open: boolean;
    submitAction: (values: {
      name: string;
      categoryId: string | null;
    }) => Promise<void>;
    toggleAction: () => void;
  }) =>
    open ? (
      <div>
        <div>modal</div>

        <button
          type="button"
          onClick={() =>
            submitAction({
              name: "React",
              categoryId: "1",
            })
          }
        >
          submit
        </button>
        <button type="button" onClick={toggleAction}>
          close
        </button>
      </div>
    ) : null,
}));

describe("Skills", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders SkillsToolbar", () => {
    render(<Skills />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("renders SkillsTable", () => {
    render(<Skills />);
    expect(screen.getByText("table:")).toBeInTheDocument();
  });

  it("updates search value", async () => {
    render(<Skills />);
    await userEvent.type(screen.getByRole("textbox"), "react");
    expect(screen.getByDisplayValue("react")).toBeInTheDocument();
    expect(screen.getByText("table:react")).toBeInTheDocument();
  });

  it("opens modal", async () => {
    render(<Skills />);
    await userEvent.click(screen.getByText("open modal"));
    expect(screen.getByText("modal")).toBeInTheDocument();
  });

  it("calls createSkill", async () => {
    createSkillMock.mockResolvedValue(undefined);
    render(<Skills />);
    await userEvent.click(screen.getByText("open modal"));
    await userEvent.click(screen.getByText("submit"));
    expect(createSkillMock).toHaveBeenCalledWith({
      variables: {
        skill: {
          name: "React",
          categoryId: "1",
        },
      },
    });
  });

  it("closes modal", async () => {
    render(<Skills />);
    await userEvent.click(screen.getByText("open modal"));
    expect(screen.getByText("modal")).toBeInTheDocument();
    await userEvent.click(screen.getByText("close"));
    expect(screen.queryByText("modal")).not.toBeInTheDocument();
  });
});
