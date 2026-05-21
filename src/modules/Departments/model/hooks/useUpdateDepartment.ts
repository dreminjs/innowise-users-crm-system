"use client";

import { useTranslations } from "next-intl";
import { useMutation } from "@apollo/client/react";
import { GET_DEPARTMENTS } from "../../api/queries";
import { UPDATE_DEPARTMENT } from "../../api/mutations";
import { useMutationNotification } from "@/shared/helpers/useMutationNotification";

export const useUpdateDepartment = () => {
  const t = useTranslations("Notifications");
  const notifications = useMutationNotification({
    successMessage: t("departmentUpdatedSuccessfully"),
    errorMessage: t("failedToUpdateDepartment"),
  });
  const [updateDepartment, result] = useMutation(UPDATE_DEPARTMENT, {
    ...notifications,
    refetchQueries: [GET_DEPARTMENTS],
  });

  return {
    updateDepartment,
    ...result,
  };
};
