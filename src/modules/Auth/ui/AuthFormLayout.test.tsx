import { render, screen } from "@testing-library/react";
import { AuthFormLayout } from "./AuthFormLayout";

describe("AuthFormLayout", () => {
  it("should render title", () => {
    render(
      <AuthFormLayout title="Welcome" subtitle="Sign in">
        <div>Children</div>
      </AuthFormLayout>,
    );

    expect(screen.getByText("Welcome")).toBeInTheDocument();
  });

  it("should render subtitle", () => {
    render(
      <AuthFormLayout title="Welcome" subtitle="Sign in">
        <div>Children</div>
      </AuthFormLayout>,
    );

    expect(screen.getByText("Sign in")).toBeInTheDocument();
  });

  it("should render children", () => {
    render(
      <AuthFormLayout title="Welcome" subtitle="Sign in">
        <div>Children</div>
      </AuthFormLayout>,
    );

    expect(screen.getByText("Children")).toBeInTheDocument();
  });
});
