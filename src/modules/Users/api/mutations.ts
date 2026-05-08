import { graphql } from "@/graphql";

export const UPLOAD_AVATAR = graphql(`
  mutation uploadAvatarFile($dto: UploadAvatarInput!) {
    uploadAvatar(avatar: $dto)
  }
`);
