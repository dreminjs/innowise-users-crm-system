"use client";

import { GetCvProjectsQuery } from "@/graphql/graphql";
import {
  ProjectSortField,
  ProjectSortOrder,
} from "../../model/processProjects";

import { ProjectTableRow } from "./ProjectTableRow";
import styles from "./ProjectsTable.module.css";

type Props = {
  projects: NonNullable<NonNullable<GetCvProjectsQuery["cv"]>["projects"]>;

  loading: boolean;
  sortField: ProjectSortField;
  sortOrder: ProjectSortOrder;
  onSort: (field: ProjectSortField) => void;
};

export const ProjectsTable = ({
  projects,
  loading,
  sortField,
  sortOrder,
  onSort,
}: Props) => {
  if (loading) {
    return <div className={styles.empty}>Loading...</div>;
  }

  if (!projects.length) {
    return <div className={styles.empty}>No results found</div>;
  }

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>
            <button onClick={() => onSort("name")}>Name</button>
          </th>
          <th>
            <button onClick={() => onSort("internal_name")}>Name</button>
          </th>
          <th>
            <button onClick={() => onSort("domain")}>Domain</button>
          </th>
          <th>
            <button onClick={() => onSort("start_date")}>Start date</button>
          </th>
          <th>
            <button onClick={() => onSort("end_date")}>
              End date
              {sortField === "end_date" && (sortOrder === "asc" ? " ↑" : " ↓")}
            </button>
          </th>
        </tr>
      </thead>

      <tbody>
        {projects.map((project) => (
          <ProjectTableRow key={project.id} project={project} />
        ))}
      </tbody>
    </table>
  );
};
