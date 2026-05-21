import { render, screen } from "@testing-library/react";
import { UserAction } from "./UserAction";

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => <a href={href}>{children}</a>,
}));

describe("UserAction", () => {
  it("should render children", () => {
    render(<UserAction to="/users/1">Profile</UserAction>);
    expect(screen.getByText("Profile")).toBeInTheDocument();
  });
  it("should render correct link", () => {
    render(<UserAction to="/users/1">Profile</UserAction>);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/users/1");
  });
});
