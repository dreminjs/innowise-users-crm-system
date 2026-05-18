"use client";

import { useTranslations } from "next-intl";
import { GetCvsQuery } from "@/graphql/graphql";
import { CvSortField, CvSortOrder } from "../../model/lib/processCvs";
import { CVsTableRow } from "./CVsTableRow";
import { Loading } from "@/shared/ui/Loading";
import styles from "./CVsTable.module.css";
import { Empty } from "@/shared/ui/Empty";

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
  const t = useTranslations("CVsTable");
  if (loading) {
    return <Loading />;
  }
  if (!cvs.length) {
    return <Empty />;
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
                {t("name")}
                {sortField === "name" && (sortOrder === "asc" ? " ↑" : " ↓")}
              </button>
            </th>
            <th>
              <button
                className={styles.sortButton}
                onClick={() => sortAction("education")}
              >
                {t("education")}
                {sortField === "education" &&
                  (sortOrder === "asc" ? " ↑" : " ↓")}
              </button>
            </th>
            <th className={styles.userColumn}>{t("employee")}</th>
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
