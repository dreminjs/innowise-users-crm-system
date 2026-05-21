"use client";

import { useMutation } from "@apollo/client/react";
import { GET_LANGUAGES } from "../../api/queries";
import { CREATE_LANGUAGE } from "../../api/mutations";

export const useCreateLanguage = () => {
  const [createLanguage, result] = useMutation(CREATE_LANGUAGE, {
    refetchQueries: [GET_LANGUAGES],
  });

  return {
    createLanguage,
    ...result,
  };
};
