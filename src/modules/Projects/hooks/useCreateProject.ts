"use client";

import { useTranslations } from "next-intl";
import { useMutation } from "@apollo/client/react";
import { CREATE_PROJECT } from "@/modules/Projects/api/mutations";
import { GET_PROJECTS } from "@/modules/Projects/api/queries";
import { useMutationNotification } from "@/shared/helpers/useMutationNotification";

export const useCreateProject = () => {
  const t = useTranslations("Notifications");
  const notifications = useMutationNotification({
    successMessage: t("projectCreatedSuccessfully"),
    errorMessage: t("failedToCreateProject"),
  });
  const [createProject, result] = useMutation(CREATE_PROJECT, {
    ...notifications,
    refetchQueries: [GET_PROJECTS],
  });
  return {
    createProject,
    ...result,
  };
};
