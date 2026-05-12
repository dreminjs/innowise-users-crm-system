import { useMutation } from "@apollo/client/react";
import { UploadAvatarInput } from "@/generated/graphql";
import { useNotification } from "@/modules/Notifications";
import { UPLOAD_AVATAR } from "../../api/mutations";
import { GET_USER_PROFILE } from "../../api/queries";

export const useUploadAvatar = (userId: string) => {
  const addNotification = useNotification((state) => state.addNotification);
  const [mutate, { loading }] = useMutation(UPLOAD_AVATAR, {
    onCompleted: () => {
      addNotification({
        type: "success",
        message: "Avatar uploaded successfully",
      });
    },
    onError: () => {
      addNotification({
        type: "error",
        message: "Failed to upload avatar",
      });
    },
    refetchQueries: [
      {
        query: GET_USER_PROFILE,
        variables: {
          userId,
        },
      },
    ],
  });

  const handleSubmit = async (dto: UploadAvatarInput) => {
    await mutate({ variables: { dto } });
  };

  return {
    loading,
    onSubmit: handleSubmit,
  };
};
