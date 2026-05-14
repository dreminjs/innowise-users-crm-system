"use client";

import { FC, useState } from "react";
import Link from "next/link";
import { Popover } from "@chakra-ui/react";
import styles from "./ProjectActions.module.css";
import { useRemoveCvProject } from "@/modules/Projects/hooks/useDeleteProject";

interface Props {
  projectId: string;
  cvProjectId: string;
  cvId: string;
}

export const ProjectActions: FC<Props> = ({ projectId, cvId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [removeCvProject] = useRemoveCvProject(cvId);
  const handleDelete = async () => {
    await removeCvProject({
      variables: {
        project: {
          cvId,
          projectId,
        },
      },
    });

    setIsOpen(false);
  };
  return (
    <Popover.Root open={isOpen} onOpenChange={(e) => setIsOpen(e.open)}>
      <Popover.Trigger asChild>
        <button type="button" className={styles.trigger}>
          ⋮
        </button>
      </Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content width="160px" className={styles.content}>
          <div className={styles.menu}>
            <Link
              href={`/cvs/${cvId}/projects/${projectId}`}
              className={styles.item}
            >
              Edit Project
            </Link>

            <button
              type="button"
              onClick={handleDelete}
              className={styles.deleteItem}
            >
              Remove Project
            </button>
          </div>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  );
};
