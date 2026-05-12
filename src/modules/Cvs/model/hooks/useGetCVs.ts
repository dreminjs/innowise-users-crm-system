"use client";

import { useQuery } from "@apollo/client/react";
import { GET_CVS } from "../../api/queries";

export const useGetCVs = () => {
  return useQuery(GET_CVS);
};
