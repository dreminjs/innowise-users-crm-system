import { useMutation } from "@apollo/client/react";
import { UPDATE_PROFILE } from "../../api/mutations";
import { useNotification } from "@/modules/Notifications";
import { TUpdateUserForm } from "../uploadUserInfo.schema";
import { useUserStore } from "@/application/store/user.store";
import { GET_USER_PROFILE } from "../../api/queries";

export const useUpdateProfile = () => {
  const currentUserId = useUserStore((state) => state.userId);

  const addNotification = useNotification((state) => state.addNotification);
  const [mutate, { loading, error }] = useMutation(UPDATE_PROFILE, {
    onCompleted: () => {
      addNotification({
        message: "Profile updated successfully",
        type: "success",
      });
    },
    onError: (error) => {
      addNotification({
        message: error.message,
        type: "error",
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
  });

  const handleUpdateProfile = async (
    dto: Pick<TUpdateUserForm, "firstName" | "lastName">,
  ) => {
    if (currentUserId) {
      await mutate({
        variables: {
          dto: {
            first_name: dto.firstName,
            last_name: dto.lastName,
            userId: currentUserId,
          },
        },
      });
    }
  };

  return {
    loading,
    error,
    onSubmit: handleUpdateProfile,
  };
};
