"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@apollo/client/react";
import { GetProjectsQuery } from "@/graphql/graphql";
import { GET_PROJECTS } from "../../api/queries";
import {
  processProjects,
  ProjectSortField,
} from "../../model/lib/processProjects";
import { useTableState } from "@/shared/helpers/useTableState";
import { useCreateProject } from "@/modules/Projects/hooks/useCreateProject";
import { ProjectsToolbar } from "@/modules/Projects/ui/ProjectsToolbar/ProjectsToolbar";
import { ProjectModal } from "@/modules/Projects/ui/ProjectModal/ProjectModal";
import { ProjectsTable } from "@/modules/Projects/ui/ProjectsTable/ProjectsTable";

export const Projects = () => {
  const { data, loading } = useQuery<GetProjectsQuery>(GET_PROJECTS);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { sortField, sortOrder, handleSort } = useTableState<ProjectSortField>({
    defaultField: "name",
  });

  const { createProject, loading: createLoading } = useCreateProject();
  const projects = useMemo(() => {
    return processProjects(
      (data?.projects ?? []).filter(Boolean),
      search,
      sortField,
      sortOrder,
    );
  }, [data, search, sortField, sortOrder]);
  return (
    <>
      <ProjectsToolbar
        value={search}
        changeAction={setSearch}
        createAction={() => setIsModalOpen(true)}
      />

      <ProjectsTable
        projects={projects}
        loading={loading}
        sortField={sortField}
        sortOrder={sortOrder}
        sortAction={handleSort}
      />

      <ProjectModal
        open={isModalOpen}
        toggleAction={() => setIsModalOpen(false)}
        loading={createLoading}
        mode="create"
        submitAction={async (values) => {
          await createProject({
            variables: {
              project: values,
            },
          });
          setIsModalOpen(false);
        }}
      />
    </>
  );
};
