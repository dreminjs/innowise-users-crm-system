import { render, screen } from "@testing-library/react";
import { SkillsPage } from "./SkillsPage";

jest.mock("../ui/Skills/Skills", () => ({
  Skills: () => <div data-testid="mock-skills-component">Mocked Skills</div>,
}));

jest.mock("./SkillsPage.module.css", () => ({
  page: "mocked-page-class",
}));

describe("SkillsPage Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the page wrapper with the correct CSS class", () => {
    const { container } = render(<SkillsPage />);

    expect(container.firstChild).toHaveClass("mocked-page-class");
  });

  it("should render the Skills component", () => {
    render(<SkillsPage />);

    expect(screen.getByTestId("mock-skills-component")).toBeInTheDocument();
  });
});
