"use client";

import { useTranslations } from "next-intl";
import { useMutation } from "@apollo/client/react";
import { DELETE_SKILL } from "../../api/mutations";
import { GET_SKILLS } from "../../api/queries";
import { useMutationNotification } from "@/shared/helpers/useMutationNotification";

export const useDeleteSkill = () => {
  const t = useTranslations("Notifications");
  const notifications = useMutationNotification({
    successMessage: t("skillDeletedSuccessfully"),
    errorMessage: t("failedToDeleteSkill"),
  });
  const [deleteSkill, result] = useMutation(DELETE_SKILL, {
    ...notifications,
    refetchQueries: [GET_SKILLS],
  });
  return {
    deleteSkill,
    ...result,
  };
};
