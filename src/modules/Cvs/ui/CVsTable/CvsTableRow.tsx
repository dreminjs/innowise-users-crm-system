"use client";

import { GetCvsQuery } from "@/graphql/graphql";
import styles from "./CVsTable.module.css";
import { CvActions } from "@/modules/Cvs/ui/CVsTable/CvActions/CvActions";

type Props = {
  cv: GetCvsQuery["cvs"][number];
};

export const CVsTableRow = ({ cv }: Props) => {
  const employeeName = cv.user?.email || "-";
  return (
    <>
      <tr className={styles.metaRow}>
        <td className={styles.name}>
          <span className={styles.cellContent}>{cv.name}</span>
        </td>
        <td className={styles.education}>
          <span className={styles.cellContent}>{cv.education ?? "-"}</span>
        </td>
        <td className={styles.employee}>
          <span className={styles.cellContent}>{employeeName}</span>
        </td>
        <td className={styles.actions}>
          <CvActions
            cvId={cv.id}
            onDelete={(id) => {
              console.log(id);
            }}
          />
        </td>
      </tr>
      <tr className={styles.descriptionRow}>
        <td colSpan={4} className={styles.description}>
          <span className={styles.descriptionContent}>{cv.description}</span>
        </td>
      </tr>
    </>
  );
};
