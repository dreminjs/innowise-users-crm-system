"use client";

import { FC } from "react";
import { useTranslations } from "next-intl";
import { useRemoveCvProject } from "@/modules/Projects/hooks/useDeleteProject";
import { ActionsMenu } from "@/shared/ui/ActionsMenu/ActionsMenu";
interface Props {
  projectId: string;
  cvId: string;
}

export const ProjectActions: FC<Props> = ({ projectId, cvId }) => {
  const t = useTranslations("ProjectActions");
  const [removeCvProject] = useRemoveCvProject(cvId);
  return (
    <ActionsMenu
      items={[
        {
          type: "link",
          label: t("edit"),
          href: `/cvs/${cvId}/projects/${projectId}`,
        },
        {
          type: "button",
          label: t("remove"),
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
