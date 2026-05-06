'use client'

import {
    ApolloClient,
    ApolloNextAppProvider,
    InMemoryCache,
} from '@apollo/client-integration-nextjs'

import {
    ApolloLink,
    HttpLink,
} from '@apollo/client'

function makeClient() {
    const httpLink = new HttpLink({
        uri: 'https://cv-node.onrender.com/api/graphql',
    })

    const authLink = new ApolloLink((operation, forward) => {
        operation.setContext({
            headers: {
                Authorization:
                    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjYxMiwiZW1haWwiOiJzZW1rYXRlc3RAZ21haWwuY29tIiwicm9sZSI6IkVtcGxveWVlIiwiaWF0IjoxNzc4MDc1NTE5LCJleHAiOjE3NzgwNzYxMTl9.jwi0F2Q7nMnuI2gUvgJ4p8LbQDbRPBWBzvQU1xTP1fE',
            },
        })

        return forward(operation)
    })

    return new ApolloClient({
        cache: new InMemoryCache(),

        link: authLink.concat(httpLink),
    })
}

type Props = {
    children: React.ReactNode
}

export const ApolloWrapper = ({
                                  children,
                              }: Props) => {
    return (
        <ApolloNextAppProvider makeClient={makeClient}>
            {children}
        </ApolloNextAppProvider>
    )
}