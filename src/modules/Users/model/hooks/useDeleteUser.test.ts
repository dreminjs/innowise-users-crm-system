import { act, renderHook } from "@testing-library/react";
import { useDeleteUser } from "./useDeleteUser";
import { useMutation } from "@apollo/client/react";
import { useTranslations } from "next-intl";
import { useNotification } from "@/modules/Notifications";

jest.mock("@apollo/client/react", () => ({
  useMutation: jest.fn(),
}));

jest.mock("next-intl", () => ({
  useTranslations: jest.fn(),
}));

jest.mock("@/modules/Notifications", () => ({
  useNotification: jest.fn(),
}));

describe("useDeleteUser", () => {
  const mutateMock = jest.fn();

  const addNotificationMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useTranslations as unknown as jest.Mock).mockReturnValue(
      (key: string) => key,
    );

    (useNotification as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        addNotification: addNotificationMock,
      }),
    );
  });

  it("should call delete user mutation", async () => {
    (useMutation as unknown as jest.Mock).mockReturnValue([
      mutateMock,
      {
        loading: false,
        error: null,
      },
    ]);

    const { result } = renderHook(() => useDeleteUser());

    await act(async () => {
      await result.current.deleteUser("1");
    });

    expect(mutateMock).toHaveBeenCalledWith({
      variables: {
        userId: "1",
      },
    });
  });

  it("should return loading state", () => {
    (useMutation as unknown as jest.Mock).mockReturnValue([
      mutateMock,
      {
        loading: true,
        error: null,
      },
    ]);

    const { result } = renderHook(() => useDeleteUser());

    expect(result.current.loading).toBe(true);
  });

  it("should return error state", () => {
    const error = new Error("Test error");

    (useMutation as unknown as jest.Mock).mockReturnValue([
      mutateMock,
      {
        loading: false,
        error,
      },
    ]);

    const { result } = renderHook(() => useDeleteUser());

    expect(result.current.error).toBe(error);
  });

  it("should show success notification", () => {
    let options: {
      onCompleted: () => void;
      onError: (error: Error) => void;
    };

    (useMutation as unknown as jest.Mock).mockImplementation(
      (_mutation, config) => {
        options = config;

        return [
          mutateMock,
          {
            loading: false,
            error: null,
          },
        ];
      },
    );

    renderHook(() => useDeleteUser());

    act(() => {
      options.onCompleted();
    });

    expect(addNotificationMock).toHaveBeenCalledWith({
      message: "userDeletedSuccessfully",
      type: "success",
    });
  });

  it("should show error notification", () => {
    let options: {
      onCompleted: () => void;
      onError: (error: Error) => void;
    };

    (useMutation as unknown as jest.Mock).mockImplementation(
      (_mutation, config) => {
        options = config;

        return [
          mutateMock,
          {
            loading: false,
            error: null,
          },
        ];
      },
    );

    renderHook(() => useDeleteUser());

    const error = new Error("Delete user failed");

    act(() => {
      options.onError(error);
    });

    expect(addNotificationMock).toHaveBeenCalledWith({
      message: "Delete user failed",
      type: "error",
    });
  });
});
