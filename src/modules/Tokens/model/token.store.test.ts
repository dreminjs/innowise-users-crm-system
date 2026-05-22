import { act } from "@testing-library/react";
import { useTokens } from "./token.store";

describe("useTokens", () => {
  beforeEach(() => {
    localStorage.clear();

    act(() => {
      useTokens.setState({
        accessToken: null,
        refreshToken: null,
      });
    });
  });

  it("has initial state", () => {
    const state = useTokens.getState();
    expect(state.accessToken).toBeNull();
    expect(state.refreshToken).toBeNull();
  });

  it("sets access token", () => {
    act(() => {
      useTokens.getState().setAccessToken("access-token");
    });
    expect(useTokens.getState().accessToken).toBe("access-token");
  });

  it("sets refresh token", () => {
    act(() => {
      useTokens.getState().setRefreshToken("refresh-token");
    });
    expect(useTokens.getState().refreshToken).toBe("refresh-token");
  });

  it("deletes access token", () => {
    act(() => {
      useTokens.getState().setAccessToken("token");
    });
    expect(useTokens.getState().accessToken).toBe("token");
    act(() => {
      useTokens.getState().deleteAccessToken();
    });
    expect(useTokens.getState().accessToken).toBeNull();
  });

  it("keeps refresh token after deleting access token", () => {
    act(() => {
      useTokens.getState().setAccessToken("access");
      useTokens.getState().setRefreshToken("refresh");
    });

    act(() => {
      useTokens.getState().deleteAccessToken();
    });
    expect(useTokens.getState().accessToken).toBeNull();
    expect(useTokens.getState().refreshToken).toBe("refresh");
  });

  it("updates existing access token", () => {
    act(() => {
      useTokens.getState().setAccessToken("old-token");
      useTokens.getState().setAccessToken("new-token");
    });
    expect(useTokens.getState().accessToken).toBe("new-token");
  });

  it("updates existing refresh token", () => {
    act(() => {
      useTokens.getState().setRefreshToken("old-refresh");
      useTokens.getState().setRefreshToken("new-refresh");
    });
    expect(useTokens.getState().refreshToken).toBe("new-refresh");
  });

  it("allows setting access token to null", () => {
    act(() => {
      useTokens.getState().setAccessToken(null);
    });
    expect(useTokens.getState().accessToken).toBeNull();
  });
  it("allows setting refresh token to null", () => {
    act(() => {
      useTokens.getState().setRefreshToken(null);
    });
    expect(useTokens.getState().refreshToken).toBeNull();
  });
});
