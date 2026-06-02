"use client";
import { FC, useState } from "react";
import { Popover } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { GetUsersQuery } from "@/graphql/graphql";
import { UserAction } from "./UserAction";
import styles from "./UserAction.module.css";
import { EditUserModal } from "@/modules/Users/ui/EditUserModal/EditUserModal";
import { useDeleteUser } from "@/modules/Users/model/hooks/useDeleteUser";
import { useUpdateUserData } from "@/modules/Users/model/hooks/useUpdateUserData";
import { useUserStore } from "@/application/store/user.store";

interface IUserActionsProps {
  user: GetUsersQuery["users"][number];
}

export const UserActions: FC<IUserActionsProps> = ({ user }) => {
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { deleteUser } = useDeleteUser();
  const { submitAction, loading } = useUpdateUserData({
    userId: user.id,
  });
  const currentUserRole = useUserStore((state) => state.role);
  const t = useTranslations("UserActions");
  const handleDelete = async () => {
    await deleteUser(user.id);
    setIsPopoverVisible(false);
  };

  return (
    <>
      <Popover.Root
        open={isPopoverVisible}
        onOpenChange={(e) => setIsPopoverVisible(e.open)}
      >
        <Popover.Trigger asChild>
          <button className={styles.actionsTrigger}>⋮</button>
        </Popover.Trigger>
        <Popover.Positioner>
          <Popover.Content width={130} className={styles.actionContainer}>
            <Popover.CloseTrigger />
            <ul>
              <UserAction to={`users/${user.id}`}>{t("profile")}</UserAction>
              <li className={styles.userActionsItem}>
                <button
                  type="button"
                  data-testid="edit-btn"
                  onClick={() => {
                    setIsPopoverVisible(false);
                    setIsEditModalOpen(true);
                  }}
                  className={styles.actionButton}
                >
                  {t("edit")}
                </button>
              </li>
              {currentUserRole === "Admin" && (
                <li className={styles.userActionsItem}>
                  <button
                    type="button"
                    onClick={handleDelete}
                    data-testid="delete-btn"
                    className={styles.deleteButton}
                  >
                    {t("delete")}
                  </button>
                </li>
              )}
            </ul>
          </Popover.Content>
        </Popover.Positioner>
      </Popover.Root>
      <EditUserModal
        open={isEditModalOpen}
        loading={loading}
        closeAction={() => setIsEditModalOpen(false)}
        submitAction={submitAction}
        defaultValues={{
          email: user.email,
          password: "",
          firstName: user.profile?.first_name ?? "",
          lastName: user.profile?.last_name ?? "",
          departmentId: user.department?.id ?? "",
          positionId: user.position?.id ?? "",
          role: user.role ?? "Employee",
        }}
      />
    </>
  );
};
