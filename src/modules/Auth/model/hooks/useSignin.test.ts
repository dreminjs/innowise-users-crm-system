import { act, renderHook } from "@testing-library/react";
import { useSignin } from "./useSignin";
import { useLazyQuery } from "@apollo/client/react";
import { useNotification } from "@/modules/Notifications";
import { useTokens } from "@/modules/Tokens";
import { useUserStore } from "@/application/store/user.store";

jest.mock("@apollo/client/react", () => ({
  useLazyQuery: jest.fn(),
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

describe("useSignin", () => {
  const mutateMock = jest.fn();
  const addNotificationMock = jest.fn();
  const setAccessTokenMock = jest.fn();
  const setRefreshTokenMock = jest.fn();
  const setUserMock = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
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
  it("should call signin mutation on submit", () => {
    (useLazyQuery as unknown as jest.Mock).mockReturnValue([
      mutateMock,
      {
        data: null,
        loading: false,
        error: null,
      },
    ]);
    const { result } = renderHook(() => useSignin());
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
  it("should set tokens and user on success", () => {
    const data = {
      login: {
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

    (useLazyQuery as unknown as jest.Mock).mockReturnValue([
      mutateMock,
      {
        data,
        loading: false,
        error: null,
      },
    ]);
    renderHook(() => useSignin());
    expect(setAccessTokenMock).toHaveBeenCalledWith("access-token");
    expect(setRefreshTokenMock).toHaveBeenCalledWith("refresh-token");
    expect(setUserMock).toHaveBeenCalledWith({
      role: "ADMIN",
      userId: "1",
      email: "test@test.com",
      position_name: "Developer",
    });
  });
  it("should show error notification", () => {
    const error = new Error("Invalid credentials");
    (useLazyQuery as unknown as jest.Mock).mockReturnValue([
      mutateMock,
      {
        data: null,
        loading: false,
        error,
      },
    ]);
    renderHook(() => useSignin());
    expect(addNotificationMock).toHaveBeenCalledWith({
      message: "Invalid credentials",
      type: "error",
    });
  });
  it("should return loading state", () => {
    (useLazyQuery as unknown as jest.Mock).mockReturnValue([
      mutateMock,
      {
        data: null,
        loading: true,
        error: null,
      },
    ]);
    const { result } = renderHook(() => useSignin());
    expect(result.current.loading).toBe(true);
  });
  it("should return error state", () => {
    const error = new Error("Test error");
    (useLazyQuery as unknown as jest.Mock).mockReturnValue([
      mutateMock,
      {
        data: null,
        loading: false,
        error,
      },
    ]);
    const { result } = renderHook(() => useSignin());
    expect(result.current.error).toBe(error);
  });
  it("should return data", () => {
    const data = {
      login: {
        access_token: "token",
        refresh_token: "refresh-token",
        user: {
          id: "1",
          email: "test@test.com",
          role: "ADMIN",
          position_name: "Developer",
        },
      },
    };
    (useLazyQuery as unknown as jest.Mock).mockReturnValue([
      mutateMock,
      {
        data,
        loading: false,
        error: null,
      },
    ]);
    const { result } = renderHook(() => useSignin());
    expect(result.current.data).toBe(data);
  });
});
