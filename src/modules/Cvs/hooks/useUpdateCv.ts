"use client";
import { useTranslations } from "next-intl";
import { useMutation } from "@apollo/client/react";
import { UPDATE_CV } from "@/modules/Cvs/api/mutations";
import { GET_CVS } from "@/modules/Cvs/api/queries";
import { useMutationNotification } from "@/shared/helpers/useMutationNotification";

export const useUpdateCv = () => {
  const t = useTranslations("Notifications");

  const notifications = useMutationNotification({
    successMessage: t("cvUpdatedSuccessfully"),
    errorMessage: t("failedToUpdateCv"),
  });

  return useMutation(UPDATE_CV, {
    ...notifications,
    refetchQueries: [GET_CVS],
    awaitRefetchQueries: true,
  });
};
