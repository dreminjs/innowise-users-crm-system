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

export const GET_PROFILE_SKILLS = graphql(`
  query getProfileSkills($userId: ID!) {
    profile(userId: $userId) {
      skills {
        name
        categoryId
        mastery
      }
    }
  }
`);

export const GET_SKILL_CATEGORIES = graphql(`
  query getSkillCategories {
    skillCategories {
      id
      name
      parent {
        id
        name
      }
    }
  }
`);
