import { render, screen } from "@testing-library/react";
import { AuthButtons } from "./AuthButtons";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

describe("AuthButtons", () => {
  it("should render submit label", () => {
    render(
      <AuthButtons
        submitLabel="Submit"
    linkLabel="Forgot password"
    linkUrl="/forgot-password"
    isLoading={false}
    />,
  );

    expect(screen.getByText("Submit")).toBeInTheDocument();
  });

  it("should render link label", () => {
    render(
      <AuthButtons
        submitLabel="Submit"
    linkLabel="Forgot password"
    linkUrl="/forgot-password"
    isLoading={false}
    />,
  );

    expect(screen.getByText("Forgot password")).toBeInTheDocument();
  });

  it("should disable button when loading", () => {
    render(
      <AuthButtons
        submitLabel="Submit"
    linkLabel="Forgot password"
    linkUrl="/forgot-password"
    isLoading={true}
    />,
  );

    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("should show loading text", () => {
    render(
      <AuthButtons
        submitLabel="Submit"
    linkLabel="Forgot password"
    linkUrl="/forgot-password"
    isLoading={true}
    />,
  );

    expect(screen.getByText("loading")).toBeInTheDocument();
  });
});