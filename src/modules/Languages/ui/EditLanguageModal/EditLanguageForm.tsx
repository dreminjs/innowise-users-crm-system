import { skillLevels } from "@/modules/Skills/model/skill.constants";
import { CustomSelect } from "@/shared/ui/CustomSelect";
import { useQuery } from "@apollo/client/react";
import { Controller } from "react-hook-form";
import { ConfirmButtons } from "@/shared/ui/ConfirmButtons";
import { Proficiency } from "@/generated/graphql";
import { FC } from "react";
import { useEditProfileLanguage } from "../../model/hooks/useEditProfileLanguage";
import { TLanguageForm } from "../../model/languages.interface";
import { useLanguageForm } from "../../model/hooks/useLanguageForm";
import { GET_LANGUAGES, GET_PROFILE_LANGUAGES } from "../../api/queries";
import styles from "../Languages.module.css";

type TEditLanguageFormProps = {
  onToggle: () => void;
  currentUserId: string;
} & TLanguageForm;

export const EditLanguageForm: FC<TEditLanguageFormProps> = ({
  onToggle,
  name,
  proficiency,
  currentUserId,
}) => {
  console.log(name);
  const { handleEditProfileLanguage } = useEditProfileLanguage();
  const { data: languagesData } = useQuery(GET_LANGUAGES);
  const { data: profileData } = useQuery(GET_PROFILE_LANGUAGES, {
    variables: { userId: currentUserId },
  });
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
      onToggle();
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
              languagesData?.languages
                ?.filter((el) =>
                  profileData?.profile.languages.every(
                    (e) => e.name !== el?.name,
                  ),
                )
                .map((el) => ({
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
            options={skillLevels.map((el) => ({
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
        onCancel={onToggle}
        confirmLabel={"CONFIRM"}
        confirmButtonType={"submit"}
      />
    </form>
  );
};
