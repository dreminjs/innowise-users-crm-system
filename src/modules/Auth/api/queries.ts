import { graphql } from "@/graphql";

export const SIGNIN = graphql(`
  query login($dto: AuthInput!) {
    login(auth: $dto) {
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
