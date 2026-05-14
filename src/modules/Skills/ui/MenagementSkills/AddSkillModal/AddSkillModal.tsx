import { Dialog } from "@chakra-ui/react";
import { FC } from "react";
import { AddSkillForm } from "./AddSkillForm";
import styles from "../../Skills.module.css";
import { useTranslations } from "next-intl";

interface IAddSkillModalProps {
  open: boolean;
  onToggle: () => void;
}

export const AddSkillModal: FC<IAddSkillModalProps> = ({ open, onToggle }) => {
  const t = useTranslations("Skills");
  return (
    <Dialog.Root open={open} onOpenChange={onToggle}>
      <Dialog.Backdrop />
      <Dialog.Positioner className={styles.addSkillPositioner}>
        <Dialog.Content className={styles.addSkillModalContent}>
          <Dialog.Header className={styles.addSkillHeader}>
            <Dialog.Title className={styles.addSkillModalTitle}>
              {t("addSkill")}
            </Dialog.Title>
            <Dialog.CloseTrigger onClick={onToggle} />
          </Dialog.Header>

          <Dialog.Body>
            <AddSkillForm onToggle={onToggle} />
          </Dialog.Body>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};
