import { render, screen } from "@testing-library/react";
import { Icon } from "./Icon";

jest.mock("./icons", () => ({
  icons: {
    employees: ({
      className,
      style,
    }: {
      className?: string;
      style?: React.CSSProperties;
    }) => (
      <svg data-testid="employees-icon" className={className} style={style} />
    ),
    search: ({
      className,
      style,
    }: {
      className?: string;
      style?: React.CSSProperties;
    }) => <svg data-testid="search-icon" className={className} style={style} />,
  },
}));

describe("Icon", () => {
  it("renders icon component", () => {
    render(<Icon name="employees" />);
    expect(screen.getByTestId("employees-icon")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<Icon name="employees" className="custom" />);
    expect(screen.getByTestId("employees-icon")).toHaveClass("custom");
  });

  it("applies default size", () => {
    render(<Icon name="employees" />);
    expect(screen.getByTestId("employees-icon")).toHaveStyle({
      width: "20px",
      height: "20px",
    });
  });

  it("applies custom size", () => {
    render(<Icon name="employees" size={40} />);
    expect(screen.getByTestId("employees-icon")).toHaveStyle({
      width: "40px",
      height: "40px",
    });
  });

  it("renders another icon", () => {
    render(<Icon name="search" />);
    expect(screen.getByTestId("search-icon")).toBeInTheDocument();
  });
});
