import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MobileBottomNav } from "./MobileBottomNav"; // Скорректируйте путь
import { usePathname } from "next/navigation";
import { useUserStore } from "@/application/store/user.store";
import { useGetProfile } from "@/modules/Users";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

jest.mock("@/shared/config/navigation", () => ({
  navigationItems: [
    { href: "/home", label: "Home", icon: "home", roles: ["admin", "user"] },
    {
      href: "/settings",
      label: "Settings",
      icon: "settings",
      roles: ["admin"],
    },
    {
      href: "/profile",
      label: "Profile",
      icon: "profile",
      roles: ["admin", "user"],
    },
  ],
}));

jest.mock("@/application/store/user.store", () => ({
  useUserStore: jest.fn(),
}));

jest.mock("@/modules/Users", () => ({
  useGetProfile: jest.fn(),
}));

jest.mock("@/shared/ui/Icon/Icon", () => ({
  Icon: ({ name }: any) => <span data-testid={`icon-${name}`}>{name}</span>,
}));

jest.mock("@/layouts/dashboard/ui/NavModal/ProfileMenu", () => ({
  ProfileMenu: ({ isOpen, closeAction }: any) => {
    if (!isOpen) return null;
    return (
      <div data-testid="profile-menu">
        <button data-testid="close-menu-btn" onClick={closeAction}>
          Close Menu
        </button>
      </div>
    );
  },
}));

describe("MobileBottomNav", () => {
  const mockStoreState = {
    userId: "user-123",
    email: "test@example.com",
    role: "admin",
  };

  beforeEach(() => {
    jest.clearAllMocks();

    (useUserStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector(mockStoreState),
    );

    (useGetProfile as jest.Mock).mockReturnValue({
      data: {
        user: {
          profile: {
            first_name: "John",
            last_name: "Doe",
            avatar: null,
          },
        },
      },
    });

    (usePathname as jest.Mock).mockReturnValue("/home");
  });

  it("renders a maximum of 2 navigation items available to the current role", () => {
    render(<MobileBottomNav />);

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
    expect(screen.queryByText("Profile")).not.toBeInTheDocument();
  });

  it("correctly filters menu items by user role", () => {
    (useUserStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({ ...mockStoreState, role: "user" }),
    );

    render(<MobileBottomNav />);

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.queryByText("Settings")).not.toBeInTheDocument();
  });

  it("applies the active class to the current route (pathname)", () => {
    (usePathname as jest.Mock).mockReturnValue("/settings");

    render(<MobileBottomNav />);

    const settingsLink = screen.getByText("Settings").closest("a");
    const homeLink = screen.getByText("Home").closest("a");
    expect(settingsLink?.className).toMatch(/active/);
    expect(homeLink?.className).not.toMatch(/active/);
  });

  it("displays the user's first and last name (displayName)", () => {
    render(<MobileBottomNav />);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("displays email if first and last name are missing", () => {
    (useGetProfile as jest.Mock).mockReturnValue({
      data: {
        user: {
          profile: { first_name: null, last_name: null, avatar: null },
        },
      },
    });

    render(<MobileBottomNav />);
    expect(screen.getByText("test@example.com")).toBeInTheDocument();
  });

  it("renders an avatar if one is provided", () => {
    const avatarUrl = "https://example.com/avatar.jpg";
    (useGetProfile as jest.Mock).mockReturnValue({
      data: {
        user: {
          profile: { first_name: "John", last_name: "Doe", avatar: avatarUrl },
        },
      },
    });

    render(<MobileBottomNav />);

    const img = screen.getByRole("img", { name: "John Doe" });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", avatarUrl);
    expect(screen.queryByTestId("icon-employees")).not.toBeInTheDocument();
  });

  it("renders the 'employees' icon if there is no avatar", () => {
    render(<MobileBottomNav />);

    expect(screen.getByTestId("icon-employees")).toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("opens and closes the ProfileMenu when you click on the profile button", async () => {
    const user = userEvent.setup();
    render(<MobileBottomNav />);

    expect(screen.queryByTestId("profile-menu")).not.toBeInTheDocument();

    const profileBtn = screen.getByText("John Doe").closest("button");
    await user.click(profileBtn!);

    expect(screen.getByTestId("profile-menu")).toBeInTheDocument();

    const closeBtn = screen.getByTestId("close-menu-btn");
    await user.click(closeBtn);

    expect(screen.queryByTestId("profile-menu")).not.toBeInTheDocument();
  });
});
