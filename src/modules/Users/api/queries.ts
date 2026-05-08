import { graphql } from "@/graphql/gql";
export const GET_CURRENT_USER = graphql(`
  query getCurrentProfile($userId: ID!) {
    profile(userId: $userId) {
      id
    }
  }
`);

export const GET_USERS = graphql(`
  query GetUsers {
    users {
      id
      email
      role
      department_name
      position_name

      profile {
        first_name
        last_name
        avatar
      }
    }
  }
`)