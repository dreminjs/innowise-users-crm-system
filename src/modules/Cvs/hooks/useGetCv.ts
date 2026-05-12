"use client";

import { useQuery } from "@apollo/client/react";
import { GET_CV } from "@/modules/Cvs/api/queries";

export const useGetCv = (cvId: string) => {
  return useQuery(GET_CV, {
    variables: {
      cvId,
    },
    fetchPolicy: "network-only",
  });
};
