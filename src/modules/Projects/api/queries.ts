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
export const GET_PROJECTS = graphql(`
  query GetProjects {
    projects {
      id
      name
      domain
      description
      environment
      start_date
      end_date
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
