import { useTokens } from "@/modules/Tokens";

export const refreshToken = async () => {
  const refresh = useTokens.getState().refreshToken;
  if (!refresh) {
    throw new Error("No refresh token");
  }
  const response = await fetch(
    process.env.GRAPHQL_URL || "http://localhost:3001/api/graphql",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${refresh}`,
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

  const result = await response.json();
  const tokens = result?.data?.updateToken;

  if (!tokens) {
    throw new Error("Refresh failed");
  }
  useTokens.getState().setAccessToken(tokens.access_token);
  useTokens.getState().setRefreshToken(tokens.refresh_token);
  return tokens.access_token;
};
