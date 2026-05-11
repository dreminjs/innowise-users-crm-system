import { useMutation } from "@apollo/client/react";
import { useUserStore } from "@/application/store/user.store";
import { useNotification } from "@/modules/Notifications";
import { useLanguageStore } from "../language.store";
import { DELETE_PROFILE_LANGUAGE } from "../../api/mutations";
import { GET_PROFILE_LANGUAGES } from "../../api/queries";

export const useDeleteProfileLanguages = () => {
  const addNotification = useNotification((state) => state.addNotification);
  const currentUserId = useUserStore((state) => state.userId);
  const { clearDeleteLanguages, toggleDeleteMode, deleteLanguages } =
    useLanguageStore();
  const [mutate, { loading, error }] = useMutation(DELETE_PROFILE_LANGUAGE, {
    onCompleted: () => {
      addNotification({
        message: "Languages deleted successfully",
        type: "success",
      });
      clearDeleteLanguages();
      toggleDeleteMode();
    },
    onError: () => {
      addNotification({ message: "Failed to delete Languages", type: "error" });
      clearDeleteLanguages();
      toggleDeleteMode();
    },
    refetchQueries: [
      { query: GET_PROFILE_LANGUAGES, variables: { userId: currentUserId } },
    ],
  });

  const handleDeleteProfileLanguages = () => {
    if (currentUserId) {
      mutate({
        variables: {
          dto: {
            name: Object.values(deleteLanguages),
            userId: currentUserId,
          },
        },
      });
    }
  };

  return {
    handleDeleteProfileLanguages,
    loading,
    error,
  };
};
