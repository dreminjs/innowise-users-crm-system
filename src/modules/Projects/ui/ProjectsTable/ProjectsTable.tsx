"use client";

import { GetCvProjectsQuery } from "@/graphql/graphql";
import {
  ProjectSortField,
  ProjectSortOrder,
} from "../../model/processProjects";
import { ProjectTableRow } from "./ProjectTableRow";
import styles from "./ProjectsTable.module.css";

type Props = {
  cvId: string;
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
  cvId,
}: Props) => {
  if (loading) {
    return <div className={styles.empty}>Loading...</div>;
  }

  if (!projects.length) {
    return <div className={styles.empty}>No projects found</div>;
  }

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>
              <button onClick={() => onSort("name")}>
                Name
                {sortField === "name" && (
                  <span>{sortOrder === "asc" ? " ↑" : " ↓"}</span>
                )}
              </button>
            </th>
            <th>
              <button onClick={() => onSort("domain")}>
                Domain
                {sortField === "domain" && (
                  <span>{sortOrder === "asc" ? " ↑" : " ↓"}</span>
                )}
              </button>
            </th>
            <th>
              <button onClick={() => onSort("start_date")}>
                Start date
                {sortField === "start_date" && (
                  <span>{sortOrder === "asc" ? " ↑" : " ↓"}</span>
                )}
              </button>
            </th>
            <th>
              <button onClick={() => onSort("end_date")}>
                End date
                {sortField === "end_date" && (
                  <span>{sortOrder === "asc" ? " ↑" : " ↓"}</span>
                )}
              </button>
            </th>
            <th />
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <ProjectTableRow key={project.id} project={project} cvId={cvId} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
