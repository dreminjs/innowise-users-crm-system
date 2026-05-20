import { graphql } from "@/graphql";

export const CREATE_POSITION = graphql(`
  mutation CreatePosition($position: CreatePositionInput!) {
    createPosition(position: $position) {
      id
      name
    }
  }
`);

export const UPDATE_POSITION = graphql(`
  mutation UpdatePosition($position: UpdatePositionInput!) {
    updatePosition(position: $position) {
      id
      name
    }
  }
`);

export const DELETE_POSITION = graphql(`
  mutation DeletePosition($position: DeletePositionInput!) {
    deletePosition(position: $position) {
      affected
    }
  }
`);
