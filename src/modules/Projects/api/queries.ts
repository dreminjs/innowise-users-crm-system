import { graphql } from "@/graphql";

export const GET_PROJECTS = graphql(`
  query GetProjects {
    projects {
      id
      name
      internal_name
      domain
      start_date
      end_date
      description
      environment
    }
  }
`);
