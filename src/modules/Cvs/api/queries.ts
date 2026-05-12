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
      }
    }
  }
`);

export const GET_CV = graphql(`
  query GetCV($cvId: ID!) {
    cv(cvId: $cvId) {
      id
      name
      education
      description
      created_at
      user {
        id
        email
        role
      }
      skills {
        name
        mastery
      }
      languages {
        name
        proficiency
      }
      projects {
        id
        name
        internal_name
        description
        domain
        start_date
        end_date
        environment
        roles
        responsibilities
      }
    }
  }
`);
