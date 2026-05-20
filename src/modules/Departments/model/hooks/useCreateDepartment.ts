"use client";

import { useMutation } from "@apollo/client/react";
import { GET_DEPARTMENTS } from "../../api/queries";
import { CREATE_DEPARTMENT } from "../../api/mutations";

export const useCreateDepartment = () => {
  const [createDepartment, result] = useMutation(CREATE_DEPARTMENT, {
    refetchQueries: [GET_DEPARTMENTS],
  });

  return {
    createDepartment,
    ...result,
  };
};
