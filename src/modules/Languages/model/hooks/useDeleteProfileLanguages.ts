"use client";

import { useTranslations } from "next-intl";
import { useMutation } from "@apollo/client/react";
import { useNotification } from "@/modules/Notifications";
import { useLanguageStore } from "../language.store";
import { DELETE_PROFILE_LANGUAGE } from "../../api/mutations";
import { GET_PROFILE_LANGUAGES } from "../../api/queries";

export const useDeleteProfileLanguages = (userId: string) => {
  const addNotification = useNotification((state) => state.addNotification);
  const t = useTranslations("Notifications");
  const { clearDeleteLanguages, toggleDeleteMode, deleteLanguages } =
    useLanguageStore();
  const [mutate, { loading, error }] = useMutation(DELETE_PROFILE_LANGUAGE, {
    onCompleted: () => {
      addNotification({
        message: t("languagesDeletedSuccessfully"),
        type: "success",
      });
      clearDeleteLanguages();
      toggleDeleteMode();
    },

    onError: () => {
      addNotification({
        message: t("failedToDeleteLanguages"),
        type: "error",
      });
      clearDeleteLanguages();
      toggleDeleteMode();
    },
    refetchQueries: [
      {
        query: GET_PROFILE_LANGUAGES,
        variables: {
          userId,
        },
      },
    ],
  });
  const handleDeleteProfileLanguages = () => {
    mutate({
      variables: {
        dto: {
          name: Object.values(deleteLanguages),
          userId,
        },
      },
    });
  };
  return {
    handleDeleteProfileLanguages,
    loading,
    error,
  };
};
