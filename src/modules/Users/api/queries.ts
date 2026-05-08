import { graphql } from "@/graphql/gql";
<<<<<<< Updated upstream
export const GET_CURRENT_USER = graphql(`
=======

export const GET_USER_FULLNAME = graphql(`
>>>>>>> Stashed changes
  query getCurrentProfile($userId: ID!) {
    user(userId: $userId) {
      profile {
        full_name
      }
    }
  }
`);

export const GET_USERS = graphql(`
  query getUsers {
    users {
      id
    }
  }
`);

<<<<<<< Updated upstream
export const GET_USERS = graphql(`
  query GetUsers {
    users {
      id
      email
      role
      department_name
      position_name

      profile {
=======
export const GET_USER_PROFILE = graphql(`
  query getUserProfile($userId: ID!) {
    user(userId: $userId) {
      profile {
        id
>>>>>>> Stashed changes
        first_name
        last_name
        avatar
      }
<<<<<<< Updated upstream
    }
  }
`)
=======
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
    }
  }
`);
>>>>>>> Stashed changes
