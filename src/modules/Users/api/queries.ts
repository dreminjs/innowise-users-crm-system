import { graphql } from "@/graphql/gql";

export const GET_CURRENT_USER = graphql(`
  query getCurrentProfile($userId: ID!) {
    profile(userId: $userId) {
      id
    }
  }
`);
