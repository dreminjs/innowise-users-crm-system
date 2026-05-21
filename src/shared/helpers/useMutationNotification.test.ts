import { renderHook } from "@testing-library/react";
import { useMutationNotification } from "./useMutationNotification";
import { useNotification } from "@/modules/Notifications";

jest.mock("@/modules/Notifications", () => ({
  useNotification: jest.fn(),
}));

describe("useMutationNotification", () => {
  const addNotificationMock = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
    (useNotification as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        addNotification: addNotificationMock,
      }),
    );
  });
  it("should handle success", () => {
    const { result } = renderHook(() =>
      useMutationNotification({
        successMessage: "Success",
        errorMessage: "Error",
      }),
    );
    result.current.onCompleted();
    expect(addNotificationMock).toHaveBeenCalledWith({
      type: "success",
      message: "Success",
    });
  });

  it("should handle error", () => {
    const { result } = renderHook(() =>
      useMutationNotification({
        successMessage: "Success",
        errorMessage: "Error",
      }),
    );
    result.current.onError();
    expect(addNotificationMock).toHaveBeenCalledWith({
      type: "error",
      message: "Error",
    });
  });
  it("should return handlers", () => {
    const { result } = renderHook(() =>
      useMutationNotification({
        successMessage: "Success",
        errorMessage: "Error",
      }),
    );
    expect(result.current).toHaveProperty("onCompleted");
    expect(result.current).toHaveProperty("onError");
  });
});
