"use client";

import { useMemo, useState } from "react";
import { useGetCVs } from "../../model/hooks/useGetCVs";
import {
  CvSortField,
  CvSortOrder,
  processCvs,
} from "../../model/lib/processCvs";
import styles from "./CVsPage.module.css";
import { CVsToolbar } from "@/modules/Cvs/ui/CVsToolbar/CVsToolbar";
import { CVsTable } from "@/modules/Cvs/ui/CVsTable/CVsTable";
import { CreateCvModal } from "@/modules/Cvs/ui/CreateCvModal/CreateCvModal";

export const CVsPage = () => {
  const { data, loading } = useGetCVs();
  const [search, setSearch] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
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
    return processCvs(data?.cvs ?? [], search, sortField, sortOrder);
  }, [data, search, sortField, sortOrder]);

  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>CVs</h1>
      </div>
      <div className={styles.content}>
        <CVsToolbar
          value={search}
          changeAction={setSearch}
          createAction={() => setIsCreateModalOpen(true)}
        />
        <CVsTable
          cvs={cvs}
          loading={loading}
          sortField={sortField}
          sortOrder={sortOrder}
          sortAction={handleSort}
        />
      </div>
      <CreateCvModal
        isOpen={isCreateModalOpen}
        closeAction={() => setIsCreateModalOpen(false)}
      />
    </section>
  );
};
