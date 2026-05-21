"use client";

import { useMutation } from "@apollo/client/react";
import { GET_DEPARTMENTS } from "../../api/queries";
import { UPDATE_DEPARTMENT } from "../../api/mutations";

export const useUpdateDepartment = () => {
  const [updateDepartment, result] = useMutation(UPDATE_DEPARTMENT, {
    refetchQueries: [GET_DEPARTMENTS],
  });
  return {
    updateDepartment,
    ...result,
  };
};
