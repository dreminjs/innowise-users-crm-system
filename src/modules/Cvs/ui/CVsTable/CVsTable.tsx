"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { GetCvsQuery } from "@/graphql/graphql";
import { CvSortField, CvSortOrder } from "../../model/lib/processCvs";
import {
  DetailsTable,
  DetailsColumn,
} from "@/shared/ui/DetailsTable/DetailsTable";
import { CvActions } from "./CvActions/CvActions";
import styles from "./CVsTable.module.css";
type Cv = GetCvsQuery["cvs"][number];
type ColumnField = "name" | "education" | "employee" | "actions";
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
  const columns = useMemo<DetailsColumn<Cv, ColumnField, CvSortField>[]>(() => {
    return [
      {
        key: "name",
        title: t("name"),
        sortable: true,
        sortKey: "name",
        className: styles.nameColumn,
        render: (cv) => <span className={styles.cellContent}>{cv.name}</span>,
      },
      {
        key: "education",
        title: t("education"),
        sortable: true,
        sortKey: "education",
        className: styles.educationColumn,
        render: (cv) => (
          <span className={styles.cellContent}>{cv.education ?? "-"}</span>
        ),
      },
      {
        key: "employee",
        title: t("employee"),
        className: styles.employeeColumn,
        render: (cv) => (
          <span className={styles.cellContent}>{cv.user?.email ?? "-"}</span>
        ),
      },
      {
        key: "actions",
        title: "",
        className: styles.actionsColumn,
        render: (cv) => <CvActions cvId={cv.id} />,
      },
    ];
  }, [t]);
  return (
    <DetailsTable<Cv, ColumnField, CvSortField>
      data={cvs}
      columns={columns}
      loading={loading}
      rowKey={(cv) => cv.id}
      sortField={sortField}
      sortOrder={sortOrder}
      onSort={sortAction}
      renderDetails={(cv) => (
        <div className={styles.description}>{cv.description}</div>
      )}
    />
  );
};
