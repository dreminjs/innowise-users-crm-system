import { useQuery } from "@apollo/client/react";
import { Controller } from "react-hook-form";
import { ConfirmButtons } from "@/shared/ui/ConfirmButtons";
import { CustomSelect } from "@/shared/ui/CustomSelect";
import { useEditProfileLanguage } from "../../model/hooks/useEditProfileLanguage";
import { TLanguageForm } from "../../model/languages.interface";
import { useLanguageForm } from "../../model/hooks/useLanguageForm";
import { GET_LANGUAGES } from "../../api/queries";
import { FC } from "react";
import { languageProfiency } from "../../model/languages.constants";
import { Proficiency } from "@/generated/graphql";
import styles from "../Languages.module.css";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("");
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
            label={t("Languages.chooseLanguage")}
            options={
              languagesData?.languages.map((el) => ({
                value: el!.name,
                label: t(`Languages.${el!.name}`) || "Unknow",
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
        cancelAction={toggleAction}
        confirmLabel={t("ConfirmButtons.confirm")}
        confirmButtonType={"submit"}
      />
    </form>
  );
};
