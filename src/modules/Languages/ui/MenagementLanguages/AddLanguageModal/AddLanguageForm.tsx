import { CustomSelect } from "@/shared/ui/CustomSelect";
import { useQuery } from "@apollo/client/react";
import { Controller } from "react-hook-form";
import { ConfirmButtons } from "@/shared/ui/ConfirmButtons";
import { Proficiency } from "@/generated/graphql";
import { FC } from "react";
import {
  GET_LANGUAGES,
  GET_PROFILE_LANGUAGES,
} from "@/modules/Languages/api/queries";
import { useLanguageForm } from "@/modules/Languages/model/hooks/useLanguageForm";
import { TLanguageForm } from "@/modules/Languages/model/languages.interface";
import { useAddProfileLanguage } from "@/modules/Languages/model/hooks/useAddProfileLanguage";
import { languageProfiency } from "@/modules/Languages/model/languages.constants";
import { useTranslations } from "next-intl";
import styles from "../../Languages.module.css";

interface IEditLangugeFormProps {
  onToggle: () => void;
  currentUserId: string;
}

export const AddLanguageForm: FC<IEditLangugeFormProps> = ({
  onToggle,
  currentUserId,
}) => {
  const { handleAddProfileLanguage } = useAddProfileLanguage();
  const { data: languagesData } = useQuery(GET_LANGUAGES);
  const { data: profileData } = useQuery(GET_PROFILE_LANGUAGES, {
    variables: { userId: currentUserId },
  });
  const t = useTranslations();

  const {
    control,
    handleChangeProficiency,
    handleSubmit,
    reset,
    currentName,
    handleChangeName,
  } = useLanguageForm();

  const onSubmit = async (data: TLanguageForm) => {
    handleAddProfileLanguage(data).then(() => {
      reset();
      onToggle();
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.addLanguageForm}>
      <Controller
        control={control}
        name={"name"}
        render={({ field }) => (
          <CustomSelect
            label={t("Languages.chooseLanguage")}
            options={
              languagesData?.languages
                ?.filter((el) =>
                  profileData?.profile.languages.every(
                    (e) => e.name !== el?.name,
                  ),
                )
                .map((el) => ({
                  value: el?.name || "Unknow",
                  label: t(`Languages.${el?.name}`) || "Unknow",
                })) || []
            }
            value={field.value}
            onChange={handleChangeName}
          />
        )}
      />
      <Controller
        control={control}
        name={"proficiency"}
        render={({ field }) => (
          <CustomSelect
            label={t("Languages.languageMastery")}
            options={languageProfiency.map((el) => ({
              value: el,
              label: el === "Native" ? t("Languages.Native") : el,
            }))}
            value={field.value}
            disabled={!Boolean(currentName)}
            onChange={(value) => handleChangeProficiency(value as Proficiency)}
          />
        )}
      />
      <ConfirmButtons
        onCancel={onToggle}
        confirmLabel={t("ConfirmButtons.confirm")}
        confirmButtonType={"submit"}
      />
    </form>
  );
};
