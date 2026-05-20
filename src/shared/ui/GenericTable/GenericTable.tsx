import { Empty } from "@/shared/ui/Empty";
import { Loading } from "@/shared/ui/Loading";
import styles from "./GenericTable.module.css";

export type Column<T, TColumn extends string, TSort extends string> = {
  key: TColumn;
  title: React.ReactNode;
  sortable?: boolean;
  className?: string;
  render: (item: T) => React.ReactNode;
  sortKey?: TSort;
};

type Props<T, TColumn extends string, TSort extends string> = {
  data: T[];
  columns: Column<T, TColumn, TSort>[];
  rowKey: (item: T) => string;
  loading?: boolean;
  sortField?: TSort;
  sortOrder?: "asc" | "desc";
  onSort?: (field: TSort) => void;
  empty?: React.ReactNode;
};

export const GenericTable = <T, TColumn extends string, TSort extends string>({
  data,
  columns,
  rowKey,
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
              const isActive = column.sortable && column.sortKey === sortField;
              return (
                <th key={column.key} className={column.className}>
                  {column.sortable && column.sortKey ? (
                    <button
                      className={styles.sortButton}
                      onClick={() => onSort?.(column.sortKey!)}
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
            <tr key={rowKey(item)} className={styles.row}>
              {columns.map((column) => (
                <td key={column.key} className={column.className}>
                  {column.render(item)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
