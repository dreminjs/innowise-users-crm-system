"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { GetUsersQuery } from "@/graphql/graphql";
import { Avatar } from "@/shared/ui/Avatar/Avatar";
import { GenericTable } from "@/shared/ui/GenericTable/GenericTable";
import { Icon } from "@/shared/ui/Icon/Icon";
import { useUserStore } from "@/application/store/user.store";
import { UserActions } from "./UsersTableRow/UserActions/UserActions";
import { SortField, SortOrder } from "@/modules/Users/model/usersTable.types";
import styles from "./UsersTable.module.css";

type Props = {
  users: GetUsersQuery["users"];
  loading: boolean;
  sortField: SortField;
  sortOrder: SortOrder;
  sortAction: (field: SortField) => void;
};

export const UsersTable = ({
  users,
  loading,
  sortField,
  sortOrder,
  sortAction,
}: Props) => {
  const t = useTranslations("Profile");

  const role = useUserStore((state) => state.role);
  const currentUserId = useUserStore((state) => state.userId);

  const columns = useMemo(() => {
    return [
      {
        key: "avatar" as SortField,
        title: "",
        sortable: false,
        className: styles.avatarColumn,
        render: (user: GetUsersQuery["users"][number]) => (
          <Avatar
            firstName={user.profile?.first_name}
            lastName={user.profile?.last_name}
            avatar={user.profile?.avatar}
          />
        ),
      },

      {
        key: "first_name",
        sortKey: "first_name" as SortField,
        title: t("firstName"),
        sortable: true,
        className: styles.nameColumn,
        render: (user: GetUsersQuery["users"][number]) => (
          <div className={styles.cellContent}>
            {user.profile?.first_name ?? "-"}
          </div>
        ),
      },

      {
        key: "last_name",
        sortKey: "last_name" as SortField,
        title: t("lastName"),
        sortable: true,
        className: styles.nameColumn,
        render: (user: GetUsersQuery["users"][number]) => (
          <div className={styles.cellContent}>
            {user.profile?.last_name ?? "-"}
          </div>
        ),
      },

      {
        key: "email",
        sortKey: "email" as SortField,
        title: "Email",
        sortable: true,
        className: styles.emailColumn,
        render: (user: GetUsersQuery["users"][number]) => (
          <div className={styles.cellContent}>{user.email}</div>
        ),
      },

      {
        key: "department",
        sortKey: "department" as SortField,
        title: t("department"),
        sortable: true,
        render: (user: GetUsersQuery["users"][number]) => (
          <div className={styles.cellContent}>
            {user.department_name ?? "-"}
          </div>
        ),
      },

      {
        key: "position",
        sortKey: "position" as SortField,
        title: t("position"),
        sortable: true,
        render: (user: GetUsersQuery["users"][number]) => (
          <div className={styles.cellContent}>{user.position_name ?? "-"}</div>
        ),
      },

      {
        key: "actions",
        title: "",
        sortable: false,
        className: styles.actionsColumn,
        render: (user: GetUsersQuery["users"][number]) => {
          const isAdmin = role === "Admin";
          const isCurrentUser = currentUserId === user.id;
          const canManageUser = isAdmin || isCurrentUser;

          return canManageUser ? (
            <UserActions user={user} />
          ) : (
            <Link href={`/users/${user.id}`}>
              <Icon name="arrow" size={12} />
            </Link>
          );
        },
      },
    ];
  }, [t, role, currentUserId]);

  return (
    <GenericTable
      data={users}
      columns={columns}
      rowKey={(user) => user.id}
      loading={loading}
      sortField={sortField}
      sortOrder={sortOrder}
      onSort={sortAction}
    />
  );
};
