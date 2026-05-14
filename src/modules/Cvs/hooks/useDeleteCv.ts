"use client";

import { useMutation } from "@apollo/client/react";
import { DELETE_CV } from "@/modules/Cvs/api/mutations";
import { GET_CVS } from "@/modules/Cvs/api/queries";
import { useMutationNotification } from "@/shared/helpers/useMutationNotification";

export const useDeleteCv = () => {
  const notifications = useMutationNotification({
    successMessage: "CV deleted successfully",
    errorMessage: "Failed to delete CV",
  });
  return useMutation(DELETE_CV, {
    ...notifications,
    refetchQueries: [GET_CVS],
    awaitRefetchQueries: true,
  });
};
