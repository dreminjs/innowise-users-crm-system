import { graphql } from "@/graphql";

export const SIGNIN = graphql(`
  query login($dto: AuthInput!) {
    login(auth: $dto) {
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
    }
  }
`);

export const FORGOT_PASSWORD = graphql(`
  mutation forgotPassword($dto: ForgotPasswordInput!) {
    forgotPassword(auth: $dto)
  }
`);
