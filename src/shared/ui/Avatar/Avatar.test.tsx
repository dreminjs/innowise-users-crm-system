import { render, screen } from "@testing-library/react";
import { Avatar } from "./Avatar";

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} />
  ),
}));

describe("Avatar", () => {
  it("renders avatar image when avatar exists", () => {
    render(<Avatar avatar="/avatar.png" firstName="John" />);
    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", "/avatar.png");
    expect(image).toHaveAttribute("alt", "John");
  });

  it("renders initials when avatar does not exist", () => {
    render(<Avatar firstName="John" lastName="Doe" />);
    expect(screen.getByText(/J/i)).toBeInTheDocument();
    expect(screen.getByText(/D/i)).toBeInTheDocument();
  });

  it("renders only first name initial", () => {
    render(<Avatar firstName="John" />);

    expect(screen.getByText(/J/i)).toBeInTheDocument();
  });

  it("renders only last name initial", () => {
    render(<Avatar lastName="Doe" />);
    expect(screen.getByText(/D/i)).toBeInTheDocument();
  });
  it("renders empty fallback when names are missing", () => {
    const { container } = render(<Avatar />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("uses default alt text when firstName is missing", () => {
    render(<Avatar avatar="/avatar.png" />);
    expect(screen.getByRole("img")).toHaveAttribute("alt", "User");
  });
});
