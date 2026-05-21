"use client";

import { useTranslations } from "next-intl";
import { useMutation } from "@apollo/client/react";
import { GET_LANGUAGES } from "../../api/queries";
import { DELETE_LANGUAGE } from "../../api/mutations";
import { useMutationNotification } from "@/shared/helpers/useMutationNotification";

export const useDeleteLanguage = () => {
  const t = useTranslations("Notifications");
  const notifications = useMutationNotification({
    successMessage: t("languageDeletedSuccessfully"),
    errorMessage: t("failedToDeleteLanguage"),
  });
  const [deleteLanguage, result] = useMutation(DELETE_LANGUAGE, {
    ...notifications,
    refetchQueries: [GET_LANGUAGES],
  });
  return {
    deleteLanguage,
    ...result,
  };
};
