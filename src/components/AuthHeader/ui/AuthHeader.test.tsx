import { render, screen } from "@testing-library/react";
import { AuthHeader } from "./AuthHeader";

jest.mock("next-intl", () => ({
  useTranslations: jest.fn(() => (key: string) => key),
}));

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

jest.mock("../model/nav.items", () => ({
  navItems: [
    {
      label: "login",
      to: "/auth/login",
    },
    {
      label: "registration",
      to: "/auth/registration",
    },
  ],
}));

type MockNavigationItemProps = {
  isActive: boolean;
  label: string;
  to: string;
};

type MockNavigationProps = {
  children: React.ReactNode;
};

jest.mock("@/components/Navigation", () => ({
  Navigation: ({ children }: MockNavigationProps) => <nav>{children}</nav>,
  NavigationItem: ({ isActive, label, to }: MockNavigationItemProps) => (
    <div>
      <div>
        nav-label:
        {label}
      </div>
      <div>
        nav-to:
        {to}
      </div>
      <div>
        nav-active:
        {String(isActive)}
      </div>
    </div>
  ),
}));

jest.mock("./AuthHeader.module.css", () => ({
  authHeader: "authHeader",
}));

describe("AuthHeader", () => {
  const { usePathname } = jest.requireMock("next/navigation");
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns null on forgot-password page", () => {
    usePathname.mockReturnValue("/auth/forgot-password");
    const { container } = render(<AuthHeader />);
    expect(container.firstChild).toBeNull();
  });

  it("renders navigation items", () => {
    usePathname.mockReturnValue("/auth/login");
    render(<AuthHeader />);
    expect(screen.getByText("nav-label:login")).toBeInTheDocument();
    expect(screen.getByText("nav-label:registration")).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    usePathname.mockReturnValue("/auth/login");
    render(<AuthHeader />);
    expect(screen.getByText("nav-to:/auth/login")).toBeInTheDocument();
    expect(screen.getByText("nav-to:/auth/registration")).toBeInTheDocument();
  });

  it("marks active navigation item", () => {
    usePathname.mockReturnValue("/auth/login");
    render(<AuthHeader />);
    expect(screen.getByText("nav-active:true")).toBeInTheDocument();
  });

  it("renders inactive navigation item", () => {
    usePathname.mockReturnValue("/auth/login");
    render(<AuthHeader />);
    expect(screen.getByText("nav-active:false")).toBeInTheDocument();
  });

  it("renders header wrapper", () => {
    usePathname.mockReturnValue("/auth/login");
    const { container } = render(<AuthHeader />);
    expect(container.querySelector(".authHeader")).toBeInTheDocument();
  });

  it("renders navigation container", () => {
    usePathname.mockReturnValue("/auth/login");
    render(<AuthHeader />);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });
});
