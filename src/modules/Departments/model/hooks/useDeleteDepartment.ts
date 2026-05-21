"use client";

import { useTranslations } from "next-intl";
import { useMutation } from "@apollo/client/react";
import { GET_DEPARTMENTS } from "../../api/queries";
import { DELETE_DEPARTMENT } from "../../api/mutations";
import { useMutationNotification } from "@/shared/helpers/useMutationNotification";

export const useDeleteDepartment = () => {
  const t = useTranslations("Notifications");
  const notifications = useMutationNotification({
    successMessage: t("departmentDeletedSuccessfully"),
    errorMessage: t("failedToDeleteDepartment"),
  });
  const [deleteDepartment, result] = useMutation(DELETE_DEPARTMENT, {
    ...notifications,
    refetchQueries: [GET_DEPARTMENTS],
  });
  return {
    deleteDepartment,
    ...result,
  };
};
