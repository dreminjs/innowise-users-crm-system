import { act, renderHook } from "@testing-library/react";
import { useSignup } from "./useSignup";
import { useMutation } from "@apollo/client/react";
import { useNotification } from "@/modules/Notifications";
import { useTokens } from "@/modules/Tokens";
import { useUserStore } from "@/application/store/user.store";
import { useRouter } from "next/navigation";
jest.mock("@apollo/client/react", () => ({
  useMutation: jest.fn(),
}));
jest.mock("@/modules/Notifications", () => ({
  useNotification: jest.fn(),
}));
jest.mock("@/modules/Tokens", () => ({
  useTokens: jest.fn(),
}));
jest.mock("@/application/store/user.store", () => ({
  useUserStore: jest.fn(),
}));
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));
describe("useSignup", () => {
  const mutateMock = jest.fn();
  const addNotificationMock = jest.fn();
  const setAccessTokenMock = jest.fn();
  const setRefreshTokenMock = jest.fn();
  const setUserMock = jest.fn();
  const pushMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as unknown as jest.Mock).mockReturnValue({
      push: pushMock,
    });
    (useNotification as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        addNotification: addNotificationMock,
      }),
    );
    (useTokens as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        setAccessToken: setAccessTokenMock,
        setRefreshToken: setRefreshTokenMock,
      }),
    );
    (useUserStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        setUser: setUserMock,
      }),
    );
  });
  it("should call signup mutation on submit", () => {
    (useMutation as unknown as jest.Mock).mockReturnValue([
      mutateMock,
      {
        loading: false,
        error: null,
      },
    ]);
    const { result } = renderHook(() => useSignup());
    const dto = {
      email: "test@test.com",
      password: "123456",
    };
    act(() => {
      result.current.onSubmit(dto);
    });
    expect(mutateMock).toHaveBeenCalledWith({
      variables: {
        dto,
      },
    });
  });
  it("should set tokens and user on completed", () => {
    let options: {
      onCompleted: (data: any) => void;
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
    renderHook(() => useSignup());
    const data = {
      signup: {
        access_token: "access-token",
        refresh_token: "refresh-token",
        user: {
          id: "1",
          email: "test@test.com",
          role: "ADMIN",
          position_name: "Developer",
        },
      },
    };
    act(() => {
      options.onCompleted(data);
    });
    expect(setAccessTokenMock).toHaveBeenCalledWith("access-token");
    expect(setRefreshTokenMock).toHaveBeenCalledWith("refresh-token");
    expect(setUserMock).toHaveBeenCalledWith({
      role: "ADMIN",
      userId: "1",
      email: "test@test.com",
      position_name: "Developer",
    });
    expect(pushMock).toHaveBeenCalledWith("/users");
  });
  it("should show error notification", () => {
    let options: {
      onCompleted: (data: any) => void;
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
    renderHook(() => useSignup());
    const error = new Error("Signup failed");
    act(() => {
      options.onError(error);
    });
    expect(addNotificationMock).toHaveBeenCalledWith({
      message: "Signup failed",
      type: "error",
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
    const { result } = renderHook(() => useSignup());
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
    const { result } = renderHook(() => useSignup());
    expect(result.current.error).toBe(error);
  });
});
