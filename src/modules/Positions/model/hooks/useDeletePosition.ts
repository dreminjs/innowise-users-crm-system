"use client";

import { useMutation } from "@apollo/client/react";
import { GET_POSITIONS } from "../../api/queries";
import { DELETE_POSITION } from "../../api/mutations";

export const useDeletePosition = () => {
  const [deletePosition, result] = useMutation(DELETE_POSITION, {
    refetchQueries: [GET_POSITIONS],
  });

  return {
    deletePosition,
    ...result,
  };
};
