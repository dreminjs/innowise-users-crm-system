"use client";
import { useTranslations } from "next-intl";
import { useMutation } from "@apollo/client/react";
import { DELETE_PROJECT, REMOVE_CV_PROJECT } from "../api/mutations";
import { GET_CV_PROJECTS, GET_PROJECTS } from "../api/queries";
import { useMutationNotification } from "@/shared/helpers/useMutationNotification";

export const useRemoveCvProject = (cvId: string) => {
  const t = useTranslations("Notifications");
  const notifications = useMutationNotification({
    successMessage: t("projectRemovedSuccessfully"),
    errorMessage: t("failedToRemoveProject"),
  });

  return useMutation(REMOVE_CV_PROJECT, {
    ...notifications,
    refetchQueries: [
      {
        query: GET_CV_PROJECTS,
        variables: {
          cvId,
        },
      },
    ],
  });
};
export const useDeleteProject = () => {
  const t = useTranslations("Notifications");
  const notifications = useMutationNotification({
    successMessage: t("projectDeletedSuccessfully"),
    errorMessage: t("failedToDeleteProject"),
  });
  const [deleteProject, result] = useMutation(DELETE_PROJECT, {
    ...notifications,
    refetchQueries: [GET_PROJECTS],
  });
  return {
    deleteProject,
    ...result,
  };
};
