import { refreshToken } from "./refreshToken";

jest.mock("@/modules/Tokens", () => ({
  useTokens: {
    getState: jest.fn(),
  },
}));
const { useTokens } = jest.requireMock("@/modules/Tokens");
const getStateMock = useTokens.getState;

describe("refreshToken", () => {
  const fetchMock = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = fetchMock;
  });

  it("throws error when refresh token is missing", async () => {
    getStateMock.mockReturnValue({
      refreshToken: null,
    });
    await expect(refreshToken()).rejects.toThrow("No refresh token");
  });

  it("calls fetch with correct params", async () => {
    const setAccessToken = jest.fn();
    const setRefreshToken = jest.fn();
    getStateMock.mockReturnValue({
      refreshToken: "refresh-token",
      setAccessToken,
      setRefreshToken,
    });
    fetchMock.mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        data: {
          updateToken: {
            access_token: "new-access",
            refresh_token: "new-refresh",
          },
        },
      }),
    });
    await refreshToken();
    expect(fetchMock).toHaveBeenCalledWith(
      process.env.GRAPHQL_URL || "http://localhost:3001/api/graphql",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer refresh-token",
        },
        body: JSON.stringify({
          query: `
          mutation UpdateToken {
            updateToken {
              access_token
              refresh_token
            }
          }
        `,
        }),
      },
    );
  });
  it("updates tokens after successful refresh", async () => {
    const setAccessToken = jest.fn();
    const setRefreshToken = jest.fn();
    getStateMock.mockReturnValue({
      refreshToken: "refresh-token",
      setAccessToken,
      setRefreshToken,
    });
    fetchMock.mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        data: {
          updateToken: {
            access_token: "new-access",
            refresh_token: "new-refresh",
          },
        },
      }),
    });
    await refreshToken();
    expect(setAccessToken).toHaveBeenCalledWith("new-access");
    expect(setRefreshToken).toHaveBeenCalledWith("new-refresh");
  });

  it("returns new access token", async () => {
    getStateMock.mockReturnValue({
      refreshToken: "refresh-token",
      setAccessToken: jest.fn(),
      setRefreshToken: jest.fn(),
    });

    fetchMock.mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        data: {
          updateToken: {
            access_token: "new-access",
            refresh_token: "new-refresh",
          },
        },
      }),
    });
    const result = await refreshToken();
    expect(result).toBe("new-access");
  });

  it("throws error when updateToken missing", async () => {
    getStateMock.mockReturnValue({
      refreshToken: "refresh-token",
    });
    fetchMock.mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        data: {},
      }),
    });
    await expect(refreshToken()).rejects.toThrow("Refresh failed");
  });

  it("uses fallback url when GRAPHQL_URL is missing", async () => {
    delete process.env.GRAPHQL_URL;
    getStateMock.mockReturnValue({
      refreshToken: "refresh-token",
      setAccessToken: jest.fn(),
      setRefreshToken: jest.fn(),
    });

    fetchMock.mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        data: {
          updateToken: {
            access_token: "token",
            refresh_token: "refresh",
          },
        },
      }),
    });
    await refreshToken();
    expect(fetchMock).toHaveBeenCalledWith(
      "http://localhost:3001/api/graphql",
      expect.any(Object),
    );
  });

  it("uses GRAPHQL_URL from env", async () => {
    process.env.GRAPHQL_URL = "https://api.test/graphql";
    getStateMock.mockReturnValue({
      refreshToken: "refresh-token",
      setAccessToken: jest.fn(),
      setRefreshToken: jest.fn(),
    });

    fetchMock.mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        data: {
          updateToken: {
            access_token: "token",
            refresh_token: "refresh",
          },
        },
      }),
    });
    await refreshToken();
    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.test/graphql",
      expect.any(Object),
    );
  });
});
