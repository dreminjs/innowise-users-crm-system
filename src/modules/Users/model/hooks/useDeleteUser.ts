"use client";

import { useMutation } from "@apollo/client/react";
import { useTranslations } from "next-intl";
import { useNotification } from "@/modules/Notifications";
import { DELETE_USER } from "../../api/mutations";
import { GET_USERS } from "../../api/queries";

export const useDeleteUser = () => {
  const t = useTranslations("Notifications");
  const addNotification = useNotification((state) => state.addNotification);
  const [mutate, { loading, error }] = useMutation(DELETE_USER, {
    onCompleted: () => {
      addNotification({
        message: t("userDeletedSuccessfully"),
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
        query: GET_USERS,
      },
    ],
    awaitRefetchQueries: true,
  });
  const deleteUser = async (userId: string) => {
    await mutate({
      variables: {
        userId,
      },
    });
  };
  return {
    deleteUser,
    loading,
    error,
  };
};
