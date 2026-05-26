"use client";

import { useMemo, useState } from "react";
import { GetUsersQuery } from "@/graphql/graphql";
import { SortField, SortOrder } from "../usersTable.types";
import { filterUsers } from "../utils/filterUsers";
import { sortUsers } from "../utils/sortUsers";

export const useUsersTable = (users: GetUsersQuery["users"] | undefined) => {
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<SortField>("first_name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
      return;
    }
    setSortField(field);
    setSortOrder("asc");
  };
  const preparedUsers = useMemo(() => {
    if (!users) {
      return [];
    }
    const filtered = filterUsers(users, search);
    return sortUsers(filtered, sortField, sortOrder);
  }, [users, search, sortField, sortOrder]);

  return {
    search,
    setSearch,
    sortField,
    sortOrder,
    handleSort,
    users: preparedUsers,
  };
};
