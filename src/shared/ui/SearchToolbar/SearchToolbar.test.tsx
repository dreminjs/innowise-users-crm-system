import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SearchToolbar } from "./SearchToolbar";

describe("SearchToolbar", () => {
  it("renders input with the provided value", () => {
    render(<SearchToolbar value="hello" changeAction={() => {}} />);
    expect(screen.getByRole("textbox")).toHaveValue("hello");
  });

  it("renders the provided placeholder", () => {
    render(
      <SearchToolbar
        value=""
        changeAction={() => {}}
        placeholder="Search CVs"
      />,
    );
    expect(screen.getByPlaceholderText("Search CVs")).toBeInTheDocument();
  });

  it("calls changeAction with the new value on input", async () => {
    const handleChange = jest.fn();
    render(<SearchToolbar value="" changeAction={handleChange} />);
    await userEvent.type(screen.getByRole("textbox"), "a");
    expect(handleChange).toHaveBeenCalledWith("a");
  });

  it("renders the button when both buttonLabel and createAction are provided", () => {
    render(
      <SearchToolbar
        value=""
        changeAction={() => {}}
        buttonLabel="Add CV"
        createAction={() => {}}
      />,
    );
    expect(screen.getByRole("button", { name: /add cv/i })).toBeInTheDocument();
  });

  it("does not render the button when buttonLabel is missing", () => {
    render(
      <SearchToolbar
        value=""
        changeAction={() => {}}
        createAction={() => {}}
      />,
    );
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("does not render the button when createAction is missing", () => {
    render(
      <SearchToolbar value="" changeAction={() => {}} buttonLabel="Add CV" />,
    );
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("applies the custom className instead of the default one", () => {
    const { container } = render(
      <SearchToolbar value="" changeAction={() => {}} className="custom" />,
    );
    expect(container.firstChild).toHaveClass("custom");
  });
});
