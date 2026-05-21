"use client";

import { useMutation } from "@apollo/client/react";

import { DELETE_SKILL } from "../../api/mutations";
import { GET_SKILLS } from "../../api/queries";

export const useDeleteSkill = () => {
  const [deleteSkill, result] = useMutation(DELETE_SKILL, {
    refetchQueries: [GET_SKILLS],
  });

  return {
    deleteSkill,
    ...result,
  };
};
