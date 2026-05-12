import { useUserStore } from "@/application/store/user.store";
import { useNotification } from "@/modules/Notifications";
import { UPDATE_USER } from "../../api/mutations";
import { useMutation } from "@apollo/client/react";
import { TUpdateUserForm } from "../uploadUserInfo.schema";
import { GET_USER_PROFILE } from "../../api/queries";

export const useUpdateUser = () => {
  const currentUserId = useUserStore((state) => state.userId);

  const addNotification = useNotification((state) => state.addNotification);
  const [mutate, { loading, error }] = useMutation(UPDATE_USER, {
    onCompleted: () => {
      addNotification({
        message: "User updated successfully",
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

  const handleUpdateUser = async (
    dto: Pick<TUpdateUserForm, "departmentId" | "positionId">,
  ) => {
    if (currentUserId) {
      await mutate({
        variables: {
          dto: {
            departmentId: dto.departmentId,
            positionId: dto.positionId,
            userId: currentUserId,
          },
        },
      });
    }
  };

  return {
    loading,
    error,
    onSubmit: handleUpdateUser,
  };
};
