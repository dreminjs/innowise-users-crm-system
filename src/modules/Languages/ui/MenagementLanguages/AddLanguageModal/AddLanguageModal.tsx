import { FC } from "react";
import { useUserStore } from "@/application/store/user.store";
import { AddLanguageForm } from "./AddLanguageForm";
import { useTranslations } from "next-intl";
import { FormModal } from "@/shared/ui/FormModal";

interface IAddSkillModalProps {
  open: boolean;
  onToggle: () => void;
}

export const AddLanguageModal: FC<IAddSkillModalProps> = ({
  open,
  onToggle,
}) => {
  const currentUserId = useUserStore((state) => state.userId);
  const t = useTranslations("Languages");
  return (
    <FormModal open={open} toggleAction={onToggle} title={t("add")}>
      {currentUserId && (
        <AddLanguageForm onToggle={onToggle} currentUserId={currentUserId} />
      )}
    </FormModal>
  );
};
