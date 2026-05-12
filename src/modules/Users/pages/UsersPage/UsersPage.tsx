"use client";

import { useQuery } from "@apollo/client/react";
import { UsersSearch } from "@/modules/Users/ui/UsersSearch";
import { UsersTable } from "@/modules/Users/ui/UsersTable";
import { useUsersTable } from "@/modules/Users/model/hooks/useUsersTable";
import styles from "./UsersPage.module.css";
import { GET_USERS } from "../../api/queries";
import { Loading } from "@/shared/ui/Loading";

export const UsersPage = () => {
  const { data, loading, error } = useQuery(GET_USERS);
  const { users, search, setSearch, sortField, sortOrder, handleSort } =
    useUsersTable(data?.users);
  if (error) {
    return <div className={styles.state}>Something went wrong</div>;
  }
  return (
    <section className={styles.page}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <UsersSearch value={search} onChange={setSearch} />
          <UsersTable
            users={users}
            sortField={sortField}
            sortOrder={sortOrder}
            onSort={handleSort}
          />
        </>
      )}
    </section>
  );
};
