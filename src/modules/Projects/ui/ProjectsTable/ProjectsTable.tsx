"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { GetProjectsQuery } from "@/graphql/graphql";
import {
  DetailsTable,
  DetailsColumn,
} from "@/shared/ui/DetailsTable/DetailsTable";
import {
  ProjectSortField,
  ProjectSortOrder,
} from "../../model/lib/processProjects";
import { ProjectActions } from "./ProjectActions";
import styles from "./ProjectsTable.module.css";
type Project = NonNullable<GetProjectsQuery["projects"][number]>;
type ColumnField = "name" | "domain" | "start_date" | "end_date" | "actions";

type Props = {
  projects: Project[];
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
          <div className={styles.cellContent}>{project.name}</div>
        ),
      },

      {
        key: "domain",
        title: t("domain"),
        sortable: true,
        sortKey: "domain",
        className: styles.domainColumn,
        render: (project) => (
          <div className={styles.cellContent}>{project.domain ?? "-"}</div>
        ),
      },

      {
        key: "start_date",
        title: t("startDate"),
        sortable: true,
        sortKey: "start_date",
        className: styles.dateColumn,
        render: (project) => (
          <div className={styles.cellContent}>{project.start_date}</div>
        ),
      },

      {
        key: "end_date",
        title: t("endDate"),
        sortable: true,
        sortKey: "end_date",
        className: styles.dateColumn,
        render: (project) => (
          <div className={styles.cellContent}>
            {project.end_date ?? "Till now"}
          </div>
        ),
      },
      {
        key: "actions",
        title: "",
        className: styles.actionsColumn,
        render: (project) => <ProjectActions project={project} />,
      },
    ];
  }, [t]);
  return (
    <DetailsTable<Project, ColumnField, ProjectSortField>
      data={projects}
      columns={columns}
      loading={loading}
      rowKey={(project) => project.id}
      sortField={sortField}
      sortOrder={sortOrder}
      onSort={sortAction}
      renderDetails={(project) => (
        <div className={styles.details}>
          <p className={styles.description}>{project.description}</p>
          {!!project.environment?.length && (
            <div className={styles.environment}>
              {project.environment.map((item) => (
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
