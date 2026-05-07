import styles from "./UsersTable.module.css";
import { SortField, SortOrder } from "@/modules/Users/model/usersTable.types";

type Props = {
  sortField: SortField;
  sortOrder: SortOrder;
  onSort: (field: SortField) => void;
};

export const UsersTableHeader = ({ sortField, sortOrder, onSort }: Props) => {
  const renderArrow = (field: SortField) => {
    if (sortField !== field) {
      return null;
    }

    return sortOrder === "asc" ? "↑" : "↓";
  };

  return (
    <thead>
      <tr className={styles.header}>
        <th className={styles.avatarColumn} />

        <th className={styles.nameColumn}>
          <button
            className={styles.sortButton}
            onClick={() => onSort("first_name")}
          >
            First Name
            <span>{renderArrow("first_name")}</span>
          </button>
        </th>

        <th className={styles.nameColumn}>
          <button
            className={styles.sortButton}
            onClick={() => onSort("last_name")}
          >
            Last Name
            <span>{renderArrow("last_name")}</span>
          </button>
        </th>

        <th className={styles.emailColumn}>
          <button className={styles.sortButton} onClick={() => onSort("email")}>
            Email
            <span>{renderArrow("email")}</span>
          </button>
        </th>

        <th>
          <button
            className={styles.sortButton}
            onClick={() => onSort("department")}
          >
            Department
            <span>{renderArrow("department")}</span>
          </button>
        </th>

        <th>
          <button
            className={styles.sortButton}
            onClick={() => onSort("position")}
          >
            Position
            <span>{renderArrow("position")}</span>
          </button>
        </th>

        <th className={styles.actionsColumn} />
      </tr>
    </thead>
  );
};
