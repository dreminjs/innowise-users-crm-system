"use client";

import { useMutation } from "@apollo/client/react";
import { UPDATE_CV_PROJECT } from "../api/mutations";
import { GET_CV_PROJECTS } from "../api/queries";
import { useMutationNotification } from "@/shared/helpers/useMutationNotification";

export const useUpdateCvProject = (cvId: string) => {
  const notifications = useMutationNotification({
    successMessage: "Project updated successfully",
    errorMessage: "Failed to update project",
  });

  return useMutation(UPDATE_CV_PROJECT, {
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
