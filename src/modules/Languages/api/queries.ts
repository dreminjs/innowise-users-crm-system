import { graphql } from "@/graphql";

export const GET_PROFILE_LANGUAGES = graphql(`
  query getProfileLanguages($userId: ID!) {
    profile(userId: $userId) {
      languages {
        name
        proficiency
      }
    }
  }
`);

export const GET_LANGUAGES = graphql(`
  query getLanguages {
    languages {
      name
    }
  }
`);
