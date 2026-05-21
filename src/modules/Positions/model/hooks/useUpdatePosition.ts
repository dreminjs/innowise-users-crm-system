"use client";

import { useMutation } from "@apollo/client/react";
import { GET_POSITIONS } from "../../api/queries";
import { UPDATE_POSITION } from "../../api/mutations";

export const useUpdatePosition = () => {
  const [updatePosition, result] = useMutation(UPDATE_POSITION, {
    refetchQueries: [GET_POSITIONS],
  });

  return {
    updatePosition,
    ...result,
  };
};
