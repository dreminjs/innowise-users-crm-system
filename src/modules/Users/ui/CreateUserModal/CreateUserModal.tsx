"use client";

import { useTranslations } from "next-intl";
import { UserForm } from "../UserForm/UserForm";
import { TUserFormValues } from "../../model/user-form.types";
import { AddItemModal } from "@/shared/ui/AddItemModal";

type Props = {
  open: boolean;
  loading?: boolean;
  onClose: () => void;
  onSubmit: (values: TUserFormValues) => Promise<void>;
};

export const CreateUserModal = ({
  open,
  loading,
  onClose,
  onSubmit,
}: Props) => {
  const t = useTranslations("Users");

  return (
    <AddItemModal open={open} toggleAction={onClose} title={t("create.title")}>
      <UserForm
        mode="create"
        loading={loading}
        onSubmit={onSubmit}
        onCancel={onClose}
      />
    </AddItemModal>
  );
};
