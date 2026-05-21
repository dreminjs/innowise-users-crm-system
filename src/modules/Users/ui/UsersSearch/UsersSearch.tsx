"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { SearchToolbar } from "@/shared/ui/SearchToolbar/SearchToolbar";
import { useUserStore } from "@/application/store/user.store";
import { CreateUserModal } from "../CreateUserModal/CreateUserModal";
import { useCreateUser } from "../../model/hooks/useCreateUser";
import { UserRole } from "@/generated/graphql";
type Props = {
  value: string;
  changeAction: (value: string) => void;
};
export const UsersSearch = ({ value, changeAction }: Props) => {
  const t = useTranslations("Users");
  const role = useUserStore((state) => state.role);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { submitAction, loading } = useCreateUser();
  const isAdmin = role === UserRole.Admin;
  return (
    <>
      <SearchToolbar
        value={value}
        changeAction={changeAction}
        buttonLabel={isAdmin ? t("create.title") : undefined}
        createAction={isAdmin ? () => setIsModalOpen(true) : undefined}
      />
      <CreateUserModal
        open={isModalOpen}
        loading={loading}
        closeAction={() => setIsModalOpen(false)}
        submitAction={async (values) => {
          await submitAction(values);
          setIsModalOpen(false);
        }}
      />
    </>
  );
};
