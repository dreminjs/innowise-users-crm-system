"use client";

import { FC, useState } from "react";
import Link from "next/link";
import { Popover } from "@chakra-ui/react";

import styles from "./CvActions.module.css";
import { useDeleteCv } from "@/modules/Cvs/hooks/useDeleteCv";
interface Props {
  cvId: string;
}

export const CvActions: FC<Props> = ({ cvId }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [deleteCv] = useDeleteCv();

  const handleDelete = async () => {
    try {
      await deleteCv({
        variables: {
          cv: {
            cvId,
          },
        },
      });

      setIsOpen(false);
    } catch (error) {
      console.error(error);
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
            <Link href={`/cvs/${cvId}`} className={styles.item}>
              Edit CV
            </Link>
            <button
              type="button"
              onClick={handleDelete}
              className={styles.deleteItem}
            >
              Delete CV
            </button>
          </div>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  );
};
