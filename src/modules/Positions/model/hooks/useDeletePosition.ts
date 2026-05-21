"use client";

import { useTranslations } from "next-intl";
import { useMutation } from "@apollo/client/react";
import { GET_POSITIONS } from "../../api/queries";
import { DELETE_POSITION } from "../../api/mutations";
import { useMutationNotification } from "@/shared/helpers/useMutationNotification";

export const useDeletePosition = () => {
  const t = useTranslations("Notifications");
  const notifications = useMutationNotification({
    successMessage: t("positionDeletedSuccessfully"),
    errorMessage: t("failedToDeletePosition"),
  });
  const [deletePosition, result] = useMutation(DELETE_POSITION, {
    ...notifications,
    refetchQueries: [GET_POSITIONS],
  });
  return {
    deletePosition,
    ...result,
  };
};
