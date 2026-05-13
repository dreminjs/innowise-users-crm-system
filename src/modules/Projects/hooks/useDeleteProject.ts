"use client";

import { useMutation } from "@apollo/client/react";
import { DELETE_PROJECT } from "../api/mutations";
import { GET_PROJECTS } from "../api/queries";

export const useDeleteProject = () => {
  return useMutation(DELETE_PROJECT, {
    refetchQueries: [GET_PROJECTS],
  });
};
