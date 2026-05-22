import { render, screen } from "@testing-library/react";
import { Loading } from "./Loading";

jest.mock("@chakra-ui/react", () => ({
  Spinner: ({ className }: { className?: string }) => (
    <div data-testid="spinner" className={className}>
      loading
    </div>
  ),
}));

describe("Loading", () => {
  it("renders spinner", () => {
    render(<Loading />);
    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  it("renders loading text", () => {
    render(<Loading />);
    expect(screen.getByText("loading")).toBeInTheDocument();
  });

  it("applies className", () => {
    render(<Loading />);
    expect(screen.getByTestId("spinner")).toHaveClass("loading");
  });
});
