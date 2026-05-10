import { graphql } from "@/graphql";

export const ADD_PROFILE_LANGUAGE = graphql(`
  mutation addProfileLanguage($dto: AddProfileLanguageInput!) {
    addProfileLanguage(language: $dto) {
      id
    }
  }
`);

export const DELETE_PROFILE_LANGUAGE = graphql(`
  mutation deleteProfileLanguage($dto: DeleteProfileLanguageInput!) {
    deleteProfileLanguage(language: $dto) {
      id
    }
  }
`);

export const UPDATE_PROFILE_LANGUAGE = graphql(`
  mutation updateProfileLanguage($dto: UpdateProfileLanguageInput!) {
    updateProfileLanguage(language: $dto) {
      id
    }
  }
`);
