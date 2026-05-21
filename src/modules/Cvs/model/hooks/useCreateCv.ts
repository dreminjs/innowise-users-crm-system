"use client";

import { useMutation } from "@apollo/client/react";
import { CREATE_CV } from "../../api/mutations";
import { GET_CVS } from "../../api/queries";
import { useNotification } from "@/modules/Notifications";
import { useTranslations } from "next-intl";

export const useCreateCv = () => {
  const t = useTranslations("CvDetails");

  const addNotification = useNotification((state) => state.addNotification);
  return useMutation(CREATE_CV, {
    refetchQueries: [GET_CVS],
    awaitRefetchQueries: true,
    onCompleted: () => {
      addNotification({ message: t("created"), type: "success" });
    },
    onError: (error) => {
      addNotification({ message: error.message, type: "error" });
    },
  });
};
