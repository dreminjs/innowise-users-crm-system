import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RemoveItemButton } from "./RemoveItemButton";

jest.mock("@/shared/ui/Icon/Icon", () => ({
  Icon: ({ name }: { name: string }) => <div data-testid="icon">{name}</div>,
}));

describe("RemoveItemButton", () => {
  const onClickMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders label", () => {
    render(<RemoveItemButton label="Remove" onClick={onClickMock} />);
    expect(screen.getByText("Remove")).toBeInTheDocument();
  });

  it("renders icon", () => {
    render(<RemoveItemButton label="Remove" onClick={onClickMock} />);
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("renders trash icon", () => {
    render(<RemoveItemButton label="Remove" onClick={onClickMock} />);
    expect(screen.getByText("trash")).toBeInTheDocument();
  });

  it("calls onClick", async () => {
    render(<RemoveItemButton label="Remove" onClick={onClickMock} />);
    await userEvent.click(screen.getByRole("button"));
    expect(onClickMock).toHaveBeenCalled();
  });

  it("renders button element", () => {
    render(<RemoveItemButton label="Delete item" onClick={onClickMock} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
