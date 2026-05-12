import { graphql } from "@/graphql";

export const CREATE_CV = graphql(`
  mutation CreateCv($cv: CreateCvInput!) {
    createCv(cv: $cv) {
      id
      name
      education
      description
      user {
        id
        email
      }
    }
  }
`);

export const UPDATE_CV = graphql(`
  mutation UpdateCv($cv: UpdateCvInput!) {
    updateCv(cv: $cv) {
      id
      name
      education
      description
      user {
        id
        email
      }
    }
  }
`);

export const DELETE_CV = graphql(`
  mutation DeleteCv($cv: DeleteCvInput!) {
    deleteCv(cv: $cv) {
      affected
    }
  }
`);
export const ADD_CV_SKILL = graphql(`
  mutation AddCvSkill($skill: AddCvSkillInput!) {
    addCvSkill(skill: $skill) {
      id
      skills {
        name
        mastery
        categoryId
      }
    }
  }
`);

export const UPDATE_CV_SKILL = graphql(`
  mutation UpdateCvSkill($skill: UpdateCvSkillInput!) {
    updateCvSkill(skill: $skill) {
      id
      skills {
        name
        mastery
        categoryId
      }
    }
  }
`);

export const DELETE_CV_SKILL = graphql(`
  mutation DeleteCvSkill($skill: DeleteCvSkillInput!) {
    deleteCvSkill(skill: $skill) {
      id

      skills {
        name
        mastery
        categoryId
      }
    }
  }
`);
