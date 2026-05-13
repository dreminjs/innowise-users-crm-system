"use client";

import { useQuery } from "@apollo/client/react";
import { GET_PROJECTS } from "../api/queries";
export const useGetProjects = () => {
  return useQuery(GET_PROJECTS);
};
