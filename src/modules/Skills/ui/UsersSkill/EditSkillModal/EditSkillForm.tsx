import { skillLevels } from "@/modules/Skills/model/skill.constants";
import { CustomSelect } from "@/shared/ui/CustomSelect";
import { useQuery } from "@apollo/client/react";
import { Controller } from "react-hook-form";
import { useSkillForm } from "@/modules/Skills/model/hooks/useSkillForm";
import { ConfirmButtons } from "@/shared/ui/ConfirmButtons";
import { TSkillForm } from "@/modules/Skills/model/skill.interface";
import { Mastery } from "@/generated/graphql";
import { FC } from "react";
import { GET_SKILLS } from "@/modules/Skills/api/queries";
import styles from "../Skills.module.css";
import { useEditProfileSkill } from "../../../model/hooks/useEditProfileSkill";
import { useTranslations } from "next-intl";

type TEditSkillFormProps = {
  onToggle: () => void;
} & TSkillForm;

export const EditSkillForm: FC<TEditSkillFormProps> = ({
  onToggle,
  mastery,
  categoryId,
}) => {
  const { handleEditProfileSkill } = useEditProfileSkill();
  const { data: skillsData } = useQuery(GET_SKILLS);
  const {
    control,
    handleChangeSkill,
    handleChangeMastery,
    currentCategoryId,
    handleSubmit,
    reset,
  } = useSkillForm({ categoryId, mastery });

  const onSubmit = async (data: TSkillForm) => {
    handleEditProfileSkill(data).then(() => {
      onToggle();
      reset();
    });
  };

  const t = useTranslations();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.addSkillForm}>
      <Controller
        control={control}
        name={"categoryId"}
        render={({ field }) => (
          <CustomSelect
            label={t("Skills.chooseSkill")}
            options={
              skillsData?.skills.map((el) => ({
                value: el.id,
                label: el.name,
              })) || []
            }
            value={field.value}
            onChange={handleChangeSkill}
            disabled={true}
          />
        )}
      />
      <Controller
        control={control}
        name={"mastery"}
        render={({ field }) => (
          <CustomSelect
            label={t("Skills.skillMastery")}
            options={skillLevels.map((el) => ({
              value: el,
              label: t(`Skills.${el}`),
            }))}
            value={field.value}
            disabled={!Boolean(currentCategoryId)}
            onChange={(value) => handleChangeMastery(value as Mastery)}
            testId="select-mastery"
          />
        )}
      />
      <ConfirmButtons
        cancelAction={onToggle}
        confirmLabel={t("ConfirmButtons.confirm")}
        confirmButtonType={"submit"}
      />
    </form>
  );
};
