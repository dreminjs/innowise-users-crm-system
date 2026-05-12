"use client";

import { useMutation } from "@apollo/client/react";
import { ADD_CV_SKILL } from "@/modules/Cvs/api/mutations";
import { GET_CV_SKILLS } from "@/modules/Cvs/api/queries";

export const useAddCvSkill = (cvId: string) => {
  return useMutation(ADD_CV_SKILL, {
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
