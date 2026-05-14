"use client";

import { useMutation } from "@apollo/client/react";
import { UPDATE_CV } from "@/modules/Cvs/api/mutations";
import { GET_CVS } from "@/modules/Cvs/api/queries";
import { useMutationNotification } from "@/shared/helpers/useMutationNotification";

export const useUpdateCv = () => {
  const notifications = useMutationNotification({
    successMessage: "CV updated successfully",
    errorMessage: "Failed to update CV",
  });

  return useMutation(UPDATE_CV, {
    ...notifications,
    refetchQueries: [GET_CVS],
    awaitRefetchQueries: true,
  });
};
