"use client";

import { useMutation } from "@apollo/client/react";
import { UPDATE_CV_SKILL } from "@/modules/Cvs/api/mutations";
import { GET_CV_SKILLS } from "@/modules/Cvs/api/queries";

export const useUpdateCvSkill = (cvId: string) => {
  return useMutation(UPDATE_CV_SKILL, {
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
