"use client";

import { Controller } from "react-hook-form";
import { useMemo } from "react";
import { useQuery } from "@apollo/client/react";
import { Mastery } from "@/generated/graphql";
import { GET_SKILLS, GET_SKILL_CATEGORIES } from "@/modules/Skills/api/queries";
import { GET_CV_SKILLS } from "@/modules/Cvs/api/queries";
import { CustomSelect } from "@/shared/ui/CustomSelect";
import { ConfirmButtons } from "@/shared/ui/ConfirmButtons";
import { skillLevels } from "@/modules/Skills/model/skill.constants";
import { useSkillForm } from "@/modules/Skills/model/hooks/useSkillForm";
import { useAddCvSkill } from "@/modules/Cvs/hooks/useAddCvSkill";
import styles from "@/modules/Skills/ui/Skills.module.css";

type Props = {
  cvId: string;
  toggleAction: () => void;
};

export const AddCvSkillForm = ({ cvId, toggleAction }: Props) => {
  const [addCvSkill, { loading }] = useAddCvSkill(cvId);
  const { data: skillsData } = useQuery(GET_SKILLS);
  const { data: categoriesData } = useQuery(GET_SKILL_CATEGORIES);
  const { data: cvSkillsData } = useQuery(GET_CV_SKILLS, {
    variables: {
      cvId,
    },
  });

  const {
    control,
    handleSubmit,
    handleChangeSkill,
    handleChangeMastery,
    currentCategoryId,
    reset,
  } = useSkillForm({
    categoryId: "",
    mastery: Mastery.Novice,
  });
  const existingSkillIds =
    cvSkillsData?.cv?.skills.map((skill) => skill.categoryId) || [];
  const availableSkills =
    skillsData?.skills.filter(
      (skill) => !existingSkillIds.includes(skill.id),
    ) || [];

  const groupedSkills = useMemo(() => {
    const categories = categoriesData?.skillCategories || [];
    const categoryMap = Object.fromEntries(
      categories.map((cat) => [cat.id, cat]),
    );
    const grouped: Record<
      string,
      {
        label: string;
        items: {
          label: string;
          value: string;
        }[];
      }
    > = {};

    availableSkills.forEach((skill) => {
      const category = categoryMap[skill.id];
      if (!category) {
        return;
      }
      const group = category.parent ?? category;
      if (!grouped[group.id]) {
        grouped[group.id] = {
          label: group.name,
          items: [],
        };
      }
      grouped[group.id].items.push({
        label: skill.name,
        value: skill.id,
      });
    });
    return Object.values(grouped);
  }, [availableSkills, categoriesData]);

  const onSubmit = async (data: {
    categoryId: string | null;
    mastery: Mastery | null;
  }) => {
    if (!data.categoryId || !data.mastery) {
      return;
    }
    const selectedSkill = availableSkills.find(
      (skill) => skill.id === data.categoryId,
    );
    if (!selectedSkill) {
      return;
    }
    try {
      await addCvSkill({
        variables: {
          skill: {
            cvId,
            name: selectedSkill.name,
            categoryId: data.categoryId,
            mastery: data.mastery,
          },
        },
      });
      reset();
      toggleAction();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.addSkillForm}>
      <Controller
        control={control}
        name={"categoryId"}
        render={({ field }) => (
          <CustomSelect
            label={"Skill"}
            options={groupedSkills}
            value={field.value}
            onChange={handleChangeSkill}
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
        confirmLabel={loading ? "LOADING..." : "CONFIRM"}
        confirmButtonType={"submit"}
      />
    </form>
  );
};
