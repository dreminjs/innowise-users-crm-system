import { HttpLink } from "@apollo/client";
import {
  registerApolloClient,
  ApolloClient,
  InMemoryCache,
} from "@apollo/client-integration-nextjs";

export const { query } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: "http://localhost:3001/api/graphql",
      fetchOptions: {
        // Optional: Next.js-specific fetch options for caching and revalidation
        // https://nextjs.org/docs/app/api-reference/functions/fetch
      },
    }),
  });
});
