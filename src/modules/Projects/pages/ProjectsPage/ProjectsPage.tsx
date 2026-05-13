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
import { AddCvProjectModal } from "@/modules/Projects/ui/AddCvProjectModal/AddCvProjectModal";

type Props = {
  cvId: string;
};

export const ProjectsPage = ({ cvId }: Props) => {
  const { data, loading } = useGetProjects(cvId);
  const [search, setSearch] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
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
    return processProjects(
      data?.cv?.projects ?? [],
      search,
      sortField,
      sortOrder,
    );
  }, [data, search, sortField, sortOrder]);
  return (
    <section className={styles.page}>
      <ProjectsSearch
        value={search}
        onChange={setSearch}
        createAction={() => setIsCreateModalOpen(true)}
      />
      <ProjectsTable
        projects={projects}
        loading={loading}
        sortField={sortField}
        sortOrder={sortOrder}
        onSort={handleSort}
      />
      <AddCvProjectModal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        cvId={cvId}
      />
    </section>
  );
};
