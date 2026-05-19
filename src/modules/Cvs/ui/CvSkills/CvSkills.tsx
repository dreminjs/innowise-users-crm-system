"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@apollo/client/react";
import { GET_SKILL_CATEGORIES } from "@/modules/Skills/api/queries";
import { GET_CV_SKILLS } from "@/modules/Cvs/api/queries";
import { Loading } from "@/shared/ui/Loading";
import { TMastery, TSkillForm } from "@/modules/Skills/model/skill.interface";
import { CvManagementSkills } from "@/modules/Cvs/ui/CvSkills/CvManagementSkills";
import { useCvSkillStore } from "../../model/cv-skill.store";
import styles from "@/modules/Skills/ui/Skills.module.css";
import { SkillItem } from "@/modules/Skills/ui/UsersSkill/SkillsList/SkillItem";
import { EditCvSkillModal } from "./modals/EditCvSkillModal";
import { useTranslations } from "next-intl";

type Props = {
  cvId: string;
};

export const CvSkills = ({ cvId }: Props) => {
  const {
    data: categoriesData,
    loading: categoriesLoading,
    error: categoriesError,
  } = useQuery(GET_SKILL_CATEGORIES);

  const {
    data: cvData,
    loading: cvLoading,
    error: cvError,
  } = useQuery(GET_CV_SKILLS, {
    variables: {
      cvId,
    },
  });
  const skills = cvData?.cv?.skills ?? [];
  const categories = categoriesData?.skillCategories ?? [];
  const { isDeleteMode, toggleSkill, deleteSkills } = useCvSkillStore();

  const [skillToEdit, setSkillToEdit] = useState<TSkillForm | null>(null);
  const t = useTranslations("Skills");

  const handleClick = (dto: TSkillForm & { name: string }) => {
    if (isDeleteMode) {
      toggleSkill(dto.name);
    } else {
      setSkillToEdit({ ...dto });
    }
  };
  const grouped = useMemo(() => {
    const categoryMap = Object.fromEntries(
      categories.map((cat) => [cat.id, cat]),
    );

    const result: Record<
      string,
      {
        groupName: string;
        skills: typeof skills;
      }
    > = {};

    skills.forEach((skill) => {
      if (!skill.categoryId) return;
      const category = categoryMap[skill.categoryId];
      if (!category) return;
      const group = category.parent ?? category;
      if (!result[group.id]) {
        result[group.id] = {
          groupName: group.name,
          skills: [],
        };
      }
      result[group.id].skills.push(skill);
    });
    return Object.values(result);
  }, [skills, categories]);

  if (categoriesLoading || cvLoading) {
    return <Loading />;
  }
  if (categoriesError) {
    return <div>Error: {categoriesError.message}</div>;
  }
  if (cvError) {
    return <div>Error: {cvError.message}</div>;
  }
  return (
    <>
      <section className={styles.skills}>
        <div className={styles.skillsLists}>
          {grouped.map(({ groupName, skills }) => (
            <div key={groupName} className={styles.group}>
              <h3 className={styles.categoryName}>{t(groupName)}</h3>
              <ul className={styles.skillsList}>
                {skills.map((skill, index) => (
                  <SkillItem
                    key={index}
                    name={skill.name}
                    mastery={skill.mastery as TMastery}
                    isActive={deleteSkills[skill.name] ?? false}
                    onClick={() =>
                      handleClick({
                        name: skill.name,
                        mastery: skill.mastery as TMastery,
                        categoryId: skill.categoryId!,
                      })
                    }
                  />
                ))}
              </ul>
            </div>
          ))}
        </div>
        <CvManagementSkills cvId={cvId} />
      </section>
      <EditCvSkillModal
        cvId={cvId}
        open={Boolean(skillToEdit)}
        toggleAction={() => setSkillToEdit(null)}
        categoryId={skillToEdit?.categoryId ?? null}
        mastery={skillToEdit?.mastery as TMastery}
      />
    </>
  );
};
