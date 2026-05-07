"use client";

import { useQuery } from "@apollo/client/react";
import { GetUsersDocument } from "@/graphql/graphql";
import { UsersSearch } from "@/modules/Users/ui/UsersSearch";
import { UsersTable } from "@/modules/Users/ui/UsersTable";
import { useUsersTable } from "@/modules/Users/model/hooks/useUsersTable";
import styles from "./UsersPage.module.css";

export const UsersPage = () => {
  const { data, loading, error } = useQuery(GetUsersDocument);
  const { users, search, setSearch, sortField, sortOrder, handleSort } =
    useUsersTable(data?.users);
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
        users={users}
        sortField={sortField}
        sortOrder={sortOrder}
        onSort={handleSort}
      />
    </section>
  );
};
