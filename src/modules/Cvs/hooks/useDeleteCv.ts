"use client";

import { useMutation } from "@apollo/client/react";
import { DELETE_CV } from "@/modules/Cvs/api/mutations";
import { GET_CVS } from "@/modules/Cvs/api/queries";

export const useDeleteCv = () => {
  return useMutation(DELETE_CV, {
    refetchQueries: [GET_CVS],
    awaitRefetchQueries: true,
  });
};
