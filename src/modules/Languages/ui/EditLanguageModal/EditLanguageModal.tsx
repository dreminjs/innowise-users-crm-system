import { FC } from "react";
import { EditLanguageForm } from "./EditLanguageForm";
import { useUserStore } from "@/application/store/user.store";
import { TLanguageForm } from "../../model/languages.interface";
import { AddItemModal } from "@/shared/ui/AddItemModal";

type TEditLanguageModalProps = {
  open: boolean;
  onToggle: () => void;
} & TLanguageForm;

export const EditLanguageModal: FC<TEditLanguageModalProps> = ({
  open,
  onToggle,
  name,
  proficiency,
}) => {
  const currentUserId = useUserStore((state) => state.userId);

  return (
    <AddItemModal open={open} onToggle={onToggle} title={"Edit Language"}>
      {currentUserId && (
        <EditLanguageForm
          toggleAction={onToggle}
          name={name}
          proficiency={proficiency}
        />
      )}
    </AddItemModal>
  );
};
