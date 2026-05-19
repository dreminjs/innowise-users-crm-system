"use client";
import { useTranslations } from "next-intl";
import { useMutation } from "@apollo/client/react";
import { ADD_CV_PROJECT } from "../api/mutations";
import { GET_CV_PROJECTS } from "../api/queries";
import { useMutationNotification } from "@/shared/helpers/useMutationNotification";

export const useAddCvProject = (cvId: string) => {
  const t = useTranslations("Notifications");

  const notifications = useMutationNotification({
    successMessage: t("projectAddedSuccessfully"),
    errorMessage: t("failedToAddProject"),
  });

  return useMutation(ADD_CV_PROJECT, {
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
