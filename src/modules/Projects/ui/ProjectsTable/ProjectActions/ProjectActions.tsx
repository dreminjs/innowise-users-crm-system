"use client";

import { FC } from "react";
import { useRemoveCvProject } from "@/modules/Projects/hooks/useDeleteProject";
import { ActionsMenu } from "@/shared/ui/ActionsMenu/ActionsMenu";

interface Props {
  projectId: string;
  cvId: string;
}

export const ProjectActions: FC<Props> = ({ projectId, cvId }) => {
  const [removeCvProject] = useRemoveCvProject(cvId);

  return (
    <ActionsMenu
      items={[
        {
          type: "link",
          label: "Edit Project",
          href: `/cvs/${cvId}/projects/${projectId}`,
        },
        {
          type: "button",
          label: "Remove Project",
          variant: "danger",
          onClick: async () => {
            await removeCvProject({
              variables: {
                project: {
                  cvId,
                  projectId,
                },
              },
            });
          },
        },
      ]}
    />
  );
};
