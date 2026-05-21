import { render, screen } from "@testing-library/react";
import { UserInfo } from "./UserInfo";

describe("UserInfo", () => {
  it("should render full name", () => {
    render(
      <UserInfo
        fullName="John Doe"
        email="john@test.com"
        hiredDate="2026-01-01"
      />,
    );
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });
  it("should render email", () => {
    render(
      <UserInfo
        fullName="John Doe"
        email="john@test.com"
        hiredDate="2026-01-01"
      />,
    );
    expect(screen.getByText("john@test.com")).toBeInTheDocument();
  });
  it("should render hired date", () => {
    render(
      <UserInfo
        fullName="John Doe"
        email="john@test.com"
        hiredDate="2026-01-01"
      />,
    );
    expect(screen.getByText("2026-01-01")).toBeInTheDocument();
  });
});
