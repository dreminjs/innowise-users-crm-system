import { graphql } from "@/graphql";

export const GET_POSITIONS = graphql(`
  query GetPositions {
    positions {
      id
      name
    }
  }
`);
