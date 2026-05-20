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
export const CREATE_SKILL = graphql(`
  mutation CreateSkill($skill: CreateSkillInput!) {
    createSkill(skill: $skill) {
      id
      name
      category {
        id
        name
      }
    }
  }
`);

export const UPDATE_SKILL = graphql(`
  mutation UpdateSkill($skill: UpdateSkillInput!) {
    updateSkill(skill: $skill) {
      id
      name
      category {
        id
        name
      }
    }
  }
`);

export const DELETE_SKILL = graphql(`
  mutation DeleteSkill($skill: DeleteSkillInput!) {
    deleteSkill(skill: $skill) {
      affected
    }
  }
`);
