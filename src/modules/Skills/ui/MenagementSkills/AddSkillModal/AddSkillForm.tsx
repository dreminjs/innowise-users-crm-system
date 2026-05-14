import {
  GET_PROFILE_SKILLS,
  GET_SKILLS,
  GET_SKILL_CATEGORIES,
} from "@/modules/Skills/api/queries";
import { useAddProfileSkill } from "@/modules/Skills/model/hooks/useAddProfileSkill";
import { skillLevels } from "@/modules/Skills/model/skill.constants";
import { CustomSelect } from "@/shared/ui/CustomSelect";
import { useQuery } from "@apollo/client/react";
import { Controller } from "react-hook-form";
import { useSkillForm } from "@/modules/Skills/model/hooks/useSkillForm";
import styles from "../../Skills.module.css";
import { ConfirmButtons } from "@/shared/ui/ConfirmButtons";
import { TSkillForm } from "@/modules/Skills/model/skill.interface";
import { Mastery } from "@/generated/graphql";
import { FC, useMemo } from "react";
import { useUserStore } from "@/application/store/user.store";

interface IEditSkillFormProps {
  onToggle: () => void;
}

export const AddSkillForm: FC<IEditSkillFormProps> = ({ onToggle }) => {
  const currentUserId = useUserStore((state) => state.userId);
  const { handleAddProfileSkill } = useAddProfileSkill();
  const { data: skillsData } = useQuery(GET_SKILLS);
  const { data: categoriesData } = useQuery(GET_SKILL_CATEGORIES);
  const { data: profileData } = useQuery(GET_PROFILE_SKILLS, {
    variables: { userId: currentUserId || "" },
  });

  const {
    control,
    handleChangeSkill,
    handleChangeMastery,
    currentCategoryId,
    handleSubmit,
    reset,
  } = useSkillForm();

  const availableSkills =
    skillsData?.skills.filter((el) =>
      profileData?.profile.skills.every((e) => e.categoryId !== el.id),
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

  const onSubmit = async (data: TSkillForm) => {
    handleAddProfileSkill(data).then(() => {
      reset();
      onToggle();
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
            options={groupedSkills}
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
            disabled={!currentCategoryId}
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
