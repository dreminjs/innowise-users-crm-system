"use client";

import { useMutation } from "@apollo/client/react";
import { CREATE_CV } from "@/modules/Cvs/api/mutations";
import { GET_CVS } from "@/modules/Cvs/api/queries";

export const useCreateCv = () => {
  return useMutation(CREATE_CV, {
    refetchQueries: [GET_CVS],
    awaitRefetchQueries: true,
  });
};
