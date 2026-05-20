"use client";

import { useMutation } from "@apollo/client/react";
import { GET_LANGUAGES } from "../../api/queries";
import { UPDATE_LANGUAGE } from "../../api/mutations";

export const useUpdateLanguage = () => {
  const [updateLanguage, result] = useMutation(UPDATE_LANGUAGE, {
    refetchQueries: [GET_LANGUAGES],
  });

  return {
    updateLanguage,
    ...result,
  };
};
