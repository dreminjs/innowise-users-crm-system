"use client";

import { useMutation } from "@apollo/client/react";
import { UPDATE_CV_PROJECT } from "../api/mutations";
import { GET_CV_PROJECTS } from "../api/queries";

export const useUpdateCvProject = (cvId: string) => {
  return useMutation(UPDATE_CV_PROJECT, {
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
