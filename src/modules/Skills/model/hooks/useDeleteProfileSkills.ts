import { useMutation } from "@apollo/client/react";
import { useSkillStore } from "../skill.store";
import { useUserStore } from "@/application/store/user.store";
import { useNotification } from "@/modules/Notifications";
import { DELETE_PROFILE_SKILL } from "../../api/mutations";
import { GET_PROFILE_SKILLS } from "../../api/queries";

export const useDeleteProfileSkills = () => {
  const addNotification = useNotification((state) => state.addNotification);
  const currentUserId = useUserStore((state) => state.userId);
  const { deleteSkills, clearDeleteSkills, toggleDeleteMode } = useSkillStore();
  const [mutate, { loading, error }] = useMutation(DELETE_PROFILE_SKILL, {
    onCompleted: () => {
      addNotification({
        message: "Skills deleted successfully",
        type: "success",
      });
      clearDeleteSkills();
      toggleDeleteMode();
    },
    onError: () => {
      addNotification({ message: "Failed to delete skills", type: "error" });
      clearDeleteSkills();
      toggleDeleteMode();
    },
    refetchQueries: [
      { query: GET_PROFILE_SKILLS, variables: { userId: currentUserId } },
    ],
  });

  const handleDeleteProfileSkills = () => {
    if (currentUserId) {
      mutate({
        variables: {
          dto: {
            name: Object.values(deleteSkills),
            userId: currentUserId,
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
