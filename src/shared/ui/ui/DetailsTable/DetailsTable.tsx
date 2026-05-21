import { Empty } from "@/shared/ui/Empty";
import { Loading } from "@/shared/ui/Loading";

import styles from "./DetailsTable.module.css";

export type DetailsTableHeader<TField extends string> = {
  key: TField;
  title?: React.ReactNode;
  sortable?: boolean;
  className?: string;
};

type Props<TField extends string> = {
  loading?: boolean;
  isEmpty?: boolean;
  headers: DetailsTableHeader<TField>[];
  sortField?: TField;
  sortOrder?: "asc" | "desc";
  onSort?: (field: TField) => void;
  children: React.ReactNode;
};

export const DetailsTable = <TField extends string>({
  loading,
  isEmpty,
  headers,
  sortField,
  sortOrder,
  onSort,
  children,
}: Props<TField>) => {
  if (loading) {
    return <Loading />;
  }

  if (isEmpty) {
    return <Empty />;
  }

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            {headers.map((header) => {
              const isActive = sortField === header.key;

              return (
                <th key={header.key} className={header.className}>
                  {header.sortable ? (
                    <button
                      className={styles.sortButton}
                      onClick={() => onSort?.(header.key)}
                    >
                      {header.title}

                      {isActive && (
                        <span>{sortOrder === "asc" ? "↑" : "↓"}</span>
                      )}
                    </button>
                  ) : (
                    header.title
                  )}
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>{children}</tbody>
      </table>
    </div>
  );
};
