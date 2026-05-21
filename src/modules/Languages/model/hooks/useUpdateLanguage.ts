"use client";

import { useTranslations } from "next-intl";
import { useMutation } from "@apollo/client/react";
import { GET_LANGUAGES } from "../../api/queries";
import { UPDATE_LANGUAGE } from "../../api/mutations";
import { useMutationNotification } from "@/shared/helpers/useMutationNotification";

export const useUpdateLanguage = () => {
  const t = useTranslations("Notifications");
  const notifications = useMutationNotification({
    successMessage: t("languageUpdatedSuccessfully"),
    errorMessage: t("failedToUpdateLanguage"),
  });
  const [updateLanguage, result] = useMutation(UPDATE_LANGUAGE, {
    ...notifications,
    refetchQueries: [GET_LANGUAGES],
  });
  return {
    updateLanguage,
    ...result,
  };
};
