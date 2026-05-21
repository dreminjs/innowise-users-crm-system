"use client";

import { useTranslations } from "next-intl";
import { useMutation } from "@apollo/client/react";
import { GET_DEPARTMENTS } from "../../api/queries";
import { CREATE_DEPARTMENT } from "../../api/mutations";
import { useMutationNotification } from "@/shared/helpers/useMutationNotification";

export const useCreateDepartment = () => {
  const t = useTranslations("Notifications");
  const notifications = useMutationNotification({
    successMessage: t("departmentCreatedSuccessfully"),
    errorMessage: t("failedToCreateDepartment"),
  });
  const [createDepartment, result] = useMutation(CREATE_DEPARTMENT, {
    ...notifications,
    refetchQueries: [GET_DEPARTMENTS],
  });
  return {
    createDepartment,
    ...result,
  };
};
