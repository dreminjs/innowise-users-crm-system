"use client";

import { FC, useState } from "react";
import { useTranslations } from "next-intl";
import { GetProjectsQuery } from "@/graphql/graphql";
import { ActionsMenu } from "@/shared/ui/ActionsMenu/ActionsMenu";
import { ProjectModal } from "../ProjectModal/ProjectModal";
import { useDeleteProject } from "@/modules/Projects/hooks/useDeleteProject";
import { useUpdateProject } from "@/modules/Projects/hooks/useUpdateProject";

type Project = NonNullable<GetProjectsQuery["projects"][number]>;

type Props = {
  project: Project;
};

export const ProjectActions: FC<Props> = ({ project }) => {
  const t = useTranslations("ProjectActions");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { deleteProject } = useDeleteProject();
  const { updateProject, loading } = useUpdateProject();
  return (
    <>
      <ActionsMenu
        items={[
          {
            type: "button",
            label: t("edit"),
            onClick: () => setIsModalOpen(true),
          },

          {
            type: "button",
            label: t("remove"),
            variant: "danger",
            onClick: async () => {
              await deleteProject({
                variables: {
                  project: {
                    projectId: project.id,
                  },
                },
              });
            },
          },
        ]}
      />

      <ProjectModal
        open={isModalOpen}
        toggleAction={() => setIsModalOpen(false)}
        loading={loading}
        mode="edit"
        defaultValues={{
          name: project.name,
          domain: project.domain ?? "",
          description: project.description ?? "",
          environment: project.environment ?? [],
          start_date: project.start_date ?? "",
          end_date: project.end_date ?? "",
        }}
        submitAction={async (values) => {
          await updateProject({
            variables: {
              project: {
                projectId: project.id,
                ...values,
              },
            },
          });
          setIsModalOpen(false);
        }}
      />
    </>
  );
};
