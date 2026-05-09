import { GetUsersQuery } from "@/graphql/graphql";
import { Avatar } from "@/shared/ui/Avatar/Avatar";
import { UserActions } from "./UserActions/UserActions";
import styles from "./UsersTableRow.module.css";

type Props = {
  user: GetUsersQuery["users"][number];
};

export const UserTableRow = ({ user }: Props) => {
  return (
    <tr className={styles.row}>
      <td>
        <Avatar
          firstName={user.profile?.first_name}
          lastName={user.profile?.last_name}
          avatar={user.profile?.avatar}
        />
      </td>
      <td>{user.profile?.first_name ?? "-"}</td>
      <td>{user.profile?.last_name ?? "-"}</td>
      <td className={styles.email}>{user.email}</td>
      <td>{user?.department_name ?? "-"}</td>
      <td>{user?.position_name ?? "-"}</td>
      <UserActions userId={user.id} />
    </tr>
  );
};
