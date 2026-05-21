"use client";

import { useTranslations } from "next-intl";
import { useMutation } from "@apollo/client/react";
import { GET_POSITIONS } from "../../api/queries";
import { UPDATE_POSITION } from "../../api/mutations";
import { useMutationNotification } from "@/shared/helpers/useMutationNotification";

export const useUpdatePosition = () => {
  const t = useTranslations("Notifications");
  const notifications = useMutationNotification({
    successMessage: t("positionUpdatedSuccessfully"),
    errorMessage: t("failedToUpdatePosition"),
  });
  const [updatePosition, result] = useMutation(UPDATE_POSITION, {
    ...notifications,
    refetchQueries: [GET_POSITIONS],
  });
  return {
    updatePosition,
    ...result,
  };
};
