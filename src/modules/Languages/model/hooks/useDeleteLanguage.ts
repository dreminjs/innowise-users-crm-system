"use client";

import { useMutation } from "@apollo/client/react";
import { GET_LANGUAGES } from "../../api/queries";
import { DELETE_LANGUAGE } from "../../api/mutations";

export const useDeleteLanguage = () => {
  const [deleteLanguage, result] = useMutation(DELETE_LANGUAGE, {
    refetchQueries: [GET_LANGUAGES],
  });

  return {
    deleteLanguage,
    ...result,
  };
};
