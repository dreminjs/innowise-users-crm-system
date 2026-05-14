"use client";

import { useMutation } from "@apollo/client/react";
import { ADD_CV_SKILL } from "@/modules/Cvs/api/mutations";
import { GET_CV_SKILLS } from "@/modules/Cvs/api/queries";
import { useMutationNotification } from "@/shared/helpers/useMutationNotification";

export const useAddCvSkill = (cvId: string) => {
  const notifications = useMutationNotification({
    successMessage: "Skill added successfully",
    errorMessage: "Failed to add skill",
  });

  return useMutation(ADD_CV_SKILL, {
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
