import { graphql } from "@/graphql";

export const ADD_PROFILE_SKILL = graphql(`
  mutation addProfileSkill($dto: AddProfileSkillInput!) {
    addProfileSkill(skill: $dto) {
      id
    }
  }
`);
