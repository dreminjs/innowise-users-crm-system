import { act, fireEvent, render, screen } from "@testing-library/react";
import { CreateUserModal } from "./CreateUserModal";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

jest.mock("../UserForm/UserForm", () => ({
  UserForm: ({
    submitAction,
    serverError,
  }: {
    submitAction: (values: unknown) => Promise<void>;
    serverError: string;
  }) => (
    <div>
      <button
        onClick={() =>
          submitAction({
            email: "test@test.com",
          })
        }
      >
        submit
      </button>
      <span>{serverError}</span>
    </div>
  ),
}));

jest.mock("@/shared/ui/AddItemModal", () => ({
  AddItemModal: ({
    children,
    title,
  }: {
    children: React.ReactNode;
    title: string;
  }) => (
    <div>
      <span>{title}</span>
      {children}
    </div>
  ),
}));

describe("CreateUserModal", () => {
  const closeActionMock = jest.fn();
  const submitActionMock = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should render modal title", () => {
    render(
      <CreateUserModal
        open={true}
        closeAction={closeActionMock}
        submitAction={submitActionMock}
      />,
    );
    expect(screen.getByText("createUserTitle")).toBeInTheDocument();
  });
  it("should call submit action", async () => {
    submitActionMock.mockResolvedValue(undefined);
    render(
      <CreateUserModal
        open={true}
        closeAction={closeActionMock}
        submitAction={submitActionMock}
      />,
    );
    await act(async () => {
      fireEvent.click(screen.getByText("submit"));
    });
    expect(submitActionMock).toHaveBeenCalled();
  });
  it("should call close action after success submit", async () => {
    submitActionMock.mockResolvedValue(undefined);
    render(
      <CreateUserModal
        open={true}
        closeAction={closeActionMock}
        submitAction={submitActionMock}
      />,
    );
    await act(async () => {
      fireEvent.click(screen.getByText("submit"));
    });
    expect(closeActionMock).toHaveBeenCalled();
  });
  it("should show duplicate email error", async () => {
    submitActionMock.mockRejectedValue(new Error("duplicate key"));
    render(
      <CreateUserModal
        open={true}
        closeAction={closeActionMock}
        submitAction={submitActionMock}
      />,
    );
    await act(async () => {
      fireEvent.click(screen.getByText("submit"));
    });
    expect(screen.getByText("emailAlreadyExists")).toBeInTheDocument();
  });
});
