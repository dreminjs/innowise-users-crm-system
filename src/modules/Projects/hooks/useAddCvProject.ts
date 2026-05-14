"use client";

import { useMutation } from "@apollo/client/react";
import { ADD_CV_PROJECT } from "../api/mutations";
import { GET_CV_PROJECTS } from "../api/queries";

export const useAddCvProject = (cvId: string) => {
  return useMutation(ADD_CV_PROJECT, {
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
