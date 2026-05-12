import { graphql } from "@/graphql";

export const GET_CVS = graphql(`
  query GetCvs {
    cvs {
      id
      name
      education
      description
      user {
        id
        email
        profile {
          first_name
          last_name
        }
      }
    }
  }
`);
