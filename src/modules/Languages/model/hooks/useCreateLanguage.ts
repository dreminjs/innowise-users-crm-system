"use client";

import { useTranslations } from "next-intl";
import { useMutation } from "@apollo/client/react";
import { GET_LANGUAGES } from "../../api/queries";
import { CREATE_LANGUAGE } from "../../api/mutations";
import { useMutationNotification } from "@/shared/helpers/useMutationNotification";

export const useCreateLanguage = () => {
  const t = useTranslations("Notifications");
  const notifications = useMutationNotification({
    successMessage: t("languageCreatedSuccessfully"),
    errorMessage: t("failedToCreateLanguage"),
  });
  const [createLanguage, result] = useMutation(CREATE_LANGUAGE, {
    ...notifications,
    refetchQueries: [GET_LANGUAGES],
  });
  return {
    createLanguage,
    ...result,
  };
};
