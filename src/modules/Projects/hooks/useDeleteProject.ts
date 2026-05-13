"use client";

import { useMutation } from "@apollo/client/react";
import { DELETE_PROJECT } from "../api/mutations";
import { GET_CV_PROJECTS } from "../api/queries";

export const useDeleteProject = (cvId: string) => {
  return useMutation(DELETE_PROJECT, {
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
