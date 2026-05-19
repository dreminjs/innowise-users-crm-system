"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { UserForm } from "../UserForm/UserForm";
import { TUserFormValues } from "../../model/user-form.types";
import { AddItemModal } from "@/shared/ui/AddItemModal";

type Props = {
  open: boolean;
  loading?: boolean;
  closeAction: () => void;
  submitAction: (values: TUserFormValues) => Promise<void>;
};

export const CreateUserModal = ({
  open,
  loading,
  closeAction,
  submitAction,
}: Props) => {
  const t = useTranslations("Notifications");

  const [serverError, setServerError] = useState("");

  const handleSubmit = async (values: TUserFormValues) => {
    try {
      setServerError("");

      await submitAction(values);

      closeAction();
    } catch (error) {
      if (error instanceof Error && error.message.includes("duplicate key")) {
        setServerError(t("emailAlreadyExists"));

        return;
      }

      throw error;
    }
  };

  return (
    <AddItemModal
      open={open}
      toggleAction={closeAction}
      title={t("createUserTitle")}
    >
      <UserForm
        mode="create"
        loading={loading}
        submitAction={handleSubmit}
        cancelAction={closeAction}
        serverError={serverError}
      />
    </AddItemModal>
  );
};
