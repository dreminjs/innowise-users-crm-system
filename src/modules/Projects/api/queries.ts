import { graphql } from "@/graphql";

export const GET_CV_PROJECTS = graphql(`
  query GetCvProjects($cvId: ID!) {
    cv(cvId: $cvId) {
      id
      projects {
        id
        name
        internal_name
        domain
        start_date
        end_date
        description
        environment
        roles
        responsibilities
      }
    }
  }
`);

export const GET_PROJECT_OPTIONS = graphql(`
  query GetProjectOptions {
    projects {
      id
      name
      domain
      description
      environment
    }
  }
`);
