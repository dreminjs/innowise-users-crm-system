"use client";
import { useTranslations } from "next-intl";
import { useMutation } from "@apollo/client/react";
import { FORGOT_PASSWORD } from "../../api/mutations";
import { ForgotPasswordInput } from "@/generated/graphql";
import { useNotification } from "@/modules/Notifications";

export const useForgotPassword = () => {
  const t = useTranslations("Notifications");
  const addNotification = useNotification((state) => state.addNotification);
  const [forgotPassword, { loading, error }] = useMutation(FORGOT_PASSWORD, {
    onCompleted() {
      addNotification({
        message: t("checkYourEmail"),
        type: "success",
      });
    },
    onError: (error) => {
      addNotification({
        message: error.message,
        type: "error",
      });
    },
  });
  return {
    onSubmit: (data: ForgotPasswordInput) => {
      forgotPassword({
        variables: {
          dto: data,
        },
      });
    },
    loading,
    error,
  };
};
