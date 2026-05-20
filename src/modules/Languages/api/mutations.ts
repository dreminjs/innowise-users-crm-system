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
export const CREATE_LANGUAGE = graphql(`
  mutation CreateLanguage($language: CreateLanguageInput!) {
    createLanguage(language: $language) {
      id
      name
      native_name
      iso2
    }
  }
`);

export const UPDATE_LANGUAGE = graphql(`
  mutation UpdateLanguage($language: UpdateLanguageInput!) {
    updateLanguage(language: $language) {
      id
      name
      native_name
      iso2
    }
  }
`);

export const DELETE_LANGUAGE = graphql(`
  mutation DeleteLanguage($language: DeleteLanguageInput!) {
    deleteLanguage(language: $language) {
      affected
    }
  }
`);
