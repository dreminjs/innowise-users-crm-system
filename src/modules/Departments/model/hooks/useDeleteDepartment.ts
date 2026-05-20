"use client";

import { useMutation } from "@apollo/client/react";
import { GET_DEPARTMENTS } from "../../api/queries";
import { DELETE_DEPARTMENT } from "../../api/mutations";

export const useDeleteDepartment = () => {
  const [deleteDepartment, result] = useMutation(DELETE_DEPARTMENT, {
    refetchQueries: [GET_DEPARTMENTS],
  });
  return {
    deleteDepartment,
    ...result,
  };
};
