import { graphql } from "@/graphql";

export const ADD_CV_PROJECT = graphql(`
  mutation AddCvProject($project: AddCvProjectInput!) {
    addCvProject(project: $project) {
      id
    }
  }
`);

export const UPDATE_CV_PROJECT = graphql(`
  mutation UpdateCvProject($project: UpdateCvProjectInput!) {
    updateCvProject(project: $project) {
      id
    }
  }
`);

export const REMOVE_CV_PROJECT = graphql(`
  mutation RemoveCvProject($project: RemoveCvProjectInput!) {
    removeCvProject(project: $project) {
      id
    }
  }
`);
export const CREATE_PROJECT = graphql(`
  mutation CreateProject($project: CreateProjectInput!) {
    createProject(project: $project) {
      id
      name
    }
  }
`);

export const UPDATE_PROJECT = graphql(`
  mutation UpdateProject($project: UpdateProjectInput!) {
    updateProject(project: $project) {
      id
      name
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
