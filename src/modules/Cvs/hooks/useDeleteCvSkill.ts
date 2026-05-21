"use client";
import { useTranslations } from "next-intl";
import { useMutation } from "@apollo/client/react";
import { DELETE_CV_SKILL } from "@/modules/Cvs/api/mutations";
import { GET_CV_SKILLS } from "@/modules/Cvs/api/queries";
import { useMutationNotification } from "@/shared/helpers/useMutationNotification";

export const useDeleteCvSkill = (cvId: string) => {
  const t = useTranslations("Notifications");
  const notifications = useMutationNotification({
    successMessage: t("skillDeletedSuccessfully"),
    errorMessage: t("failedToDeleteSkill"),
  });

  return useMutation(DELETE_CV_SKILL, {
    ...notifications,
    refetchQueries: [
      {
        query: GET_CV_SKILLS,
        variables: {
          cvId,
        },
      },
    ],
    awaitRefetchQueries: true,
  });
};
