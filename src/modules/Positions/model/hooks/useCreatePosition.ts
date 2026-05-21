"use client";

import { useMutation } from "@apollo/client/react";
import { GET_POSITIONS } from "../../api/queries";
import { CREATE_POSITION } from "../../api/mutations";

export const useCreatePosition = () => {
  const [createPosition, result] = useMutation(CREATE_POSITION, {
    refetchQueries: [GET_POSITIONS],
  });

  return {
    createPosition,
    ...result,
  };
};
