"use client";

import { useMutation } from "@apollo/client/react";
import { UPDATE_CV_SKILL } from "@/modules/Cvs/api/mutations";
import { GET_CV_SKILLS } from "@/modules/Cvs/api/queries";
import { useMutationNotification } from "@/shared/helpers/useMutationNotification";

export const useUpdateCvSkill = (cvId: string) => {
  const notifications = useMutationNotification({
    successMessage: "Skill updated successfully",
    errorMessage: "Failed to update skill",
  });

  return useMutation(UPDATE_CV_SKILL, {
    ...notifications,
    refetchQueries: [
      {
        query: GET_CV_SKILLS,
        variables: {
          cvId,
        },
      },
    ],
    awaitRefetchQueries: true,
  });
};
