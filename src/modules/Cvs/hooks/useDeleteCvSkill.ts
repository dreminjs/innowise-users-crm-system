"use client";

import { useMutation } from "@apollo/client/react";
import { DELETE_CV_SKILL } from "@/modules/Cvs/api/mutations";
import { GET_CV_SKILLS } from "@/modules/Cvs/api/queries";

export const useDeleteCvSkill = (cvId: string) => {
  return useMutation(DELETE_CV_SKILL, {
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
