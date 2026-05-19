"use client";
import { useTranslations } from "next-intl";
import { useUserStore } from "@/application/store/user.store";
import { useNotification } from "@/modules/Notifications";
import { UPDATE_USER } from "../../api/mutations";
import { useMutation } from "@apollo/client/react";
import { TUpdateUserForm } from "../uploadUserInfo.schema";
import { GET_USER_PROFILE } from "../../api/queries";

export const useUpdateUser = (userId: string) => {
  const t = useTranslations("Notifications");
  const addNotification = useNotification((state) => state.addNotification);
  const [mutate, { loading, error }] = useMutation(UPDATE_USER, {
    onCompleted: () => {
      addNotification({
        message: t("userUpdatedSuccessfully"),
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
          userId: userId,
        },
      },
    ],
  });
  const handleUpdateUser = async (
    dto: Pick<TUpdateUserForm, "departmentId" | "positionId">,
  ) => {
    if (userId) {
      await mutate({
        variables: {
          dto: {
            departmentId: dto.departmentId,
            positionId: dto.positionId,
            userId: userId,
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
