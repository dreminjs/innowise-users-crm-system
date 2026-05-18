"use client";

import { GetCvsQuery } from "@/graphql/graphql";
import { CvSortField, CvSortOrder } from "../../model/lib/processCvs";
import { CVsTableRow } from "./CVsTableRow";
import styles from "./CVsTable.module.css";
import { Loading } from "@/shared/ui/Loading";

type Props = {
  cvs: GetCvsQuery["cvs"];
  sortField: CvSortField;
  sortOrder: CvSortOrder;
  sortAction: (field: CvSortField) => void;
  loading: boolean;
};

export const CVsTable = ({
  cvs,
  sortField,
  sortOrder,
  sortAction,
  loading,
}: Props) => {
  if (loading) {
    return <Loading />;
  }

  if (!cvs.length) {
    return <div className={styles.empty}>No CVs found</div>;
  }

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead className={styles.header}>
          <tr>
            <th className={styles.nameColumn}>
              <button
                className={styles.sortButton}
                onClick={() => sortAction("name")}
              >
                Name
                {sortField === "name" && (sortOrder === "asc" ? " ↑" : " ↓")}
              </button>
            </th>
            <th>
              <button
                className={styles.sortButton}
                onClick={() => sortAction("education")}
              >
                Education
                {sortField === "education" &&
                  (sortOrder === "asc" ? " ↑" : " ↓")}
              </button>
            </th>
            <th className={styles.userColumn}>Employee</th>
            <th className={styles.actionsColumn} />
          </tr>
        </thead>
        <tbody>
          {cvs.map((cv) => (
            <CVsTableRow key={cv.id} cv={cv} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
