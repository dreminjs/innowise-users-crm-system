"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { useQuery } from "@apollo/client/react";
import { GetPositionsQuery } from "@/graphql/graphql";
import { GenericTable, Column } from "@/shared/ui/GenericTable/GenericTable";
import { useTableState } from "@/shared/helpers/useTableState";
import styles from "./PositionsTable.module.css";
import { GET_POSITIONS } from "@/modules/Positions/api/queries";
import { PositionActions } from "@/modules/Positions/ui/PositionsTable/PositionActions";
type Position = GetPositionsQuery["positions"][number];
type SortField = "name";
type ColumnField = "name" | "actions";
type Props = {
  search: string;
};

export const PositionsTable = ({ search }: Props) => {
  const t = useTranslations("PositionsTable");
  const { data, loading, error } = useQuery<GetPositionsQuery>(GET_POSITIONS);
  const { sortField, sortOrder, handleSort } = useTableState<SortField>({
    defaultField: "name",
  });

  const processedPositions = useMemo(() => {
    const normalizedSearch = search.toLowerCase();
    const filtered = (data?.positions ?? []).filter((position) =>
      position.name.toLowerCase().includes(normalizedSearch),
    );

    filtered.sort((a, b) =>
      sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name),
    );
    return filtered;
  }, [data, search, sortOrder]);

  const columns = useMemo<Column<Position, ColumnField, SortField>[]>(() => {
    return [
      {
        key: "name",
        title: t("name"),
        sortable: true,
        sortKey: "name",
        className: styles.nameColumn,
        render: (position: Position) => (
          <div className={styles.cellContent}>{position.name}</div>
        ),
      },
      {
        key: "actions",
        title: "",
        sortable: false,
        className: styles.actionsColumn,
        render: (position: Position) => (
          <PositionActions
            positionId={position.id}
            positionName={position.name}
          />
        ),
      },
    ];
  }, [t]);

  if (error) {
    return <p>Error: {error.message}</p>;
  }
  return (
    <GenericTable<Position, ColumnField, SortField>
      data={processedPositions}
      columns={columns}
      rowKey={(position) => position.id}
      loading={loading}
      sortField={sortField}
      sortOrder={sortOrder}
      onSort={handleSort}
    />
  );
};
