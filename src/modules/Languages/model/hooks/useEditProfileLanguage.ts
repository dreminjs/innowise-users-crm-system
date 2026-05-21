"use client";
import { useTranslations } from "next-intl";
import { useMutation, useQuery } from "@apollo/client/react";
import { useUserStore } from "@/application/store/user.store";
import { useNotification } from "@/modules/Notifications";
import { GET_LANGUAGES, GET_PROFILE_LANGUAGES } from "../../api/queries";
import { UPDATE_PROFILE_LANGUAGE } from "../../api/mutations";
import { TLanguageForm } from "../languages.interface";

export const useEditProfileLanguage = () => {
  const { data: languagesData } = useQuery(GET_LANGUAGES);
  const currentUserId = useUserStore((state) => state.userId);
  const t = useTranslations("Notifications");
  const addNotification = useNotification((state) => state.addNotification);
  const [mutate, { loading, error }] = useMutation(UPDATE_PROFILE_LANGUAGE, {
    onCompleted: () => {
      addNotification({
        message: t("languageUpdatedSuccessfully"),
        type: "success",
      });
    },

    onError: () => {
      addNotification({
        message: t("failedToUpdateLanguage"),
        type: "error",
      });
    },
    refetchQueries: [
      {
        query: GET_PROFILE_LANGUAGES,
        variables: {
          userId: currentUserId,
        },
      },
    ],
  });
  const handleEditProfileLanguage = async (dto: TLanguageForm) => {
    if (currentUserId && languagesData?.languages) {
      await mutate({
        variables: {
          dto: {
            name: dto.name,
            proficiency: dto.proficiency,
            userId: currentUserId,
          },
        },
      });
    }
  };
  return {
    handleEditProfileLanguage,
    loading,
    error,
  };
};
