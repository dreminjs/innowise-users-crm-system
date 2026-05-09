import { graphql } from "@/graphql";

export const GET_SKILLS = graphql(`
  query getSkills {
    skills {
      id
      name
      category {
        id
        name
      }
    }
  }
`);
