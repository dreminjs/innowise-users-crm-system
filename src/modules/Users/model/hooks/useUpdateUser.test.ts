import { act, renderHook } from "@testing-library/react";
import { useUpdateUser } from "./useUpdateUser";
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

describe("useUpdateUser", () => {
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

  it("should call update user mutation", async () => {
    (useMutation as unknown as jest.Mock).mockReturnValue([
      mutateMock,
      {
        loading: false,
        error: null,
      },
    ]);

    const { result } = renderHook(() => useUpdateUser("1"));

    await act(async () => {
      await result.current.onSubmit({
        departmentId: "10",
        positionId: "20",
      });
    });

    expect(mutateMock).toHaveBeenCalledWith({
      variables: {
        dto: {
          departmentId: "10",
          positionId: "20",
          userId: "1",
        },
      },
    });
  });

  it("should not call mutation without user id", async () => {
    (useMutation as unknown as jest.Mock).mockReturnValue([
      mutateMock,
      {
        loading: false,
        error: null,
      },
    ]);

    const { result } = renderHook(() => useUpdateUser(""));

    await act(async () => {
      await result.current.onSubmit({
        departmentId: "10",
        positionId: "20",
      });
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

    const { result } = renderHook(() => useUpdateUser("1"));

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

    const { result } = renderHook(() => useUpdateUser("1"));

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

    renderHook(() => useUpdateUser("1"));

    act(() => {
      options.onCompleted();
    });

    expect(addNotificationMock).toHaveBeenCalledWith({
      message: "userUpdatedSuccessfully",
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

    renderHook(() => useUpdateUser("1"));

    const error = new Error("Update user failed");

    act(() => {
      options.onError(error);
    });

    expect(addNotificationMock).toHaveBeenCalledWith({
      message: "Update user failed",
      type: "error",
    });
  });
});
