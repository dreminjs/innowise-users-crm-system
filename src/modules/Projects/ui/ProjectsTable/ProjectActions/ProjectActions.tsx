"use client";

import { FC, useState } from "react";
import Link from "next/link";
import { Popover } from "@chakra-ui/react";
import { useDeleteProject } from "@/modules/Projects/hooks/useDeleteProject";
import styles from "./ProjectActions.module.css";

interface Props {
  projectId: string;
}

export const ProjectActions: FC<Props> = ({ projectId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [deleteProject] = useDeleteProject();
  const handleDelete = async () => {
    try {
      await deleteProject({
        variables: {
          project: {
            projectId,
          },
        },
      });
      setIsOpen(false);
    } catch (error) {
      throw error;
    }
  };

  return (
    <Popover.Root open={isOpen} onOpenChange={(e) => setIsOpen(e.open)}>
      <Popover.Trigger asChild>
        <button type="button" className={styles.trigger}>
          ⋮
        </button>
      </Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content width="140px" className={styles.content}>
          <div className={styles.menu}>
            <Link href={`/projects/${projectId}`} className={styles.item}>
              Edit Project
            </Link>
            <button
              type="button"
              onClick={handleDelete}
              className={styles.deleteItem}
            >
              Delete Project
            </button>
          </div>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  );
};
