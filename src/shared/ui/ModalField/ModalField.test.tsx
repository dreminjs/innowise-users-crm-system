import { render, screen } from "@testing-library/react";
import { ModalField } from "./ModalField";

describe("ModalField", () => {
  it("renders label", () => {
    render(
      <ModalField label="Name">
        <input />
      </ModalField>,
    );
    expect(screen.getByText("Name")).toBeInTheDocument();
  });

  it("renders children", () => {
    render(
      <ModalField label="Name">
        <input data-testid="input" />
      </ModalField>,
    );
    expect(screen.getByTestId("input")).toBeInTheDocument();
  });

  it("renders error message", () => {
    render(
      <ModalField label="Name" error="Required">
        <input />
      </ModalField>,
    );
    expect(screen.getByText("Required")).toBeInTheDocument();
  });

  it("applies active class", () => {
    const { container } = render(
      <ModalField label="Name" active>
        <input />
      </ModalField>,
    );
    expect(container.querySelector(".active")).toBeInTheDocument();
  });

  it("applies textarea class", () => {
    const { container } = render(
      <ModalField label="Description" textarea>
        <textarea />
      </ModalField>,
    );
    expect(container.querySelector(".textarea")).toBeInTheDocument();
  });

  it("applies errorBorder class", () => {
    const { container } = render(
      <ModalField label="Name" error="Error">
        <input />
      </ModalField>,
    );
    expect(container.querySelector(".errorBorder")).toBeInTheDocument();
  });

  it("does not render error when error is missing", () => {
    render(
      <ModalField label="Name">
        <input />
      </ModalField>,
    );
    expect(screen.queryByText("Required")).not.toBeInTheDocument();
  });

  it("renders textarea child", () => {
    render(
      <ModalField label="Description" textarea>
        <textarea data-testid="textarea" />
      </ModalField>,
    );
    expect(screen.getByTestId("textarea")).toBeInTheDocument();
  });
});
