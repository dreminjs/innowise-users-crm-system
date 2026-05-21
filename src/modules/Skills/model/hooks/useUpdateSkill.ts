"use client";

import { useTranslations } from "next-intl";
import { useMutation } from "@apollo/client/react";
import { UPDATE_SKILL } from "../../api/mutations";
import { GET_SKILLS } from "../../api/queries";
import { useMutationNotification } from "@/shared/helpers/useMutationNotification";

export const useUpdateSkill = () => {
  const t = useTranslations("Notifications");
  const notifications = useMutationNotification({
    successMessage: t("skillUpdatedSuccessfully"),
    errorMessage: t("failedToUpdateSkill"),
  });
  const [updateSkill, result] = useMutation(UPDATE_SKILL, {
    ...notifications,
    refetchQueries: [GET_SKILLS],
  });
  return {
    updateSkill,
    ...result,
  };
};
