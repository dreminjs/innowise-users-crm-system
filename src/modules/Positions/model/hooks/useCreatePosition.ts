"use client";

import { useTranslations } from "next-intl";
import { useMutation } from "@apollo/client/react";
import { GET_POSITIONS } from "../../api/queries";
import { CREATE_POSITION } from "../../api/mutations";
import { useMutationNotification } from "@/shared/helpers/useMutationNotification";

export const useCreatePosition = () => {
  const t = useTranslations("Notifications");
  const notifications = useMutationNotification({
    successMessage: t("positionCreatedSuccessfully"),
    errorMessage: t("failedToCreatePosition"),
  });
  const [createPosition, result] = useMutation(CREATE_POSITION, {
    ...notifications,
    refetchQueries: [GET_POSITIONS],
  });
  return {
    createPosition,
    ...result,
  };
};
