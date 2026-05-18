"use client";

import { FC } from "react";
import { Controller } from "react-hook-form";
import { useQuery } from "@apollo/client/react";
import { Mastery } from "@/generated/graphql";
import { skillLevels } from "@/modules/Skills/model/skill.constants";
import { useSkillForm } from "@/modules/Skills/model/hooks/useSkillForm";
import { TSkillForm } from "@/modules/Skills/model/skill.interface";
import { GET_SKILLS } from "@/modules/Skills/api/queries";
import { CustomSelect } from "@/shared/ui/CustomSelect";
import { ConfirmButtons } from "@/shared/ui/ConfirmButtons";
import { useUpdateCvSkill } from "@/modules/Cvs/hooks/useUpdateCvSkill";
import styles from "@/modules/Skills/ui/Skills.module.css";
import { useTranslations } from "next-intl";

type Props = {
  cvId: string;
  toggleAction: () => void;
} & TSkillForm;

export const EditCvSkillForm: FC<Props> = ({
  cvId,
  toggleAction,
  mastery,
  categoryId,
}) => {
  const { data: skillsData } = useQuery(GET_SKILLS);
  const [updateCvSkill] = useUpdateCvSkill(cvId);
  const {
    control,
    handleChangeSkill,
    handleChangeMastery,
    currentCategoryId,
    handleSubmit,
    reset,
  } = useSkillForm({
    categoryId,
    mastery,
  });
  const t = useTranslations("ConfirmButtons");

  const onSubmit = async (data: TSkillForm) => {
    const selectedSkill = skillsData?.skills.find(
      (skill) => skill.id === data.categoryId,
    );
    if (!selectedSkill) {
      return;
    }
    await updateCvSkill({
      variables: {
        skill: {
          cvId,
          name: selectedSkill.name,
          categoryId: data.categoryId,
          mastery: data.mastery,
        },
      },
    });
    toggleAction();
    reset();
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
            disabled={true}
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
        onCancel={toggleAction}
        confirmLabel={t("confirm")}
        confirmButtonType={"submit"}
      />
    </form>
  );
};
