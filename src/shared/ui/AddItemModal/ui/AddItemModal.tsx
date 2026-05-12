import { Dialog } from "@chakra-ui/react";
import { FC } from "react";
import styles from "./AddItemModal.module.css";
interface IAddItemModalProps {
  children: React.ReactNode;
  open: boolean;
  toggleAction: () => void;
  title: string;
}

export const AddItemModal: FC<IAddItemModalProps> = ({
  toggleAction,
  open,
  title,
  children,
}) => {
  return (
    <Dialog.Root open={open} onOpenChange={() => toggleAction()}>
      <Dialog.Backdrop />
      <Dialog.Positioner className={styles.addItemPositioner}>
        <Dialog.Content className={styles.addItemModalContent}>
          <Dialog.Header className={styles.addItemHeader}>
            <Dialog.Title className={styles.addItemModalTitle}>
              {title}
            </Dialog.Title>
            <Dialog.CloseTrigger onClick={toggleAction} />
          </Dialog.Header>
          <Dialog.Body>{children}</Dialog.Body>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};
