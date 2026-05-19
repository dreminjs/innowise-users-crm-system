"use client";
import { useTranslations } from "next-intl";
import { UserForm } from "../UserForm/UserForm";
import { TUserFormValues } from "../../model/user-form.types";
import { AddItemModal } from "@/shared/ui/AddItemModal";

type Props = {
  open: boolean;
  loading?: boolean;
  defaultValues?: Partial<TUserFormValues>;
  onClose: () => void;
  submitAction: (values: TUserFormValues) => Promise<void>;
};

export const EditUserModal = ({
  open,
  loading,
  defaultValues,
  onClose,
  submitAction,
}: Props) => {
  const t = useTranslations("Users");

  return (
    <AddItemModal open={open} toggleAction={onClose} title={t("edit.title")}>
      <UserForm
        mode="edit"
        loading={loading}
        defaultValues={defaultValues}
        submitAction={submitAction}
        cancelAction={onClose}
      />
    </AddItemModal>
  );
};
