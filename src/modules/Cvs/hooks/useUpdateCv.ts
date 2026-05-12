"use client";

import { useMutation } from "@apollo/client/react";
import { UPDATE_CV } from "@/modules/Cvs/api/mutations";
import { GET_CVS } from "@/modules/Cvs/api/queries";

export const useUpdateCv = () => {
  return useMutation(UPDATE_CV, {
    refetchQueries: [GET_CVS],
    awaitRefetchQueries: true,
  });
};
