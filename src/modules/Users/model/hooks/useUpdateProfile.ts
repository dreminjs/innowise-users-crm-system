"use client";
import { useTranslations } from "next-intl";
import { useMutation } from "@apollo/client/react";
import { UPDATE_PROFILE } from "../../api/mutations";
import { useNotification } from "@/modules/Notifications";
import { TUpdateUserForm } from "../uploadUserInfo.schema";
import { GET_USER_PROFILE } from "../../api/queries";

export const useUpdateProfile = (userId: string) => {
  const t = useTranslations("Notifications");
  const addNotification = useNotification((state) => state.addNotification);
  const [mutate, { loading, error }] = useMutation(UPDATE_PROFILE, {
    onCompleted: () => {
      addNotification({
        message: t("profileUpdatedSuccessfully"),
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
  const handleUpdateProfile = async (
    dto: Pick<TUpdateUserForm, "firstName" | "lastName">,
  ) => {
    if (userId) {
      await mutate({
        variables: {
          dto: {
            first_name: dto.firstName,
            last_name: dto.lastName,
            userId: userId,
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
