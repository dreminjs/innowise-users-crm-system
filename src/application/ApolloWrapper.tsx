"use client";

import { HttpLink } from "@apollo/client";
import {
    ApolloNextAppProvider,
    ApolloClient,
    InMemoryCache,
} from "@apollo/client-integration-nextjs";

function makeClient() {
    return new ApolloClient({
        cache: new InMemoryCache(),
        link: new HttpLink({
            uri: process.env.GRAPHQL_URL || "http://localhost:3001/api/graphql",
        }),
    });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
    return (
        <ApolloNextAppProvider makeClient={makeClient}>
            {children}
        </ApolloNextAppProvider>
    );
}