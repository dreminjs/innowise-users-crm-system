"use client";
import { useTranslations } from "next-intl";
import { UserForm } from "../UserForm/UserForm";
import { AddItemModal } from "@/shared/ui/AddItemModal";
import { TUserFormValues } from "@/modules/Users/model/user-form.schema";

type Props = {
  open: boolean;
  loading?: boolean;
  defaultValues?: Partial<TUserFormValues>;
  closeAction: () => void;
  submitAction: (values: TUserFormValues) => Promise<void>;
};

export const EditUserModal = ({
  open,
  loading,
  defaultValues,
  closeAction,
  submitAction,
}: Props) => {
  const t = useTranslations("Users");

  return (
    <AddItemModal
      open={open}
      toggleAction={closeAction}
      title={t("edit.title")}
    >
      <UserForm
        mode="edit"
        loading={loading}
        defaultValues={defaultValues}
        submitAction={submitAction}
        cancelAction={closeAction}
      />
    </AddItemModal>
  );
};
