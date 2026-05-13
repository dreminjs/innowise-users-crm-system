import { graphql } from "@/graphql";

export const CREATE_PROJECT = graphql(`
  mutation CreateProject($project: CreateProjectInput!) {
    createProject(project: $project) {
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
export const ADD_CV_PROJECT = graphql(`
  mutation AddCvProject($project: AddCvProjectInput!) {
    addCvProject(project: $project) {
      id
    }
  }
`);

export const UPDATE_PROJECT = graphql(`
  mutation UpdateProject($project: UpdateProjectInput!) {
    updateProject(project: $project) {
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

export const DELETE_PROJECT = graphql(`
  mutation DeleteProject($project: DeleteProjectInput!) {
    deleteProject(project: $project) {
      affected
    }
  }
`);
