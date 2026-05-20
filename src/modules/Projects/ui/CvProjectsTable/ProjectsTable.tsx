"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { GetCvProjectsQuery } from "@/graphql/graphql";
import {
  ProjectSortField,
  ProjectSortOrder,
} from "../../model/processProjects";
import {
  DetailsTable,
  DetailsColumn,
} from "@/shared/ui/DetailsTable/DetailsTable";
import { ProjectActions } from "./ProjectActions/ProjectActions";
import styles from "./ProjectsTable.module.css";
type Project = NonNullable<
  NonNullable<GetCvProjectsQuery["cv"]>["projects"]
>[number];

type ColumnField = "name" | "domain" | "start_date" | "end_date" | "actions";
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
  const columns = useMemo<
    DetailsColumn<Project, ColumnField, ProjectSortField>[]
  >(() => {
    return [
      {
        key: "name",
        title: t("name"),
        sortable: true,
        sortKey: "name",
        className: styles.nameColumn,
        render: (project) => (
          <span className={styles.cellContent}>{project.project.name}</span>
        ),
      },
      {
        key: "domain",
        title: t("domain"),
        sortable: true,
        sortKey: "domain",
        className: styles.domainColumn,
        render: (project) => (
          <span className={styles.cellContent}>{project.project.domain}</span>
        ),
      },
      {
        key: "start_date",
        title: t("startDate"),
        sortable: true,
        sortKey: "start_date",
        className: styles.dateColumn,
        render: (project) => (
          <span className={styles.cellContent}>{project.start_date}</span>
        ),
      },
      {
        key: "end_date",
        title: t("endDate"),
        sortable: true,
        sortKey: "end_date",
        className: styles.dateColumn,
        render: (project) => (
          <span className={styles.cellContent}>
            {project.end_date ?? "Till now"}
          </span>
        ),
      },
      {
        key: "actions",
        title: "",
        className: styles.actionsColumn,
        render: (project) => (
          <ProjectActions cvId={cvId} projectId={project.project.id} />
        ),
      },
    ];
  }, [cvId, t]);

  return (
    <DetailsTable<Project, ColumnField, ProjectSortField>
      data={projects}
      columns={columns}
      loading={loading}
      rowKey={(project) => project.project.id}
      sortField={sortField}
      sortOrder={sortOrder}
      onSort={sortAction}
      renderDetails={(project) => (
        <div className={styles.details}>
          <p className={styles.description}>{project.project.description}</p>

          {!!project.responsibilities.length && (
            <ul className={styles.responsibilities}>
              {project.responsibilities.map((responsibility) => (
                <li key={responsibility}>{responsibility}</li>
              ))}
            </ul>
          )}
          {!!project.project.environment.length && (
            <div className={styles.environment}>
              {project.project.environment.map((item) => (
                <span key={item} className={styles.tag}>
                  {item}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    />
  );
};
