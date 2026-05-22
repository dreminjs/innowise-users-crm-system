import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AddItemModal } from "@/shared/ui/AddItemModal/index";

jest.mock("@chakra-ui/react", () => ({
  Dialog: {
    Root: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
    Backdrop: () => <div data-testid="backdrop" />,
    Positioner: ({
      children,
      className,
    }: {
      children: React.ReactNode;
      className?: string;
    }) => <div className={className}>{children}</div>,

    Content: ({
      children,
      className,
    }: {
      children: React.ReactNode;
      className?: string;
    }) => <div className={className}>{children}</div>,
    Header: ({
      children,
      className,
    }: {
      children: React.ReactNode;
      className?: string;
    }) => <div className={className}>{children}</div>,
    Title: ({
      children,
      className,
    }: {
      children: React.ReactNode;
      className?: string;
    }) => <h2 className={className}>{children}</h2>,
    CloseTrigger: ({ onClick }: { onClick?: () => void }) => (
      <button onClick={onClick}>close</button>
    ),
    Body: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
  },
}));

describe("AddItemModal", () => {
  const toggleActionMock = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("renders title", () => {
    render(
      <AddItemModal open title="Create User" toggleAction={toggleActionMock}>
        content
      </AddItemModal>,
    );
    expect(screen.getByText("Create User")).toBeInTheDocument();
  });
  it("renders children", () => {
    render(
      <AddItemModal open title="Modal" toggleAction={toggleActionMock}>
        <div>modal content</div>
      </AddItemModal>,
    );
    expect(screen.getByText("modal content")).toBeInTheDocument();
  });
  it("renders close button", () => {
    render(
      <AddItemModal open title="Modal" toggleAction={toggleActionMock}>
        content
      </AddItemModal>,
    );
    expect(
      screen.getByRole("button", {
        name: /close/i,
      }),
    ).toBeInTheDocument();
  });
  it("calls toggleAction on close click", async () => {
    render(
      <AddItemModal open title="Modal" toggleAction={toggleActionMock}>
        content
      </AddItemModal>,
    );
    await userEvent.click(
      screen.getByRole("button", {
        name: /close/i,
      }),
    );
    expect(toggleActionMock).toHaveBeenCalled();
  });
  it("renders backdrop", () => {
    render(
      <AddItemModal open title="Modal" toggleAction={toggleActionMock}>
        content
      </AddItemModal>,
    );
    expect(screen.getByTestId("backdrop")).toBeInTheDocument();
  });
});
