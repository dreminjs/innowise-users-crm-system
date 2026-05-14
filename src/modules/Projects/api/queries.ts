import { graphql } from "@/graphql";

export const GET_CV_PROJECTS = graphql(`
  query GetCvProjects($cvId: ID!) {
    cv(cvId: $cvId) {
      id
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

export const GET_PROJECT_OPTIONS = graphql(`
  query GetProjectOptions {
    projects {
      id
      name
      internal_name
      domain
      description
      environment
    }
  }
`);
