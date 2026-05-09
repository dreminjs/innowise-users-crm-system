import { graphql } from "@/graphql";

export const UPLOAD_AVATAR = graphql(`
  mutation uploadAvatarFile($dto: UploadAvatarInput!) {
    uploadAvatar(avatar: $dto)
  }
`);

export const UPDATE_PROFILE = graphql(`
  mutation updateProfile($dto: UpdateProfileInput!) {
    updateProfile(profile: $dto) {
      id
    }
  }
`);

export const UPDATE_USER = graphql(`
  mutation updateUser($dto: UpdateUserInput!) {
    updateUser(user: $dto) {
      id
    }
  }
`);

export const DELETE_AVATAR = graphql(`
  mutation deleteAvatar($dto: DeleteAvatarInput!) {
    deleteAvatar(avatar: $dto)
  }
`);
