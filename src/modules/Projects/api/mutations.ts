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
