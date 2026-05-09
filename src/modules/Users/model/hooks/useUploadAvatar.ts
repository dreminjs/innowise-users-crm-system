import { useMutation } from "@apollo/client/react";
import { UPLOAD_AVATAR } from "../../api/mutations";
import { UploadAvatarInput } from "@/generated/graphql";
import { useNotification } from "@/modules/Notifications";

export const useUploadAvatar = () => {
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
  });

  const handleSubmit = async (dto: UploadAvatarInput) => {
    mutate({ variables: { dto } });
  };

  return {
    loading,
    onSubmit: handleSubmit,
  };
};
