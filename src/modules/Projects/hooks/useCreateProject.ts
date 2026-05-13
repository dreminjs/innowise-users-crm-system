"use client";

import { useMutation } from "@apollo/client/react";
import { CREATE_PROJECT } from "../api/mutations";
import { GET_CV_PROJECTS } from "../api/queries";

export const useCreateProject = (cvId: string) => {
  return useMutation(CREATE_PROJECT, {
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
