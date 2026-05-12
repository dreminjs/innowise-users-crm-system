"use client";

import { GetCvsQuery } from "@/graphql/graphql";
import styles from "./CvsTable.module.css";
import { CvsTableRow } from "./CvsTableRow";
import { CvSortField, CvSortOrder } from "../../model/lib/sortCvs";

type Props = {
  cvs: GetCvsQuery["cvs"];
  sortField: CvSortField;
  sortOrder: CvSortOrder;
  onSort: (field: CvSortField) => void;
};

export const CVsTable = ({ cvs, sortField, sortOrder, onSort }: Props) => {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead className={styles.header}>
          <tr>
            <th className={styles.nameColumn}>
              <button
                className={styles.sortButton}
                onClick={() => onSort("name")}
              >
                Name
                {sortField === "name" && (sortOrder === "asc" ? " ↑" : " ↓")}
              </button>
            </th>
            <th>Education</th>
            <th className={styles.userColumn}>
              <button
                className={styles.sortButton}
                onClick={() => onSort("user")}
              >
                Employee
                {sortField === "user" && (sortOrder === "asc" ? " ↑" : " ↓")}
              </button>
            </th>
            <th className={styles.actionsColumn} />
          </tr>
        </thead>
        <tbody>
          {cvs.map((cv) => (
            <CvsTableRow key={cv.id} cv={cv} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
