import { graphql } from "@/graphql";

export const ADD_PROFILE_SKILL = graphql(`
  mutation addProfileSkill($dto: AddProfileSkillInput!) {
    addProfileSkill(skill: $dto) {
      id
    }
  }
`);

export const DELETE_PROFILE_SKILL = graphql(`
  mutation deleteProfileSkill($dto: DeleteProfileSkillInput!) {
    deleteProfileSkill(skill: $dto) {
      id
    }
  }
`);

export const UPDATE_PROFILE_SKILL = graphql(`
  mutation updateProfileSkill($dto: UpdateProfileSkillInput!) {
    updateProfileSkill(skill: $dto) {
      id
    }
  }
`);
