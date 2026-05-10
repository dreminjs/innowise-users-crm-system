import { useAddProfileSkill } from "@/modules/Skills/model/hooks/useAddProfileSkill";
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
import { useEditProfileSkill } from "../../model/hooks/useEditProfileSkill";

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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.addSkillForm}>
      <Controller
        control={control}
        name={"categoryId"}
        render={({ field }) => (
          <CustomSelect
            label={"Skill"}
            options={
              skillsData?.skills.map((el) => ({
                value: el.id,
                label: el.name,
              })) || []
            }
            value={field.value}
            onChange={handleChangeSkill}
            disabled={false}
          />
        )}
      />
      <Controller
        control={control}
        name={"mastery"}
        render={({ field }) => (
          <CustomSelect
            label={"Skill mastery"}
            options={skillLevels.map((el) => ({
              value: el,
              label: el,
            }))}
            value={field.value}
            disabled={!Boolean(currentCategoryId)}
            onChange={(value) => handleChangeMastery(value as Mastery)}
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
