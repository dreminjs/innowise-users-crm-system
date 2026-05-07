"use client";

import { useMemo, useState } from "react";

import { useQuery } from "@apollo/client/react";

import { GetUsersDocument } from "@/graphql/graphql";

import { UsersSearch } from "@/modules/Users/ui/UsersSearch";

import { UsersTable } from "@/modules/Users/ui/UsersTable";

import {
  SortField,
  SortOrder,
} from "@/modules/Users/ui/UsersTable/usersTable.types";

import styles from "./UsersPage.module.css";

export const UsersPage = () => {
  const [search, setSearch] = useState("");

  const [sortField, setSortField] = useState<SortField>("first_name");

  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const { data, loading, error } = useQuery(GetUsersDocument);

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));

      return;
    }

    setSortField(field);

    setSortOrder("asc");
  };

  const filteredUsers = useMemo(() => {
    if (!data?.users) {
      return [];
    }

    const normalizedSearch = search.toLowerCase();

    const filtered = data.users.filter((user) => {
      const fullName = `
          ${user.profile.first_name ?? ""}
          ${user.profile.last_name ?? ""}
        `.toLowerCase();

      return fullName.includes(normalizedSearch);
    });

    return [...filtered].sort((a, b) => {
      let firstValue = "";
      let secondValue = "";

      switch (sortField) {
        case "first_name":
          firstValue = a.profile.first_name ?? "";

          secondValue = b.profile.first_name ?? "";

          break;

        case "last_name":
          firstValue = a.profile.last_name ?? "";

          secondValue = b.profile.last_name ?? "";

          break;

        case "email":
          firstValue = a.email;
          secondValue = b.email;

          break;

        case "department":
          firstValue = a.department_name ?? "";

          secondValue = b.department_name ?? "";

          break;

        case "position":
          firstValue = a.position_name ?? "";

          secondValue = b.position_name ?? "";

          break;
      }

      return sortOrder === "asc"
        ? firstValue.localeCompare(secondValue)
        : secondValue.localeCompare(firstValue);
    });
  }, [data?.users, search, sortField, sortOrder]);

  if (loading) {
    return <div className={styles.state}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.state}>Something went wrong</div>;
  }

  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Employees</h1>
      </div>

      <UsersSearch value={search} onChange={setSearch} />

      <UsersTable
        users={filteredUsers}
        sortField={sortField}
        sortOrder={sortOrder}
        onSort={handleSort}
      />
    </section>
  );
};
