"use client";

import { useMemo, useState } from "react";
import { CVsSearch } from "../../ui/CVsSearch/CVsSearch";
import { filterCvs } from "../../model/lib/filterCvs";
import { CvSortField, CvSortOrder, sortCvs } from "../../model/lib/sortCvs";
import styles from "./CVsPage.module.css";
import { useGetCVs } from "@/modules/Cvs/model/hooks/useGetCVs";
import { CVsTable } from "@/modules/Cvs/ui/CVsTable/CVsTable";

export const CVsPage = () => {
  const { data, loading } = useGetCVs();
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<CvSortField>("name");
  const [sortOrder, setSortOrder] = useState<CvSortOrder>("asc");
  const handleSort = (field: CvSortField) => {
    if (field === sortField) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
      return;
    }
    setSortField(field);
    setSortOrder("asc");
  };

  const cvs = useMemo(() => {
    const filtered = filterCvs(data?.cvs ?? [], search);
    return sortCvs(filtered, sortField, sortOrder);
  }, [data, search, sortField, sortOrder]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>CVs</h1>
      </div>
      <div className={styles.content}>
        <CVsSearch value={search} onChange={setSearch} />
        <CVsTable
          cvs={cvs}
          sortField={sortField}
          sortOrder={sortOrder}
          onSort={handleSort}
        />
      </div>
    </section>
  );
};
