"use client";

import { useMemo, useState } from "react";
import { useGetProjects } from "../../hooks/useGetProjects";
import {
  processProjects,
  ProjectSortField,
  ProjectSortOrder,
} from "../../model/processProjects";
import styles from "./ProjectsPage.module.css";
import { ProjectsSearch } from "@/modules/Projects/ui/ProjectsSearch/ProjectsSearch";
import { ProjectsTable } from "@/modules/Projects/ui/ProjectsTable/ProjectsTable";

export const ProjectsPage = () => {
  const { data, loading } = useGetProjects();
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<ProjectSortField>("end_date");
  const [sortOrder, setSortOrder] = useState<ProjectSortOrder>("desc");
  const handleSort = (field: ProjectSortField) => {
    if (field === sortField) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
      return;
    }
    setSortField(field);
    setSortOrder("asc");
  };

  const projects = useMemo(() => {
    return processProjects(data?.projects ?? [], search, sortField, sortOrder);
  }, [data, search, sortField, sortOrder]);
  return (
    <section className={styles.page}>
      <ProjectsSearch value={search} onChange={setSearch} />
      <ProjectsTable
        projects={projects}
        loading={loading}
        sortField={sortField}
        sortOrder={sortOrder}
        onSort={handleSort}
      />
    </section>
  );
};
