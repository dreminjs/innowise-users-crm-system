"use client";
import { useTranslations } from "next-intl";
import { useMutation, useQuery } from "@apollo/client/react";
import { useNotification } from "@/modules/Notifications";
import { TLanguageForm } from "../languages.interface";
import { GET_LANGUAGES, GET_PROFILE_LANGUAGES } from "../../api/queries";
import { ADD_PROFILE_LANGUAGE } from "../../api/mutations";

export const useAddProfileLanguage = (currentUserId: string) => {
  const { data: languageData } = useQuery(GET_LANGUAGES);
  const addNotification = useNotification((state) => state.addNotification);
  const t = useTranslations("Notifications");
  const [mutate, { loading, error }] = useMutation(ADD_PROFILE_LANGUAGE, {
    onCompleted: () => {
      addNotification({
        message: t("languageAddedSuccessfully"),
        type: "success",
      });
    },

    onError: () => {
      addNotification({
        message: t("failedToAddLanguage"),
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

  return {
    handleAddProfileLanguage,
    loading,
    error,
  };
};
