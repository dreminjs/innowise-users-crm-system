import { Empty } from "@/shared/ui/Empty";
import { Loading } from "@/shared/ui/Loading";
import styles from "./GenericTable.module.css";

export type Column<T, TColumn extends string> = {
  key: TColumn;
  title: React.ReactNode;
  sortable?: boolean;
  className?: string;
  render: (item: T) => React.ReactNode;
};

type Props<T, TColumn extends string> = {
  data: T[];
  columns: Column<T, TColumn>[];
  rowKey: (item: T) => string;
  loading?: boolean;
  sortField?: TColumn;
  sortOrder?: "asc" | "desc";
  onSort?: (field: TColumn) => void;
  empty?: React.ReactNode;
};
export const GenericTable = <T, TColumn extends string>({
  data,
  columns,
  rowKey,
  loading,
  sortField,
  sortOrder,
  onSort,
  empty,
}: Props<T, TColumn>) => {
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
              const isActive = column.sortable && column.key === sortField;
              return (
                <th key={column.key} className={column.className}>
                  {column.sortable ? (
                    <button
                      className={styles.sortButton}
                      onClick={() => onSort?.(column.key)}
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
