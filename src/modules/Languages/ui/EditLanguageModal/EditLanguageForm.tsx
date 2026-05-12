import { useQuery } from "@apollo/client/react";
import { Controller } from "react-hook-form";
import { ConfirmButtons } from "@/shared/ui/ConfirmButtons";
import { CustomSelect } from "@/shared/ui/CustomSelect";
import { useEditProfileLanguage } from "../../model/hooks/useEditProfileLanguage";
import { TLanguageForm } from "../../model/languages.interface";
import { useLanguageForm } from "../../model/hooks/useLanguageForm";
import { GET_LANGUAGES } from "../../api/queries";
import { FC } from "react";
import styles from "../Languages.module.css";
import { languageProfiency } from "../../model/languages.constants";
import { Proficiency } from "@/graphql/graphql";
type TEditLanguageFormProps = {
  toggleAction: () => void;
} & TLanguageForm;

export const EditLanguageForm: FC<TEditLanguageFormProps> = ({
  toggleAction,
  name,
  proficiency,
}) => {
  const { handleEditProfileLanguage } = useEditProfileLanguage();
  const { data: languagesData } = useQuery(GET_LANGUAGES);

  const {
    control,
    handleSubmit,
    reset,
    currentName,
    handleChangeName,
    handleChangeProficiency,
  } = useLanguageForm({
    name,
    proficiency,
  });

  const onSubmit = async (data: TLanguageForm) => {
    handleEditProfileLanguage(data).then(() => {
      toggleAction();
      reset();
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.addLanguageForm}>
      <Controller
        control={control}
        name={"name"}
        render={({ field }) => (
          <CustomSelect
            label={"Language"}
            options={
              languagesData?.languages.map((el) => ({
                value: el?.name || "Unknow",
                label: el?.name || "Unknow",
              })) || []
            }
            value={field.value}
            onChange={handleChangeName}
            disabled={true}
          />
        )}
      />
      <Controller
        control={control}
        name={"proficiency"}
        render={({ field }) => (
          <CustomSelect
            label={"Proficiency"}
            options={languageProfiency.map((el) => ({
              value: el,
              label: el,
            }))}
            value={field.value}
            disabled={!Boolean(currentName)}
            onChange={(value) => handleChangeProficiency(value as Proficiency)}
          />
        )}
      />
      <ConfirmButtons
        onCancel={toggleAction}
        confirmLabel={"CONFIRM"}
        confirmButtonType={"submit"}
      />
    </form>
  );
};
