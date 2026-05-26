import { FC } from "react";
import { AddLanguageForm } from "./AddLanguageForm";
import { useTranslations } from "next-intl";
import { FormModal } from "@/shared/ui/FormModal";

interface IAddSkillModalProps {
  open: boolean;
  onToggle: () => void;
  userId: string;
}

export const AddLanguageModal: FC<IAddSkillModalProps> = ({
  open,
  onToggle,
  userId,
}) => {
  const t = useTranslations("Languages");
  return (
    <FormModal open={open} toggleAction={onToggle} title={t("add")}>
      {userId && <AddLanguageForm onToggle={onToggle} currentUserId={userId} />}
    </FormModal>
  );
};
