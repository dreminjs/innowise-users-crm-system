import { graphql } from "@/graphql";

export const GET_DEPARTMENTS = graphql(`
  query GetDepartments {
    departments {
      id
      name
    }
  }
`);
