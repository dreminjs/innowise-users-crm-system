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

export const GET_CV_SKILLS = graphql(`
  query GetCvSkills($cvId: ID!) {
    cv(cvId: $cvId) {
      id
      skills {
        name
        mastery
        categoryId
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
        position {
          name
        }
        profile {
          full_name
        }
      }
      skills {
        name
        mastery
        categoryId
      }
      languages {
        name
        proficiency
      }
      projects {
        id
        start_date
        end_date
        responsibilities
        roles
        project {
          id
          name
          internal_name
          domain
          description
          environment
        }
      }
    }
  }
`);
