import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  NormalizedCacheObject,
} from "@apollo/client";
import { useMemo } from "react";

let apolloClient: ApolloClient | null = null;

function createApolloClient(): ApolloClient {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: new HttpLink({
      uri: "/api/graphql",
      credentials: "same-origin",
    }),
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(
  initialState: NormalizedCacheObject | null = null,
): ApolloClient {
  const client = apolloClient ?? createApolloClient();
  if (initialState) {
    client.cache.restore(initialState);
  }
  if (typeof window === "undefined") return client;
  apolloClient = apolloClient ?? client;
  return apolloClient;
}

export function useApollo(
  initialState: NormalizedCacheObject | null,
): ApolloClient {
  return useMemo(() => initializeApollo(initialState), [initialState]);
}
