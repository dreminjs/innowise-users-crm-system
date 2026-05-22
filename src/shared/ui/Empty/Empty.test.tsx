import { render, screen } from "@testing-library/react";
import { Empty } from "./Empty";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

describe("Empty", () => {
  it("renders translated text", () => {
    render(<Empty />);
    expect(screen.getByText("empty")).toBeInTheDocument();
  });

  it("renders empty container", () => {
    const { container } = render(<Empty />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders div element", () => {
    render(<Empty />);
    expect(screen.getByText("empty").tagName).toBe("DIV");
  });
});
