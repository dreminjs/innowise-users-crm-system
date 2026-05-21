import { render, screen } from "@testing-library/react";
import { UpdateUserInfo } from "./UpdateUserInfo";
import { useGetProfile } from "@/modules/Users";
import { useUserStore } from "@/application/store/user.store";
import { UserRole } from "@/generated/graphql";

jest.mock("@/modules/Users", () => ({
  useGetProfile: jest.fn(),
}));

jest.mock("@/application/store/user.store", () => ({
  useUserStore: jest.fn(),
}));

jest.mock("./UploadAvatar/UploadAvatar", () => ({
  UploadAvatar: ({ firstLetter }: { firstLetter: string }) => (
    <div>{firstLetter}</div>
  ),
}));

jest.mock("./UserInfo", () => ({
  UserInfo: ({ fullName, email }: { fullName: string; email: string }) => (
    <div>
      <span>{fullName}</span>
      <span>{email}</span>
    </div>
  ),
}));

jest.mock("./UploadInfo/UploadInfo", () => ({
  UploadInfo: ({
    firstName,
    lastName,
  }: {
    firstName: string;
    lastName: string;
  }) => (
    <div>
      <span>{firstName}</span>
      <span>{lastName}</span>
    </div>
  ),
}));

jest.mock("@/shared/ui/Loading", () => ({
  Loading: () => <div>Loading...</div>,
}));

describe("UpdateUserInfo", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should render loading", () => {
    (useGetProfile as unknown as jest.Mock).mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });
    render(<UpdateUserInfo userId="1" />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should render error", () => {
    (useGetProfile as unknown as jest.Mock).mockReturnValue({
      data: null,
      loading: false,
      error: new Error("Test error"),
    });
    render(<UpdateUserInfo userId="1" />);
    expect(screen.getByText("Error!")).toBeInTheDocument();
  });

  it("should render user info", () => {
    (useGetProfile as unknown as jest.Mock).mockReturnValue({
      loading: false,
      error: null,
      data: {
        user: {
          email: "john@test.com",
          created_at: "1",
          position: {
            id: "10",
          },
          department: {
            id: "20",
          },
          profile: {
            first_name: "John",
            last_name: "Doe",
            avatar: "avatar.png",
          },
        },
      },
    });
    (useUserStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        role: UserRole.Admin,
        userId: "1",
      }),
    );
    render(<UpdateUserInfo userId="1" />);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john@test.com")).toBeInTheDocument();
  });

  it("should render fallback full name", () => {
    (useGetProfile as unknown as jest.Mock).mockReturnValue({
      loading: false,
      error: null,
      data: {
        user: {
          email: "john@test.com",
          created_at: "1",
          position: {
            id: "10",
          },
          department: {
            id: "20",
          },
          profile: {
            first_name: "",
            last_name: "",
            avatar: "",
          },
        },
      },
    });
    (useUserStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        role: UserRole.Employee,
        userId: "1",
      }),
    );
    render(<UpdateUserInfo userId="1" />);
    expect(screen.getByText("-")).toBeInTheDocument();
  });
  it("should render first avatar letter", () => {
    (useGetProfile as unknown as jest.Mock).mockReturnValue({
      loading: false,
      error: null,
      data: {
        user: {
          email: "john@test.com",
          created_at: "1",
          position: {
            id: "10",
          },
          department: {
            id: "20",
          },
          profile: {
            first_name: "John",
            last_name: "Doe",
            avatar: "",
          },
        },
      },
    });
    (useUserStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        role: UserRole.Employee,
        userId: "1",
      }),
    );
    render(<UpdateUserInfo userId="1" />);
    expect(screen.getByText("J")).toBeInTheDocument();
  });
});
