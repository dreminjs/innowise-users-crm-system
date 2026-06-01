import { ApolloLink } from "@apollo/client";
import { useTokens } from "@/modules/Tokens";

export const authLink = new ApolloLink((operation, forward) => {
  const accessToken = useTokens.getState().accessToken;
  operation.setContext(({ headers = {} }) => {
    if (headers.Authorization) {
      return { headers };
    }
    return {
      headers: {
        ...headers,
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    };
  });
  return forward(operation);
});
