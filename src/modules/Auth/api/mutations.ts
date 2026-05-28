import { graphql } from "@/graphql/gql";

export const UPDATE_TOKEN = graphql(`
  mutation UpdateToken {
    updateToken {
      access_token
      refresh_token
    }
  }
`);

export const SIGNUP = graphql(`
  mutation signup($dto: AuthInput!) {
    signup(auth: $dto) {
      access_token
      refresh_token
      user {
        role
        id
        email
        position_name
      }
    }
  }
`);

export const FORGOT_PASSWORD = graphql(`
  mutation forgotPassword($dto: ForgotPasswordInput!) {
    forgotPassword(auth: $dto)
  }
`);

export const RESET_PASSWORD = graphql(`
  mutation resetPassword($dto: ResetPasswordInput!) {
    resetPassword(auth: $dto)
  }
`);
