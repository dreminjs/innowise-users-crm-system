import { graphql } from "@/graphql/gql";

export const UPDATE_TOKEN = graphql(`
  mutation UpdateToken {
    updateToken {
      access_token
      refresh_token
    }
  }
`);
