"use client";

import { useMutation } from "@apollo/client/react";
import { CREATE_SKILL } from "../../api/mutations";
import { GET_SKILLS } from "../../api/queries";

export const useCreateSkill = () => {
  const [createSkill, result] = useMutation(CREATE_SKILL, {
    refetchQueries: [GET_SKILLS],
  });

  return {
    createSkill,
    ...result,
  };
};
