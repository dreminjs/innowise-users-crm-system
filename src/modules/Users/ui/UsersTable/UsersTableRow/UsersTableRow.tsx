import Link from "next/link";
import { GetUsersQuery } from "@/graphql/graphql";
import { Avatar } from "@/shared/ui/Avatar/Avatar";
import { UserActions } from "./UserActions/UserActions";
import { useUserStore } from "@/application/store/user.store";
import styles from "./UsersTableRow.module.css";
import { Icon } from "@/shared/ui/Icon/Icon";

type Props = {
  user: GetUsersQuery["users"][number];
};

export const UserTableRow = ({ user }: Props) => {
  const role = useUserStore((state) => state.role);
  const currentUserId = useUserStore((state) => state.userId);
  const isAdmin = role === "Admin";
  const isCurrentUser = currentUserId === user.id;
  const canManageUser = isAdmin || isCurrentUser;
  return (
    <tr className={styles.row}>
      <td className={styles.avatarColumn}>
        <Avatar
          firstName={user.profile?.first_name}
          lastName={user.profile?.last_name}
          avatar={user.profile?.avatar}
        />
      </td>
      <td className={styles.firstNameColumn}>
        <div className={styles.cellContent}>
          {user.profile?.first_name ?? "-"}
        </div>
      </td>
      <td className={styles.lastNameColumn}>
        <div className={styles.cellContent}>
          {user.profile?.last_name ?? "-"}
        </div>
      </td>
      <td className={styles.emailColumn}>
        <div className={styles.cellContent}>{user.email}</div>
      </td>
      <td className={styles.departmentColumn}>
        <div className={styles.cellContent}>{user.department_name ?? "-"}</div>
      </td>
      <td className={styles.positionColumn}>
        <div className={styles.cellContent}>{user.position_name ?? "-"}</div>
      </td>
      <td className={styles.actionsColumn}>
        {canManageUser ? (
          <UserActions user={user} />
        ) : (
          <Link href={`/users/${user.id}`}>
            <Icon name={"arrow"} size={12} />
          </Link>
        )}
      </td>
    </tr>
  );
};
