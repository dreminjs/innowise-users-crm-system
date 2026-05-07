import { ApolloClient, InMemoryCache } from "@apollo/client-integration-nextjs";
import { from } from "@apollo/client";
import { errorLink } from "@/application/errorLink";
import { authLink } from "@/application/authLink";
import { httpLink } from "@/application/httpLink";

export const makeClient = () => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: from([errorLink, authLink, httpLink]),
  });
};
