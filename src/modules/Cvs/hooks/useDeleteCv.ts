"use client";
import { useTranslations } from "next-intl";
import { useMutation } from "@apollo/client/react";
import { DELETE_CV } from "@/modules/Cvs/api/mutations";
import { GET_CVS } from "@/modules/Cvs/api/queries";
import { useMutationNotification } from "@/shared/helpers/useMutationNotification";

export const useDeleteCv = () => {
  const t = useTranslations("Notifications");

  const notifications = useMutationNotification({
    successMessage: t("cvDeletedSuccessfully"),
    errorMessage: t("failedToDeleteCv"),
  });

  return useMutation(DELETE_CV, {
    ...notifications,
    refetchQueries: [GET_CVS],
    awaitRefetchQueries: true,
  });
};
