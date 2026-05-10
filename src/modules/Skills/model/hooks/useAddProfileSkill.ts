import { useMutation, useQuery } from "@apollo/client/react";
import { useUserStore } from "@/application/store/user.store";
import { useNotification } from "@/modules/Notifications";
import { ADD_PROFILE_SKILL } from "../../api/mutations";
import {
  GET_PROFILE_SKILLS,
  GET_SKILL_CATEGORIES,
  GET_SKILLS,
} from "../../api/queries";
import { TSkillForm } from "../skill.interface";

export const useAddProfileSkill = () => {
  const { data: skillsData } = useQuery(GET_SKILLS);

  const currentUserId = useUserStore((state) => state.userId);

  const addNotification = useNotification((state) => state.addNotification);
  const [mutate, { loading, error }] = useMutation(ADD_PROFILE_SKILL, {
    onCompleted: () => {
      addNotification({ message: "Skill added successfully", type: "success" });
    },
    onError: () => {
      addNotification({ message: "Failed to add skill", type: "error" });
    },
    refetchQueries: [
      { query: GET_PROFILE_SKILLS, variables: { userId: currentUserId } },
      { query: GET_SKILL_CATEGORIES },
    ],
  });

  const handleAddProfileSkill = async (dto: TSkillForm) => {
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

  return { handleAddProfileSkill, loading, error };
};
