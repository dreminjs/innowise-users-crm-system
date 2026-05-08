import { GetUsersQuery } from "@/graphql/graphql";

import { UsersTableHeader } from "./UsersTableHeader";
import styles from "./UsersTable.module.css";
import { SortField, SortOrder } from "@/modules/Users/model/usersTable.types";
import { UserTableRow } from "@/modules/Users/ui/UsersTable/UsersTableRow/UsersTableRow";

type Props = {
  users: GetUsersQuery["users"];
  sortField: SortField;
  sortOrder: SortOrder;
  onSort: (field: SortField) => void;
};

export const UsersTable = ({ users, sortField, sortOrder, onSort }: Props) => {
  if (!users.length) {
    return <div className={styles.empty}>No users found</div>;
  }

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <UsersTableHeader
          sortField={sortField}
          sortOrder={sortOrder}
          onSort={onSort}
        />
        <tbody>
          {users.map((user) => (
            <UserTableRow key={user.id} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
