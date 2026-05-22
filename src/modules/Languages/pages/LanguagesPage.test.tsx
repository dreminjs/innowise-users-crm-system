import { render, screen } from "@testing-library/react";
import { LanguagesPage } from "./LanguagesPage";

jest.mock("../ui/Langauges", () => ({
  Languages: ({ usersLanguagesId }: { usersLanguagesId: string }) => (
    <div>
      Languages:
      {usersLanguagesId}
    </div>
  ),
}));

jest.mock("../ui/Languages.module.css", () => ({
  page: "page",
}));

describe("LanguagesPage", () => {
  it("renders main element", () => {
    const { container } = render(<LanguagesPage userId="1" />);
    expect(container.querySelector("main")).toBeInTheDocument();
  });

  it("applies page class", () => {
    const { container } = render(<LanguagesPage userId="1" />);
    expect(container.querySelector("main")).toHaveClass("page");
  });

  it("renders Languages component when userId exists", () => {
    render(<LanguagesPage userId="123" />);
    expect(screen.getByText("Languages:123")).toBeInTheDocument();
  });

  it("does not render Languages component when userId is empty", () => {
    render(<LanguagesPage userId="" />);
    expect(screen.queryByText(/Languages:/)).not.toBeInTheDocument();
  });
  it("passes correct userId to Languages component", () => {
    render(<LanguagesPage userId="user-55" />);
    expect(screen.getByText("Languages:user-55")).toBeInTheDocument();
  });
  it("renders without crashing with empty userId", () => {
    const { container } = render(<LanguagesPage userId="" />);
    expect(container.querySelector("main")).toBeInTheDocument();
  });
});
