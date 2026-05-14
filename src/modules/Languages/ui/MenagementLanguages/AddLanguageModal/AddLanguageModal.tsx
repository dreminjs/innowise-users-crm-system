import { FC } from "react";
import { AddItemModal } from "@/shared/ui/AddItemModal/ui/AddItemModal";
import { useUserStore } from "@/application/store/user.store";
import { AddLanguageForm } from "./AddLanguageForm";
import { useTranslations } from "next-intl";

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
    <AddItemModal open={open} toggleAction={onToggle} title={t("add")}>
      {currentUserId && (
        <AddLanguageForm onToggle={onToggle} currentUserId={currentUserId} />
      )}
    </AddItemModal>
  );
};
