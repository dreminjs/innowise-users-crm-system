import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProfileMenu } from "./ProfileMenu";
import { useUserStore } from "@/application/store/user.store";
import { useTokens } from "@/modules/Tokens";

const mockPush = jest.fn();
const mockClearStore = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));
jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => `translated_${key}`,
}));
jest.mock("@apollo/client/react", () => ({
  useApolloClient: () => ({
    clearStore: mockClearStore,
  }),
}));
jest.mock("@/application/store/user.store", () => ({
  useUserStore: jest.fn(),
}));
jest.mock("@/modules/Tokens", () => ({
  useTokens: jest.fn(),
}));
jest.mock("@/shared/config/navigation", () => ({
  navigationItems: [
    { href: "/dashboard", label: "dashboard", icon: "home", roles: ["admin"] },
    { href: "/users", label: "users", icon: "people", roles: ["admin"] },
    { href: "/skills", label: "skills", icon: "star", roles: ["admin"] },
    { href: "/projects", label: "projects", icon: "folder", roles: ["admin"] },
  ],
}));
jest.mock("@/shared/ui/Icon/Icon", () => ({
  Icon: ({ name }: any) => (
    <span data-testid={`icon-${name}`} aria-hidden="true">
      {name}
    </span>
  ),
}));
describe("ProfileMenu Component", () => {
  const mockCloseAction = jest.fn();
  const mockResetUser = jest.fn();
  const mockDeleteAccessToken = jest.fn();
  const mockUserId = "user-123";

  beforeEach(() => {
    jest.clearAllMocks();
    mockClearStore.mockResolvedValue(undefined);
    (useUserStore as unknown as jest.Mock).mockImplementation((selector) => {
      const state = { role: "admin", resetUser: mockResetUser };
      return selector(state);
    });
    (useTokens as unknown as jest.Mock).mockImplementation((selector) => {
      const state = { deleteAccessToken: mockDeleteAccessToken };
      return selector(state);
    });
  });
  it("should return null and render nothing when isOpen is false", () => {
    const { container } = render(
      <ProfileMenu
        isOpen={false}
        userId={mockUserId}
        collapsed={false}
        closeAction={mockCloseAction}
      />,
    );
    expect(container.firstChild).toBeNull();
  });
  it("should render essential profile and settings links when open", () => {
    render(
      <ProfileMenu
        isOpen={true}
        userId={mockUserId}
        collapsed={false}
        closeAction={mockCloseAction}
      />,
    );
    const profileLink = screen.getByRole("link", {
      name: "translated_profile",
    });
    const settingsLink = screen.getByRole("link", {
      name: "translated_settings",
    });
    expect(profileLink).toBeInTheDocument();
    expect(profileLink).toHaveAttribute("href", `/users/${mockUserId}`);
    expect(settingsLink).toBeInTheDocument();
    expect(settingsLink).toHaveAttribute("href", "/settings");
    expect(screen.getByTestId("icon-account")).toBeInTheDocument();
    expect(screen.getByTestId("icon-settings")).toBeInTheDocument();
  });

  it("should trigger closeAction when the backdrop is clicked", async () => {
    const user = userEvent.setup();
    render(
      <ProfileMenu
        isOpen={true}
        userId={mockUserId}
        collapsed={false}
        closeAction={mockCloseAction}
      />,
    );
    const backdrop = document.querySelector(".backdrop");
    expect(backdrop).toBeInTheDocument();
    await user.click(backdrop!);
    expect(mockCloseAction).toHaveBeenCalledTimes(1);
  });

  it("should trigger closeAction when any navigational link is clicked", async () => {
    const user = userEvent.setup();
    render(
      <ProfileMenu
        isOpen={true}
        userId={mockUserId}
        collapsed={false}
        closeAction={mockCloseAction}
      />,
    );
    const settingsLink = screen.getByRole("link", {
      name: "translated_settings",
    });
    await user.click(settingsLink);
    expect(mockCloseAction).toHaveBeenCalledTimes(1);
  });
  it("should render extra filtered navigation items only when isMobile is true", () => {
    const { rerender } = render(
      <ProfileMenu
        isOpen={true}
        userId={mockUserId}
        collapsed={false}
        closeAction={mockCloseAction}
        isMobile={false}
      />,
    );
    expect(
      screen.queryByRole("link", { name: "translated_dashboard" }),
    ).not.toBeInTheDocument();
    rerender(
      <ProfileMenu
        isOpen={true}
        userId={mockUserId}
        collapsed={false}
        closeAction={mockCloseAction}
        isMobile={true}
      />,
    );
    expect(
      screen.getByRole("link", { name: "translated_dashboard" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "translated_projects" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "translated_users" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "translated_skills" }),
    ).not.toBeInTheDocument();
  });
  it("should execute full logout sequence and redirect when logout button is clicked", async () => {
    const user = userEvent.setup();
    render(
      <ProfileMenu
        isOpen={true}
        userId={mockUserId}
        collapsed={false}
        closeAction={mockCloseAction}
      />,
    );
    const logoutButton = screen.getByRole("button", {
      name: "translated_logout",
    });
    await user.click(logoutButton);
    expect(mockClearStore).toHaveBeenCalledTimes(1);
    expect(mockResetUser).toHaveBeenCalledTimes(1);
    expect(mockDeleteAccessToken).toHaveBeenCalledTimes(1);
    expect(mockCloseAction).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith("/auth/signin");
  });
});
