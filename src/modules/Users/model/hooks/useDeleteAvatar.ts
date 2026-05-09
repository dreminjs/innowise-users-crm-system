import { useUserStore } from "@/application/store/user.store";
import { useNotification } from "@/modules/Notifications";
import { useMutation } from "@apollo/client/react";
import { DELETE_AVATAR } from "../../api/mutations";
import { GET_USER_PROFILE } from "../../api/queries";

export const useDeleteAvatar = () => {
  const currentUserId = useUserStore((state) => state.userId);

  const addNotification = useNotification((state) => state.addNotification);
  const [mutate, { loading, error }] = useMutation(DELETE_AVATAR, {
    onCompleted: () => {
      addNotification({
        message: "Avatar deleted successfully",
        type: "success",
      });
    },
    refetchQueries: [
      {
        query: GET_USER_PROFILE,
        variables: {
          userId: currentUserId,
        },
      },
    ],
    onError: (error) => {
      addNotification({
        message: error.message,
        type: "error",
      });
    },
  });

  const deleteAvatar = () => {
    if (currentUserId) {
      mutate({
        variables: {
          dto: {
            userId: currentUserId,
          },
        },
      });
    }
  };

  return { deleteAvatar, loading, error };
};
