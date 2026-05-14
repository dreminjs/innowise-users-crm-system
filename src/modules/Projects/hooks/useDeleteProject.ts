"use client";

import { useMutation } from "@apollo/client/react";
import { REMOVE_CV_PROJECT } from "../api/mutations";
import { GET_CV_PROJECTS } from "../api/queries";
import { useMutationNotification } from "@/shared/helpers/useMutationNotification";

export const useRemoveCvProject = (cvId: string) => {
  const notifications = useMutationNotification({
    successMessage: "Project removed successfully",
    errorMessage: "Failed to remove project",
  });

  return useMutation(REMOVE_CV_PROJECT, {
    ...notifications,
    refetchQueries: [
      {
        query: GET_CV_PROJECTS,
        variables: {
          cvId,
        },
      },
    ],
  });
};
