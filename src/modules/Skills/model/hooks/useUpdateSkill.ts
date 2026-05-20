"use client";

import { useMutation } from "@apollo/client/react";

import { UPDATE_SKILL } from "../../api/mutations";
import { GET_SKILLS } from "../../api/queries";

export const useUpdateSkill = () => {
  const [updateSkill, result] = useMutation(UPDATE_SKILL, {
    refetchQueries: [GET_SKILLS],
  });

  return {
    updateSkill,
    ...result,
  };
};
