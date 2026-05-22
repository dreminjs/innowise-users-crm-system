import { act } from "@testing-library/react";
import { useNotification } from "./notification.store";

describe("useNotification", () => {
  beforeEach(() => {
    useNotification.setState({
      notifications: [],
    });
    jest.spyOn(crypto, "randomUUID").mockReturnValue("mock-id");
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it("should add notification", () => {
    act(() => {
      useNotification.getState().addNotification({
        type: "success",
        message: "Success",
      });
    });
    expect(useNotification.getState().notifications).toEqual([
      {
        id: "mock-id",
        type: "success",
        message: "Success",
      },
    ]);
  });
  it("should remove notification", () => {
    act(() => {
      useNotification.setState({
        notifications: [
          {
            id: "1",
            type: "success",
            message: "Success",
          },
          {
            id: "2",
            type: "error",
            message: "Error",
          },
        ],
      });
    });
    act(() => {
      useNotification.getState().removeNotification("1");
    });
    expect(useNotification.getState().notifications).toEqual([
      {
        id: "2",
        type: "error",
        message: "Error",
      },
    ]);
  });
  it("should initialize with empty notifications", () => {
    expect(useNotification.getState().notifications).toEqual([]);
  });
  it("should generate unique id", () => {
    act(() => {
      useNotification.getState().addNotification({
        type: "success",
        message: "Test",
      });
    });
    expect(crypto.randomUUID).toHaveBeenCalled();
  });
});
