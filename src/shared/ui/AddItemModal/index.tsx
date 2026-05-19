"use client";

import { Dialog } from "@chakra-ui/react";
import { FC, ReactNode } from "react";
import styles from "./AddItemModal.module.css";

type Props = {
  children: ReactNode;
  open: boolean;
  toggleAction: () => void;
  title: string;
};

export const AddItemModal: FC<Props> = ({
  children,
  open,
  toggleAction,
  title,
}) => {
  return (
    <Dialog.Root open={open} onOpenChange={toggleAction}>
      <Dialog.Backdrop />
      <Dialog.Positioner className={styles.positioner}>
        <Dialog.Content className={styles.content}>
          <Dialog.Header className={styles.header}>
            <Dialog.Title className={styles.title}>{title}</Dialog.Title>
            <Dialog.CloseTrigger onClick={toggleAction} />
          </Dialog.Header>
          <Dialog.Body>{children}</Dialog.Body>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};
