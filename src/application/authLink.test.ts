import { Observable, FetchResult } from "@apollo/client";
import { authLink } from "./authLink";
type ApolloResult = FetchResult<Record<string, unknown>>;
jest.mock("@/modules/Tokens", () => ({
  useTokens: {
    getState: jest.fn(),
  },
}));

const { useTokens } = jest.requireMock("@/modules/Tokens");
const getStateMock = useTokens.getState;
const createObservable = (): Observable<ApolloResult> =>
  new Observable(() => {});

describe("authLink", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("adds authorization header when accessToken exists", () => {
    getStateMock.mockReturnValue({
      accessToken: "token-123",
    });
    const setContext = jest.fn();
    const operation = {
      setContext,
    };
    const forward = jest.fn(() => createObservable());
    authLink.request(operation as never, forward);
    expect(setContext).toHaveBeenCalled();
    const callback = setContext.mock.calls[0][0];
    expect(
      callback({
        headers: {
          test: "header",
        },
      }),
    ).toEqual({
      headers: {
        test: "header",
        Authorization: "Bearer token-123",
      },
    });
  });

  it("adds empty authorization header when accessToken is null", () => {
    getStateMock.mockReturnValue({
      accessToken: null,
    });
    const setContext = jest.fn();
    const operation = {
      setContext,
    };
    const forward = jest.fn(() => createObservable());
    authLink.request(operation as never, forward);
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

  it("preserves existing headers", () => {
    getStateMock.mockReturnValue({
      accessToken: "token",
    });
    const setContext = jest.fn();
    const operation = {
      setContext,
    };
    const forward = jest.fn(() => createObservable());
    authLink.request(operation as never, forward);
    const callback = setContext.mock.calls[0][0];
    expect(
      callback({
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }),
    ).toEqual({
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer token",
      },
    });
  });

  it("calls forward with operation", () => {
    getStateMock.mockReturnValue({
      accessToken: "token",
    });
    const setContext = jest.fn();
    const operation = {
      setContext,
    };
    const forward = jest.fn(() => createObservable());
    authLink.request(operation as never, forward);
    expect(forward).toHaveBeenCalledWith(operation);
  });

  it("returns forward result", () => {
    getStateMock.mockReturnValue({
      accessToken: "token",
    });
    const observable = createObservable();
    const operation = {
      setContext: jest.fn(),
    };
    const forward = jest.fn(() => observable);
    const result = authLink.request(operation as never, forward);
    expect(result).toBe(observable);
  });

  it("works with undefined headers", () => {
    getStateMock.mockReturnValue({
      accessToken: "token",
    });
    const setContext = jest.fn();
    const operation = {
      setContext,
    };
    const forward = jest.fn(() => createObservable());
    authLink.request(operation as never, forward);
    const callback = setContext.mock.calls[0][0];
    expect(callback({})).toEqual({
      headers: {
        Authorization: "Bearer token",
      },
    });
  });

  it("handles empty string token", () => {
    getStateMock.mockReturnValue({
      accessToken: "",
    });
    const setContext = jest.fn();
    const operation = {
      setContext,
    };
    const forward = jest.fn(() => createObservable());
    authLink.request(operation as never, forward);
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
