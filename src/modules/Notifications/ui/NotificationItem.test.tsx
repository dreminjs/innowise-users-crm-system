import { render, screen } from "@testing-library/react";
import { act } from "react";
import { NotificationItem } from "./NotificationItem";

describe("NotificationItem", () => {
  const onRemoveMock = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  it("should render message", () => {
    render(
      <NotificationItem
        id="1"
        type="success"
        message="Success message"
        onRemove={onRemoveMock}
      />,
    );
    expect(screen.getByText("Success message")).toBeInTheDocument();
  });
  it("should call onRemove after timeout", () => {
    render(
      <NotificationItem
        id="1"
        type="success"
        message="Success"
        onRemove={onRemoveMock}
      />,
    );
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(onRemoveMock).toHaveBeenCalledWith("1");
  });
  it("should not call onRemove before timeout", () => {
    render(
      <NotificationItem
        id="1"
        type="success"
        message="Success"
        onRemove={onRemoveMock}
      />,
    );
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    expect(onRemoveMock).not.toHaveBeenCalled();
  });
  it("should render success type", () => {
    const { container } = render(
      <NotificationItem
        id="1"
        type="success"
        message="Success"
        onRemove={onRemoveMock}
      />,
    );
    expect(container.firstChild).toHaveClass("notificationItemSuccess");
  });
  it("should render error type", () => {
    const { container } = render(
      <NotificationItem
        id="1"
        type="error"
        message="Error"
        onRemove={onRemoveMock}
      />,
    );
    expect(container.firstChild).toHaveClass("notificationItemError");
  });
});
