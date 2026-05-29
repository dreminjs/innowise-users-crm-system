"use client";
import { useTranslations } from "next-intl";
import { useMutation, useQuery } from "@apollo/client/react";
import { useNotification } from "@/modules/Notifications";
import { UPDATE_PROFILE_SKILL } from "../../api/mutations";
import {
  GET_PROFILE_SKILLS,
  GET_SKILL_CATEGORIES,
  GET_SKILLS,
} from "../../api/queries";
import { TSkillForm } from "../skill.interface";

export const useEditProfileSkill = (userId: string) => {
  const { data: skillsData } = useQuery(GET_SKILLS);
  const t = useTranslations("Notifications");
  const addNotification = useNotification((state) => state.addNotification);
  const [mutate, { loading, error }] = useMutation(UPDATE_PROFILE_SKILL, {
    onCompleted: () => {
      addNotification({
        message: t("skillUpdatedSuccessfully"),
        type: "success",
      });
    },
    onError: () => {
      addNotification({
        message: t("failedToUpdateSkill"),
        type: "error",
      });
    },
    refetchQueries: [
      {
        query: GET_PROFILE_SKILLS,
        variables: {
          userId: userId,
        },
      },
      {
        query: GET_SKILL_CATEGORIES,
      },
    ],
  });
  const handleEditProfileSkill = async (dto: TSkillForm) => {
    if (userId && skillsData?.skills) {
      await mutate({
        variables: {
          dto: {
            categoryId: dto.categoryId,
            mastery: dto.mastery,
            userId: userId,
            name:
              skillsData.skills.find((s) => s.id === dto.categoryId)?.name ||
              "Unknown",
          },
        },
      });
    }
  };
  return {
    handleEditProfileSkill,
    loading,
    error,
  };
};
