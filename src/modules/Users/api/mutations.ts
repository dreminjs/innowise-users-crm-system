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
export const DELETE_USER = graphql(`
  mutation DeleteUser($userId: ID!) {
    deleteUser(userId: $userId) {
      affected
    }
  }
`);
export const CREATE_USER = graphql(`
  mutation CreateUser($user: CreateUserInput!) {
    createUser(user: $user) {
      id
      email
      role
      department_name
      position_name
      profile {
        first_name
        last_name
      }
    }
  }
`);

export const UPDATE_USER_DATA = graphql(`
  mutation UpdateUserData($user: UpdateUserInput!) {
    updateUser(user: $user) {
      id
      role
      department_name
      position_name
      profile {
        first_name
        last_name
      }
    }
  }
`);
