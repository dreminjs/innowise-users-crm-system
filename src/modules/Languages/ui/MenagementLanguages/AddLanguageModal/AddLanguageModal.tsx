import { FC } from "react";
import { AddItemModal } from "@/shared/ui/AddItemModal/ui/AddItemModal";
import { useUserStore } from "@/application/store/user.store";
import { AddLanguageForm } from "./AddLanguageForm";

interface IAddSkillModalProps {
  open: boolean;
  onToggle: () => void;
}

export const AddLanguageModal: FC<IAddSkillModalProps> = ({
  open,
  onToggle,
}) => {
  const currentUserId = useUserStore((state) => state.userId);

  return (
    <AddItemModal open={open} onToggle={onToggle} title={"Add Language"}>
      {currentUserId && (
        <AddLanguageForm onToggle={onToggle} currentUserId={currentUserId} />
      )}
    </AddItemModal>
  );
};
