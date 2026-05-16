import { FC } from "react";
import { EditLanguageForm } from "./EditLanguageForm";
import { useUserStore } from "@/application/store/user.store";
import { TLanguageForm } from "../../model/languages.interface";
import { FormModal } from "@/shared/ui/FormModal";

type TEditLanguageModalProps = {
  open: boolean;
  toggleAction: () => void;
} & TLanguageForm;

export const EditLanguageModal: FC<TEditLanguageModalProps> = ({
  open,
  toggleAction,
  name,
  proficiency,
}) => {
  const currentUserId = useUserStore((state) => state.userId);

  return (
    <FormModal open={open} toggleAction={toggleAction} title={"Edit Language"}>
      {currentUserId && (
        <EditLanguageForm
          toggleAction={toggleAction}
          name={name}
          proficiency={proficiency}
        />
      )}
    </FormModal>
  );
};
