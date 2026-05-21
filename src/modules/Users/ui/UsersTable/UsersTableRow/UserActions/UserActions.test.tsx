import { act, fireEvent, render, screen } from "@testing-library/react";
import { UserActions } from "./UserActions";
import { useDeleteUser } from "@/modules/Users/model/hooks/useDeleteUser";
import { useUpdateUserData } from "@/modules/Users/model/hooks/useUpdateUserData";
import { useUserStore } from "@/application/store/user.store";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

jest.mock("@/modules/Users/model/hooks/useDeleteUser", () => ({
  useDeleteUser: jest.fn(),
}));

jest.mock("@/modules/Users/model/hooks/useUpdateUserData", () => ({
  useUpdateUserData: jest.fn(),
}));

jest.mock("@/application/store/user.store", () => ({
  useUserStore: jest.fn(),
}));

jest.mock("@chakra-ui/react", () => ({
  Popover: {
    Root: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
    Trigger: ({ children }: { children: React.ReactNode }) => (
      <button>{children}</button>
    ),
    Positioner: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
    Content: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
    CloseTrigger: () => <button>close</button>,
  },
}));

jest.mock("./UserAction", () => ({
  UserAction: ({ children }: { children: React.ReactNode }) => (
    <li>{children}</li>
  ),
}));

jest.mock("@/modules/Users/ui/EditUserModal/EditUserModal", () => ({
  EditUserModal: ({ open }: { open: boolean }) => (
    <div>{open ? "edit-open" : "edit-closed"}</div>
  ),
}));

describe("UserActions", () => {
  const deleteUserMock = jest.fn();
  const submitActionMock = jest.fn();
  const user = {
    id: "1",
    email: "john@test.com",
    role: "Employee",
    department: {
      id: "10",
    },
    position: {
      id: "20",
    },
    profile: {
      first_name: "John",
      last_name: "Doe",
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useDeleteUser as unknown as jest.Mock).mockReturnValue({
      deleteUser: deleteUserMock,
    });
    (useUpdateUserData as unknown as jest.Mock).mockReturnValue({
      submitAction: submitActionMock,
      loading: false,
    });
  });

  it("should render actions", () => {
    (useUserStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        role: "Admin",
      }),
    );
    render(<UserActions user={user as never} />);
    expect(screen.getByText("profile")).toBeInTheDocument();
    expect(screen.getByText("edit")).toBeInTheDocument();
    expect(screen.getByText("delete")).toBeInTheDocument();
  });

  it("should hide delete for employee", () => {
    (useUserStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        role: "Employee",
      }),
    );
    render(<UserActions user={user as never} />);
    expect(screen.queryByText("delete")).not.toBeInTheDocument();
  });

  it("should call delete user", async () => {
    (useUserStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        role: "Admin",
      }),
    );
    render(<UserActions user={user as never} />);
    await act(async () => {
      fireEvent.click(screen.getByText("delete"));
    });
    expect(deleteUserMock).toHaveBeenCalledWith("1");
  });

  it("should open edit modal", () => {
    (useUserStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        role: "Admin",
      }),
    );
    render(<UserActions user={user as never} />);
    expect(screen.getByText("edit-closed")).toBeInTheDocument();
    fireEvent.click(screen.getByText("edit"));
    expect(screen.getByText("edit-open")).toBeInTheDocument();
  });

  it("should pass default values", () => {
    (useUserStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        role: "Admin",
      }),
    );
    render(<UserActions user={user as never} />);
    expect(screen.getByText("edit-closed")).toBeInTheDocument();
  });
});
