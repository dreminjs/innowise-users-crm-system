"use client";

import { useMutation } from "@apollo/client/react";
import { RESET_PASSWORD } from "../../api/mutations";
import { useNotification } from "@/modules/Notifications";
import { useRouter } from "next/navigation";
import { TResetPasswordFormData } from "../auth.types";
import { useTranslations } from "next-intl";

export const useResetPassword = () => {
  const t = useTranslations("resetPassword");

  const addNotification = useNotification((state) => state.addNotification);
  const push = useRouter().push;
  const [mutate, { loading }] = useMutation(RESET_PASSWORD, {
    onCompleted: () => {
      addNotification({ message: t("sendedMailSuccessfuly"), type: "success" });
      push("/auth/signin");
    },
    onError: (_) => {
      addNotification({ message: t("sendedMailFailed"), type: "error" });
    },
  });
  const onSubmit = (dto: TResetPasswordFormData) => {
    mutate({ variables: { dto } });
  };
  return { onSubmit, loading };
};
