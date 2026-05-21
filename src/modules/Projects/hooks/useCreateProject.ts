"use client";

import { useMutation } from "@apollo/client/react";
import { CREATE_PROJECT } from "@/modules/Projects/api/mutations";
import { GET_PROJECTS } from "@/modules/Projects/api/queries";

export const useCreateProject = () => {
  const [createProject, result] = useMutation(CREATE_PROJECT, {
    refetchQueries: [GET_PROJECTS],
  });

  return {
    createProject,
    ...result,
  };
};
