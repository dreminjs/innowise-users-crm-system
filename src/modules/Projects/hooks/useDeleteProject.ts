"use client";

import { useMutation } from "@apollo/client/react";
import { REMOVE_CV_PROJECT } from "../api/mutations";
import { GET_CV_PROJECTS } from "../api/queries";

export const useRemoveCvProject = (cvId: string) => {
  return useMutation(REMOVE_CV_PROJECT, {
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
