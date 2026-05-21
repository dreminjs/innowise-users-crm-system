import { act, renderHook } from "@testing-library/react";
import { useDeleteAvatar } from "./useDeleteAvatar";
import { useMutation } from "@apollo/client/react";
import { useTranslations } from "next-intl";
import { useNotification } from "@/modules/Notifications";
import { useUserStore } from "@/application/store/user.store";

jest.mock("@apollo/client/react", () => ({
  useMutation: jest.fn(),
}));

jest.mock("next-intl", () => ({
  useTranslations: jest.fn(),
}));

jest.mock("@/modules/Notifications", () => ({
  useNotification: jest.fn(),
}));

jest.mock("@/application/store/user.store", () => ({
  useUserStore: jest.fn(),
}));

describe("useDeleteAvatar", () => {
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

    (useUserStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        userId: "1",
      }),
    );
  });

  it("should call delete avatar mutation", () => {
    (useMutation as unknown as jest.Mock).mockReturnValue([
      mutateMock,
      {
        loading: false,
        error: null,
      },
    ]);

    const { result } = renderHook(() => useDeleteAvatar());

    act(() => {
      result.current.deleteAvatar();
    });

    expect(mutateMock).toHaveBeenCalledWith({
      variables: {
        dto: {
          userId: "1",
        },
      },
    });
  });

  it("should not call mutation without user id", () => {
    (useUserStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        userId: null,
      }),
    );

    (useMutation as unknown as jest.Mock).mockReturnValue([
      mutateMock,
      {
        loading: false,
        error: null,
      },
    ]);

    const { result } = renderHook(() => useDeleteAvatar());

    act(() => {
      result.current.deleteAvatar();
    });

    expect(mutateMock).not.toHaveBeenCalled();
  });

  it("should return loading state", () => {
    (useMutation as unknown as jest.Mock).mockReturnValue([
      mutateMock,
      {
        loading: true,
        error: null,
      },
    ]);

    const { result } = renderHook(() => useDeleteAvatar());

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

    const { result } = renderHook(() => useDeleteAvatar());

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

    renderHook(() => useDeleteAvatar());

    act(() => {
      options.onCompleted();
    });

    expect(addNotificationMock).toHaveBeenCalledWith({
      message: "avatarDeletedSuccessfully",
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

    renderHook(() => useDeleteAvatar());

    const error = new Error("Delete avatar failed");

    act(() => {
      options.onError(error);
    });

    expect(addNotificationMock).toHaveBeenCalledWith({
      message: "Delete avatar failed",
      type: "error",
    });
  });
});
