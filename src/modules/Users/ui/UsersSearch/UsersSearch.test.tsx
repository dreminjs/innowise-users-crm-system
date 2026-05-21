import { act, fireEvent, render, screen } from "@testing-library/react";
import { UsersSearch } from "./UsersSearch";
import { useUserStore } from "@/application/store/user.store";
import { useCreateUser } from "../../model/hooks/useCreateUser";
import { UserRole } from "@/generated/graphql";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));
jest.mock("@/application/store/user.store", () => ({
  useUserStore: jest.fn(),
}));
jest.mock("../../model/hooks/useCreateUser", () => ({
  useCreateUser: jest.fn(),
}));
jest.mock("@/shared/ui/SearchToolbar/SearchToolbar", () => ({
  SearchToolbar: ({
    value,
    buttonLabel,
    changeAction,
    createAction,
  }: {
    value: string;
    buttonLabel?: string;
    changeAction: (value: string) => void;
    createAction?: () => void;
  }) => (
    <div>
      <span>{value}</span>
      <button onClick={() => changeAction("new-value")}>change</button>
      {buttonLabel && <button onClick={createAction}>{buttonLabel}</button>}
    </div>
  ),
}));

jest.mock("../CreateUserModal/CreateUserModal", () => ({
  CreateUserModal: ({ open }: { open: boolean }) => (
    <div>{open ? "modal-open" : "modal-closed"}</div>
  ),
}));

describe("UsersSearch", () => {
  const changeActionMock = jest.fn();
  const submitActionMock = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();

    (useCreateUser as unknown as jest.Mock).mockReturnValue({
      submitAction: submitActionMock,
      loading: false,
    });
  });

  it("should render search value", () => {
    (useUserStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        role: UserRole.Admin,
      }),
    );
    render(<UsersSearch value="john" changeAction={changeActionMock} />);
    expect(screen.getByText("john")).toBeInTheDocument();
  });
  it("should call change action", () => {
    (useUserStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        role: UserRole.Admin,
      }),
    );
    render(<UsersSearch value="" changeAction={changeActionMock} />);
    fireEvent.click(screen.getByText("change"));
    expect(changeActionMock).toHaveBeenCalledWith("new-value");
  });

  it("should render create button for admin", () => {
    (useUserStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        role: UserRole.Admin,
      }),
    );
    render(<UsersSearch value="" changeAction={changeActionMock} />);
    expect(screen.getByText("create.title")).toBeInTheDocument();
  });

  it("should hide create button for employee", () => {
    (useUserStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        role: UserRole.Employee,
      }),
    );
    render(<UsersSearch value="" changeAction={changeActionMock} />);
    expect(screen.queryByText("create.title")).not.toBeInTheDocument();
  });

  it("should open modal", () => {
    (useUserStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        role: UserRole.Admin,
      }),
    );
    render(<UsersSearch value="" changeAction={changeActionMock} />);
    expect(screen.getByText("modal-closed")).toBeInTheDocument();
    fireEvent.click(screen.getByText("create.title"));
    expect(screen.getByText("modal-open")).toBeInTheDocument();
  });
  it("should call submit action", async () => {
    (useUserStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        role: UserRole.Admin,
      }),
    );
    render(<UsersSearch value="" changeAction={changeActionMock} />);
    await act(async () => {
      await submitActionMock({
        email: "test@test.com",
      });
    });
    expect(submitActionMock).toHaveBeenCalled();
  });
});
