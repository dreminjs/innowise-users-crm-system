import { act, renderHook } from "@testing-library/react";
import { useForgotPassword } from "./useForgotPassword";
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

describe("useForgotPassword", () => {
  const forgotPasswordMock = jest.fn();
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
  it("should call forgot password mutation on submit", () => {
    (useMutation as unknown as jest.Mock).mockReturnValue([
      forgotPasswordMock,
      {
        loading: false,
        error: null,
      },
    ]);
    const { result } = renderHook(() => useForgotPassword());
    const data = {
      email: "test@test.com",
    };
    act(() => {
      result.current.onSubmit(data);
    });
    expect(forgotPasswordMock).toHaveBeenCalledWith({
      variables: {
        dto: data,
      },
    });
  });
  it("should return loading state", () => {
    (useMutation as unknown as jest.Mock).mockReturnValue([
      forgotPasswordMock,
      {
        loading: true,
        error: null,
      },
    ]);
    const { result } = renderHook(() => useForgotPassword());
    expect(result.current.loading).toBe(true);
  });
  it("should return error state", () => {
    const error = new Error("Test error");

    (useMutation as unknown as jest.Mock).mockReturnValue([
      forgotPasswordMock,
      {
        loading: false,
        error,
      },
    ]);
    const { result } = renderHook(() => useForgotPassword());
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
          forgotPasswordMock,
          {
            loading: false,
            error: null,
          },
        ];
      },
    );
    renderHook(() => useForgotPassword());
    act(() => {
      options.onCompleted();
    });
    expect(addNotificationMock).toHaveBeenCalledWith({
      message: "checkYourEmail",
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
          forgotPasswordMock,
          {
            loading: false,
            error: null,
          },
        ];
      },
    );
    renderHook(() => useForgotPassword());
    const error = new Error("Something went wrong");
    act(() => {
      options.onError(error);
    });
    expect(addNotificationMock).toHaveBeenCalledWith({
      message: "Something went wrong",
      type: "error",
    });
  });
});
