import { Dialog } from "@chakra-ui/react";
import { FC } from "react";
import styles from "./AddItemModal.module.css";
interface IAddItemModalProps {
  children: React.ReactNode;
  open: boolean;
  onToggle: () => void;
  title: string;
}

export const AddItemModal: FC<IAddItemModalProps> = ({
  onToggle,
  open,
  title,
  children,
}) => {
  return (
    <Dialog.Root open={open} onOpenChange={onToggle}>
      <Dialog.Backdrop />
      <Dialog.Positioner className={styles.addItemPositioner}>
        <Dialog.Content className={styles.addItemModalContent}>
          <Dialog.Header className={styles.addItemHeader}>
            <Dialog.Title className={styles.addItemModalTitle}>
              {title}
            </Dialog.Title>
            <Dialog.CloseTrigger onClick={onToggle} />
          </Dialog.Header>

          <Dialog.Body>{children}</Dialog.Body>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};
