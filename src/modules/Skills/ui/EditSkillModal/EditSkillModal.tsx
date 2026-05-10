import { Dialog } from "@chakra-ui/react";
import { EditSkillForm } from "./EditSkillForm";
import { TSkillForm } from "../../model/skill.interface";
import { FC } from "react";
import styles from "../Skills.module.css";

type TEditSkillModalProps = {
  open: boolean;
  onToggle: () => void;
  categoryId: string | null;
} & Omit<TSkillForm, "categoryId">;

export const EditSkillModal: FC<TEditSkillModalProps> = ({
  open,
  onToggle,
  categoryId,
  mastery,
}) => {
  return (
    <Dialog.Root open={open} onOpenChange={onToggle}>
      <Dialog.Backdrop />
      <Dialog.Positioner className={styles.addSkillPositioner}>
        <Dialog.Content className={styles.addSkillModalContent}>
          <Dialog.Header className={styles.addSkillHeader}>
            <Dialog.Title className={styles.addSkillModalTitle}>
              Edit skill
            </Dialog.Title>
            <Dialog.CloseTrigger onClick={onToggle} />
          </Dialog.Header>

          <Dialog.Body>
            {categoryId && (
              <EditSkillForm
                onToggle={onToggle}
                categoryId={categoryId}
                mastery={mastery}
              />
            )}
          </Dialog.Body>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};
