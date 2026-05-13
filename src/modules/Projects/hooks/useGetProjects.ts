"use client";

import { useQuery } from "@apollo/client/react";
import { GET_CV_PROJECTS } from "@/modules/Projects/api/queries";

export const useGetProjects = (cvId: string) => {
  return useQuery(GET_CV_PROJECTS, {
    variables: {
      cvId,
    },
  });
};
