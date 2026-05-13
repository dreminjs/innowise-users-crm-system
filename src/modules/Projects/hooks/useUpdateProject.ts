"use client";

import { useMutation } from "@apollo/client/react";
import { UPDATE_PROJECT } from "../api/mutations";
import { GET_PROJECTS } from "../api/queries";

export const useUpdateProject = () => {
  return useMutation(UPDATE_PROJECT, {
    refetchQueries: [GET_PROJECTS],
  });
};
