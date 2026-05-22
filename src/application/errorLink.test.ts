import { Observable } from "@apollo/client";
import { errorLink } from "./errorLink";
import { refreshToken } from "./refreshToken";

jest.mock("@apollo/client/link/error", () => ({
  onError: jest.fn((callback) => callback),
}));
jest.mock("./refreshToken", () => ({
  refreshToken: jest.fn(),
}));
jest.mock("@/modules/Tokens", () => ({
  useTokens: {
    getState: jest.fn(),
  },
}));

const { useTokens } = jest.requireMock("@/modules/Tokens");
const getStateMock = useTokens.getState;
const refreshTokenMock = refreshToken as jest.Mock;
type ErrorHandler = (params: {
  error?: Error;
  operation: {
    operationName?: string;
    setContext?: (
      callback: (context: { headers?: Record<string, string> }) => unknown,
    ) => void;
  };
  forward: jest.Mock;
}) => unknown;

const handler = errorLink as unknown as ErrorHandler;

describe("errorLink", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    getStateMock.mockReturnValue({
      accessToken: "token",
      setAccessToken: jest.fn(),
      setRefreshToken: jest.fn(),
    });
  });

  it("returns undefined for non Unauthorized error", () => {
    const result = handler({
      error: new Error("Other error"),
      operation: {},
      forward: jest.fn(),
    });
    expect(result).toBeUndefined();
  });

  it("clears tokens on UpdateToken unauthorized error", () => {
    const setAccessToken = jest.fn();
    const setRefreshToken = jest.fn();
    getStateMock.mockReturnValue({
      setAccessToken,
      setRefreshToken,
    });

    handler({
      error: new Error("Unauthorized"),
      operation: {
        operationName: "UpdateToken",
      },
      forward: jest.fn(),
    });
    expect(setAccessToken).toHaveBeenCalledWith(null);
    expect(setRefreshToken).toHaveBeenCalledWith(null);
  });

  it("retries request after successful refresh", async () => {
    refreshTokenMock.mockResolvedValue(undefined);
    const subscribeMock = jest.fn();
    const forward = jest.fn(() => ({
      subscribe: subscribeMock,
    }));
    const setContext = jest.fn();
    const observable = handler({
      error: new Error("Unauthorized"),
      operation: {
        operationName: "Test",
        setContext,
      },
      forward,
    });
    expect(observable).toBeInstanceOf(Observable);
    (observable as Observable<unknown>).subscribe({});
    await Promise.resolve();
    expect(refreshTokenMock).toHaveBeenCalled();
    expect(setContext).toHaveBeenCalled();
    expect(forward).toHaveBeenCalled();
  });

  it("clears tokens when refreshToken fails", async () => {
    refreshTokenMock.mockRejectedValue(new Error("Refresh failed"));
    const setAccessToken = jest.fn();
    const setRefreshToken = jest.fn();
    getStateMock.mockReturnValue({
      setAccessToken,
      setRefreshToken,
    });
    const observer = {
      error: jest.fn(),
    };
    const observable = handler({
      error: new Error("Unauthorized"),
      operation: {
        operationName: "Test",
        setContext: jest.fn(),
      },
      forward: jest.fn(),
    });
    (observable as Observable<unknown>).subscribe(observer);
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(setAccessToken).toHaveBeenCalledWith(null);
    expect(setRefreshToken).toHaveBeenCalledWith(null);
    expect(observer.error).toHaveBeenCalledWith(new Error("Unauthorized"));
  });

  it("adds authorization header during retry", async () => {
    refreshTokenMock.mockResolvedValue(undefined);
    const setContext = jest.fn();
    const forward = jest.fn(() => ({
      subscribe: jest.fn(),
    }));
    const observable = handler({
      error: new Error("Unauthorized"),
      operation: {
        operationName: "Test",
        setContext,
      },
      forward,
    });
    (observable as Observable<unknown>).subscribe({});
    await Promise.resolve();
    const callback = setContext.mock.calls[0][0];
    expect(
      callback({
        headers: {
          test: "value",
        },
      }),
    ).toEqual({
      headers: {
        test: "value",
        Authorization: "Bearer token",
      },
    });
  });
  it("sets empty authorization header when token missing", async () => {
    refreshTokenMock.mockResolvedValue(undefined);
    getStateMock.mockReturnValue({
      accessToken: "",
      setAccessToken: jest.fn(),
      setRefreshToken: jest.fn(),
    });
    const setContext = jest.fn();
    const observable = handler({
      error: new Error("Unauthorized"),
      operation: {
        operationName: "Test",
        setContext,
      },
      forward: jest.fn(() => ({
        subscribe: jest.fn(),
      })),
    });
    (observable as Observable<unknown>).subscribe({});
    await Promise.resolve();
    const callback = setContext.mock.calls[0][0];
    expect(
      callback({
        headers: {},
      }),
    ).toEqual({
      headers: {
        Authorization: "",
      },
    });
  });
});
