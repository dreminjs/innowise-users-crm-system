"use client";

import { useTranslations } from "next-intl";
import { GetCvProjectsQuery } from "@/graphql/graphql";
import {
  ProjectSortField,
  ProjectSortOrder,
} from "../../model/processProjects";
import { ProjectTableRow } from "./ProjectTableRow";
import styles from "./ProjectsTable.module.css";
import { Empty } from "@/shared/ui/Empty";
import { Loading } from "@/shared/ui/Loading";

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
  const t = useTranslations("ProjectsTable");

  if (loading) {
    return <Loading />;
  }

  if (!projects.length) {
    return <Empty />;
  }

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>
              <button onClick={() => sortAction("name")}>
                {t("name")}
                {sortField === "name" && (
                  <span>{sortOrder === "asc" ? " ↑" : " ↓"}</span>
                )}
              </button>
            </th>
            <th>
              <button onClick={() => sortAction("domain")}>
                {t("domain")}

                {sortField === "domain" && (
                  <span>{sortOrder === "asc" ? " ↑" : " ↓"}</span>
                )}
              </button>
            </th>
            <th>
              <button onClick={() => sortAction("start_date")}>
                {t("startDate")}
                {sortField === "start_date" && (
                  <span>{sortOrder === "asc" ? " ↑" : " ↓"}</span>
                )}
              </button>
            </th>
            <th>
              <button onClick={() => sortAction("end_date")}>
                {t("endDate")}
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
