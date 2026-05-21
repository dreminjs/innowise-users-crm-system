"use client";

import { useTranslations } from "next-intl";
import { useMutation } from "@apollo/client/react";
import { CREATE_SKILL } from "../../api/mutations";
import { GET_SKILLS } from "../../api/queries";
import { useMutationNotification } from "@/shared/helpers/useMutationNotification";

export const useCreateSkill = () => {
  const t = useTranslations("Notifications");
  const notifications = useMutationNotification({
    successMessage: t("skillCreatedSuccessfully"),
    errorMessage: t("failedToCreateSkill"),
  });
  const [createSkill, result] = useMutation(CREATE_SKILL, {
    ...notifications,
    refetchQueries: [GET_SKILLS],
  });
  return {
    createSkill,
    ...result,
  };
};
