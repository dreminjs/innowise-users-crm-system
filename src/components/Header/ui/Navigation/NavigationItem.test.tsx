import { render, screen } from "@testing-library/react";
import { NavigationItem } from "./NavigationItem";

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => {
    return <a href={href}>{children}</a>;
  },
}));

jest.mock("./Navigation.module.css", () => ({
  navigationItem: "navigationItem",
  navigationItemActive: "navigationItemActive",
}));

jest.mock("clsx", () => ({
  __esModule: true,
  default: (...classes: Array<string | false | undefined>) =>
    classes.filter(Boolean).join(" "),
}));

describe("NavigationItem", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("renders label", () => {
    render(
      <NavigationItem href="/dashboard" label="dashboard" isActive={false} />,
    );
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });

  it("renders link href", () => {
    render(<NavigationItem href="/users" label="users" isActive={false} />);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/users");
  });

  it("adds active class", () => {
    const { container } = render(
      <NavigationItem href="/dashboard" label="dashboard" isActive />,
    );
    expect(container.firstChild).toHaveClass("navigationItemActive");
  });

  it("does not add active class when inactive", () => {
    const { container } = render(
      <NavigationItem href="/dashboard" label="dashboard" isActive={false} />,
    );
    expect(container.firstChild).not.toHaveClass("navigationItemActive");
  });

  it("capitalizes first letter", () => {
    render(<NavigationItem href="/profile" label="profile" isActive={false} />);
    expect(screen.getByText("Profile")).toBeInTheDocument();
  });

  it("renders navigation item class", () => {
    const { container } = render(
      <NavigationItem href="/profile" label="profile" isActive={false} />,
    );
    expect(container.firstChild).toHaveClass("navigationItem");
  });
});
