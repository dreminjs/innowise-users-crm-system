import { useMutation, useQuery } from "@apollo/client/react";
import { useUserStore } from "@/application/store/user.store";
import { useNotification } from "@/modules/Notifications";
import { UPDATE_PROFILE_SKILL } from "../../api/mutations";
import {
  GET_PROFILE_SKILLS,
  GET_SKILL_CATEGORIES,
  GET_SKILLS,
} from "../../api/queries";
import { TSkillForm } from "../skill.interface";

export const useEditProfileSkill = () => {
  const { data: skillsData } = useQuery(GET_SKILLS);
  // const { data: categoriesData } = useQuery(GET_SKILL_CATEGORIES);
  const currentUserId = useUserStore((state) => state.userId);

  const addNotification = useNotification((state) => state.addNotification);
  const [mutate, { loading, error }] = useMutation(UPDATE_PROFILE_SKILL, {
    onCompleted: () => {
      addNotification({
        message: "Skill edited successfully",
        type: "success",
      });
    },
    onError: () => {
      addNotification({ message: "Failed to edit skill", type: "error" });
    },
    refetchQueries: [
      { query: GET_PROFILE_SKILLS, variables: { userId: currentUserId } },
      { query: GET_SKILL_CATEGORIES },
    ],
  });

  const handleEditProfileSkill = async (dto: TSkillForm) => {
    if (currentUserId && skillsData?.skills) {
      mutate({
        variables: {
          dto: {
            categoryId: dto.categoryId,
            mastery: dto.mastery,
            userId: currentUserId,
            name:
              skillsData.skills.find((s) => s.id === dto.categoryId)?.name ||
              "Unknown",
          },
        },
      });
    }
  };

  return { handleEditProfileSkill, loading, error };
};
