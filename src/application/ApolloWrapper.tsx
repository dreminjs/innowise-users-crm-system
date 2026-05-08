"use client";

<<<<<<< Updated upstream
import { ApolloNextAppProvider } from "@apollo/client-integration-nextjs";
import { makeClient } from "./client";
=======
import { GET_NEW_REFRESH_TOKEN, useTokens } from "@/modules/Tokens";
import { ApolloLink, HttpLink, Observable } from "@apollo/client";
import {
  ApolloNextAppProvider,
  ApolloClient,
  InMemoryCache,
} from "@apollo/client-integration-nextjs";
import { onError } from "@apollo/client/link/error";

function makeClient() {
  const httpLink = new HttpLink({
    uri:
      process.env.NEXT_PUBLIC_GRAPHQL_URL ||
      "http://localhost:3001/api/graphql",
  });

  const authLink = new ApolloLink((operation, forward) => {
    const accessToken = useTokens.getState().accessToken;
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    }));
    return forward(operation);
  });

  const errorLink = onError(({ operation, forward, error }) => {
    if (error?.message) {
      console.log(error.message);
      const { refreshToken } = useTokens.getState();

      if (!refreshToken) {
        useTokens.getState().setAccessToken(null);
        useTokens.getState().setRefreshToken(null);
        window.location.href = "/login";
        return;
      }

      return new Observable((observer) => {
        fetch("http://localhost:3001/api/graphql", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: GET_NEW_REFRESH_TOKEN.loc?.source.body,
            variables: { refreshToken },
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            const tokens = data?.data?.updateToken;

            if (!tokens) {
              useTokens.getState().setAccessToken(null);
              useTokens.getState().setRefreshToken(null);
              window.location.href = "/auth/signin";
              observer.complete();
              return;
            }

            useTokens.getState().setAccessToken(tokens.accessToken);
            useTokens.getState().setRefreshToken(tokens.refreshToken);

            operation.setContext(({ headers = {} }) => ({
              headers: {
                ...headers,
                Authorization: `Bearer ${tokens.accessToken}`,
              },
            }));

            forward(operation).subscribe(observer);
          })
          .catch(() => {
            useTokens.getState().setAccessToken(null);
            useTokens.getState().setRefreshToken(null);
            window.location.href = "/login";
            observer.complete();
          });
      });
    }
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([errorLink, authLink, httpLink]),
  });
}
>>>>>>> Stashed changes

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
