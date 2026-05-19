import { graphql } from "@/graphql/gql";

export const GET_USERS = graphql(`
  query GetUsers {
    users {
      id
      email
      role
      department_name
      position_name

      department {
        id
      }
      position {
        id
      }
      profile {
        id
        first_name
        last_name
        avatar
      }
    }
  }
`);

export const GET_USER_PROFILE = graphql(`
  query getUserProfile($userId: ID!) {
    user(userId: $userId) {
      profile {
        id
        first_name
        last_name
        avatar
      }

      department {
        id
        name
      }
      position {
        id
        name
      }
      role
      email
      created_at
    }
  }
`);

export const GET_USERS_CREATERIES = graphql(`
  query GetUsersCriteries {
    positions {
      id
      name
    }
    departments {
      id
      name
    }
  }
`);
