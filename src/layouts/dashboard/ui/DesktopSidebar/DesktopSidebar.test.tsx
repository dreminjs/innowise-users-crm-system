import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DesktopSidebar } from "./DesktopSidebar"; // Adjust path if needed
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

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => `translated_${key}`,
}));

jest.mock("@/shared/config/navigation", () => ({
  navigationItems: [
    {
      href: "/dashboard",
      label: "dashboard",
      icon: "home",
      roles: ["admin", "user"],
    },
    {
      href: "/settings",
      label: "settings",
      icon: "settings",
      roles: ["admin"],
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
  Icon: ({ name, className }: any) => (
    <span data-testid={`icon-${name}`} className={className}>
      {name}
    </span>
  ),
}));

jest.mock("@/layouts/dashboard/ui/NavModal/ProfileMenu", () => ({
  ProfileMenu: ({ isOpen, closeAction }: any) => {
    if (!isOpen) return null;
    return (
      <div data-testid="profile-menu">
        <button data-testid="close-menu-btn" onClick={closeAction}>
          Close
        </button>
      </div>
    );
  },
}));

describe("DesktopSidebar Component", () => {
  const mockSetRole = jest.fn();
  const mockToggleAction = jest.fn();
  let mockStoreState: any;

  beforeEach(() => {
    jest.clearAllMocks();
    mockStoreState = {
      userId: "user-123",
      email: "test@example.com",
      role: "admin",
      setRole: mockSetRole,
    };

    (useUserStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector(mockStoreState),
    );

    (useGetProfile as jest.Mock).mockReturnValue({
      data: {
        user: {
          role: "admin",
          profile: {
            first_name: "John",
            last_name: "Doe",
            avatar: "https://example.com/avatar.jpg",
          },
        },
      },
    });

    (usePathname as jest.Mock).mockReturnValue("/dashboard");
  });

  it("should return null and not render if user role is missing", () => {
    mockStoreState.role = null;

    const { container } = render(
      <DesktopSidebar collapsed={false} toggleAction={mockToggleAction} />,
    );

    expect(container.firstChild).toBeNull();
  });

  it("should synchronize user role to store when profile data is loaded", async () => {
    render(
      <DesktopSidebar collapsed={false} toggleAction={mockToggleAction} />,
    );

    await waitFor(() => {
      expect(mockSetRole).toHaveBeenCalledTimes(1);
      expect(mockSetRole).toHaveBeenCalledWith("admin");
    });
  });

  it("should render navigation items allowed for the current role", () => {
    render(
      <DesktopSidebar collapsed={false} toggleAction={mockToggleAction} />,
    );

    expect(screen.getByText("translated_dashboard")).toBeInTheDocument();
    expect(screen.getByText("translated_settings")).toBeInTheDocument();
  });

  it("should filter out navigation items not allowed for 'user' role", () => {
    mockStoreState.role = "user";

    render(
      <DesktopSidebar collapsed={false} toggleAction={mockToggleAction} />,
    );

    expect(screen.getByText("translated_dashboard")).toBeInTheDocument();
    expect(screen.queryByText("translated_settings")).not.toBeInTheDocument();
  });

  it("should hide navigation labels and user info when sidebar is collapsed", () => {
    render(<DesktopSidebar collapsed={true} toggleAction={mockToggleAction} />);

    expect(screen.getByTestId("icon-home")).toBeInTheDocument();

    expect(screen.queryByText("translated_dashboard")).not.toBeInTheDocument();
    expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
  });

  it("should apply active class to the current pathname link", () => {
    (usePathname as jest.Mock).mockReturnValue("/settings");

    render(
      <DesktopSidebar collapsed={false} toggleAction={mockToggleAction} />,
    );

    const activeLink = screen.getByText("translated_settings").closest("a");
    const inactiveLink = screen.getByText("translated_dashboard").closest("a");

    expect(activeLink).toHaveClass("active");
    expect(inactiveLink).not.toHaveClass("active");
  });

  it("should fallback to email when first and last name are not provided", () => {
    (useGetProfile as jest.Mock).mockReturnValue({
      data: {
        user: {
          role: "admin",
          profile: { first_name: null, last_name: null, avatar: null },
        },
      },
    });

    render(
      <DesktopSidebar collapsed={false} toggleAction={mockToggleAction} />,
    );

    expect(screen.getByText("test@example.com")).toBeInTheDocument();
    expect(screen.getByTestId("icon-employees")).toBeInTheDocument(); // avatar fallback icon
  });

  it("should call toggleAction when the collapse button is clicked", async () => {
    const user = userEvent.setup();
    render(
      <DesktopSidebar collapsed={false} toggleAction={mockToggleAction} />,
    );

    const collapseButton = screen.getByTestId("icon-arrow").closest("button");
    await user.click(collapseButton!);

    expect(mockToggleAction).toHaveBeenCalledTimes(1);
  });

  it("should open and close the ProfileMenu modal when clicking the profile button", async () => {
    const user = userEvent.setup();
    render(
      <DesktopSidebar collapsed={false} toggleAction={mockToggleAction} />,
    );

    expect(screen.queryByTestId("profile-menu")).not.toBeInTheDocument();

    const profileButton = screen.getByText("John Doe").closest("button");
    await user.click(profileButton!);

    expect(screen.getByTestId("profile-menu")).toBeInTheDocument();

    const closeBtn = screen.getByTestId("close-menu-btn");
    await user.click(closeBtn);

    expect(screen.queryByTestId("profile-menu")).not.toBeInTheDocument();
  });
});
