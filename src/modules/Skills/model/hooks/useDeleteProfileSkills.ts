"use client";
import { useTranslations } from "next-intl";
import { useMutation } from "@apollo/client/react";
import { useSkillStore } from "../skill.store";
import { useNotification } from "@/modules/Notifications";
import { DELETE_PROFILE_SKILL } from "../../api/mutations";
import { GET_PROFILE_SKILLS } from "../../api/queries";

export const useDeleteProfileSkills = (userId: string) => {
  const addNotification = useNotification((state) => state.addNotification);
  const { deleteSkills, clearDeleteSkills, toggleDeleteMode } = useSkillStore();
  const t = useTranslations("Notifications");
  const [mutate, { loading, error }] = useMutation(DELETE_PROFILE_SKILL, {
    onCompleted: () => {
      addNotification({
        message: t("skillDeletedSuccessfully"),
        type: "success",
      });
      clearDeleteSkills();
      toggleDeleteMode();
    },
    onError: () => {
      addNotification({
        message: t("failedToDeleteSkill"),
        type: "error",
      });
      clearDeleteSkills();
      toggleDeleteMode();
    },
    refetchQueries: [
      {
        query: GET_PROFILE_SKILLS,
        variables: {
          userId: userId,
        },
      },
    ],
  });
  const handleDeleteProfileSkills = () => {
    if (userId) {
      mutate({
        variables: {
          dto: {
            name: Object.values(deleteSkills),
            userId: userId,
          },
        },
      });
    }
  };
  return {
    handleDeleteProfileSkills,
    loading,
    error,
  };
};
