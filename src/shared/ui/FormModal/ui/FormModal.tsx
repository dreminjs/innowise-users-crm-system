import { Dialog } from "@chakra-ui/react";
import { FC } from "react";
import styles from "./FormModal.module.css";

interface IFormModalProps {
  children: React.ReactNode;
  open: boolean;
  toggleAction: () => void;
  title: string;
}

export const FormModal: FC<IFormModalProps> = ({
  toggleAction,
  open,
  title,
  children,
}) => {
  return (
    <Dialog.Root
      open={open}
      onOpenChange={(details) => {
        if (!details.open) {
          toggleAction();
        }
      }}
    >
      <Dialog.Backdrop />
      <Dialog.Positioner className={styles.formPositioner}>
        <Dialog.Content className={styles.formModalContent}>
          <Dialog.Header className={styles.formHeader}>
            <Dialog.Title className={styles.formModalTitle}>
              {title}
            </Dialog.Title>
            <Dialog.CloseTrigger />
          </Dialog.Header>
          <Dialog.Body>{children}</Dialog.Body>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};
