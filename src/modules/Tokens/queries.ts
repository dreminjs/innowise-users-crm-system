import { graphql } from "@/graphql";

export const GET_NEW_REFRESH_TOKEN = graphql(`
  mutation UpdateToken {
    updateToken {
      access_token
      refresh_token
    }
  }
`);
