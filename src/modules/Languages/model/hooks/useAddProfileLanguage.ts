import { useMutation, useQuery } from "@apollo/client/react";
import { useUserStore } from "@/application/store/user.store";
import { useNotification } from "@/modules/Notifications";
import { TLanguageForm } from "../languages.interface";
import { GET_LANGUAGES, GET_PROFILE_LANGUAGES } from "../../api/queries";
import { ADD_PROFILE_LANGUAGE } from "../../api/mutations";
import { useTranslations } from "next-intl";

export const useAddProfileLanguage = () => {
  const { data: languageData } = useQuery(GET_LANGUAGES);

  const currentUserId = useUserStore((state) => state.userId);

  const addNotification = useNotification((state) => state.addNotification);
  const t = useTranslations("Languages");

  const [mutate, { loading, error }] = useMutation(ADD_PROFILE_LANGUAGE, {
    onCompleted: () => {
      addNotification({
        message: t("addedSuccessfully"),
        type: "success",
      });
    },
    onError: () => {
      addNotification({ message: t("failedAdd"), type: "error" });
    },
    refetchQueries: [
      { query: GET_PROFILE_LANGUAGES, variables: { userId: currentUserId } },
    ],
  });

  const handleAddProfileLanguage = async (dto: TLanguageForm) => {
    if (currentUserId && languageData?.languages) {
      await mutate({
        variables: {
          dto: {
            userId: currentUserId,
            name: dto.name,
            proficiency: dto.proficiency,
          },
        },
      });
    }
  };

  return { handleAddProfileLanguage, loading, error };
};
