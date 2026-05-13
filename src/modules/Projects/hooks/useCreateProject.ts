"use client";

import { useMutation } from "@apollo/client/react";

import { CREATE_PROJECT } from "../api/mutations";
import { GET_PROJECTS } from "../api/queries";

export const useCreateProject = () => {
  return useMutation(CREATE_PROJECT, {
    refetchQueries: [GET_PROJECTS],
  });
};
