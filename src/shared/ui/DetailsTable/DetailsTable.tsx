import { Fragment } from "react";
import { Empty } from "@/shared/ui/Empty";
import { Loading } from "@/shared/ui/Loading";
import styles from "./DetailsTable.module.css";

export type DetailsColumn<
  T,
  TColumn extends string,
  TSort extends string = never,
> = {
  key: TColumn;
  title: React.ReactNode;
  sortable?: boolean;
  sortKey?: TSort;
  className?: string;
  render: (item: T) => React.ReactNode;
};

type Props<T, TColumn extends string, TSort extends string = never> = {
  data: T[];
  columns: DetailsColumn<T, TColumn, TSort>[];
  rowKey: (item: T) => string;
  renderDetails: (item: T) => React.ReactNode;
  loading?: boolean;
  sortField?: TSort;
  sortOrder?: "asc" | "desc";
  onSort?: (field: TSort) => void;
  empty?: React.ReactNode;
};

export const DetailsTable = <
  T,
  TColumn extends string,
  TSort extends string = never,
>({
  data,
  columns,
  rowKey,
  renderDetails,
  loading,
  sortField,
  sortOrder,
  onSort,
  empty,
}: Props<T, TColumn, TSort>) => {
  if (loading) {
    return <Loading />;
  }
  if (!data.length) {
    return empty || <Empty />;
  }
  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((column) => {
              const isActive = sortField === column.sortKey;
              return (
                <th key={column.key} className={column.className}>
                  {column.sortable && column.sortKey ? (
                    <button
                      className={styles.sortButton}
                      onClick={() => onSort?.(column.sortKey as TSort)}
                    >
                      {column.title}
                      {isActive && (
                        <span>{sortOrder === "asc" ? "↑" : "↓"}</span>
                      )}
                    </button>
                  ) : (
                    column.title
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <Fragment key={rowKey(item)}>
              <tr className={styles.mainRow}>
                {columns.map((column) => (
                  <td key={column.key} className={column.className}>
                    {column.render(item)}
                  </td>
                ))}
              </tr>
              <tr className={styles.detailsRow}>
                <td colSpan={columns.length}>{renderDetails(item)}</td>
              </tr>
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};
