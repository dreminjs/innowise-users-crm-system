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
  sortAction: (field: ProjectSortField) => void;
};

export const ProjectsTable = ({
  projects,
  loading,
  sortField,
  sortOrder,
  sortAction,
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
              <button onClick={() => sortAction("name")}>
                Name
                {sortField === "name" && (
                  <span>{sortOrder === "asc" ? " ↑" : " ↓"}</span>
                )}
              </button>
            </th>
            <th>
              <button onClick={() => sortAction("domain")}>
                Domain
                {sortField === "domain" && (
                  <span>{sortOrder === "asc" ? " ↑" : " ↓"}</span>
                )}
              </button>
            </th>
            <th>
              <button onClick={() => sortAction("start_date")}>
                Start date
                {sortField === "start_date" && (
                  <span>{sortOrder === "asc" ? " ↑" : " ↓"}</span>
                )}
              </button>
            </th>
            <th>
              <button onClick={() => sortAction("end_date")}>
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
