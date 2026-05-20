import { useState } from "react";

export type SortOrder = "asc" | "desc";

type Props<TField extends string> = {
  defaultField: TField;
  defaultOrder?: SortOrder;
};

export const useTableState = <TField extends string>({
  defaultField,
  defaultOrder = "asc",
}: Props<TField>) => {
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<TField>(defaultField);
  const [sortOrder, setSortOrder] = useState<SortOrder>(defaultOrder);

  const handleSort = (field: TField) => {
    if (field === sortField) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
      return;
    }
    setSortField(field);
    setSortOrder("asc");
  };

  return {
    search,
    setSearch,
    sortField,
    sortOrder,
    handleSort,
  };
};
