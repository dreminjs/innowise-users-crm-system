"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { useQuery } from "@apollo/client/react";
import { GetDepartmentsQuery } from "@/graphql/graphql";
import { GenericTable, Column } from "@/shared/ui/GenericTable/GenericTable";
import { useTableState } from "@/shared/helpers/useTableState";
import styles from "./DepartmentsTable.module.css";
import { GET_DEPARTMENTS } from "@/modules/Departments/api/queries";
import { DepartmentActions } from "@/modules/Departments/ui/DepartmentsTable/DepartmentActions";
type Department = GetDepartmentsQuery["departments"][number];
type SortField = "name";
type ColumnField = "name" | "actions";
type Props = {
  search: string;
};

export const DepartmentsTable = ({ search }: Props) => {
  const t = useTranslations("DepartmentsTable");
  const { data, loading, error } =
    useQuery<GetDepartmentsQuery>(GET_DEPARTMENTS);
  const { sortField, sortOrder, handleSort } = useTableState<SortField>({
    defaultField: "name",
  });
  const processedDepartments = useMemo(() => {
    const normalizedSearch = search.toLowerCase();
    const filtered = (data?.departments ?? []).filter((department) =>
      department.name.toLowerCase().includes(normalizedSearch),
    );
    filtered.sort((a, b) =>
      sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name),
    );

    return filtered;
  }, [data, search, sortOrder]);
  const columns = useMemo<Column<Department, ColumnField, SortField>[]>(() => {
    return [
      {
        key: "name",
        title: t("name"),
        sortable: true,
        sortKey: "name",
        className: styles.nameColumn,
        render: (department: Department) => (
          <div className={styles.cellContent}>{department.name}</div>
        ),
      },
      {
        key: "actions",
        title: "",
        sortable: false,
        className: styles.actionsColumn,
        render: (department: Department) => (
          <DepartmentActions
            departmentId={department.id}
            departmentName={department.name}
          />
        ),
      },
    ];
  }, [t]);

  if (error) {
    return <p>Error: {error.message}</p>;
  }
  return (
    <GenericTable<Department, ColumnField, SortField>
      data={processedDepartments}
      columns={columns}
      rowKey={(department) => department.id}
      loading={loading}
      sortField={sortField}
      sortOrder={sortOrder}
      onSort={handleSort}
    />
  );
};
