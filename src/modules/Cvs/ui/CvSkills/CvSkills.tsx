"use client";

import { useMemo } from "react";
import { useQuery } from "@apollo/client/react";
import { GET_SKILL_CATEGORIES } from "@/modules/Skills/api/queries";
import { GET_CV_SKILLS } from "@/modules/Cvs/api/queries";
import { Loading } from "@/shared/ui/Loading";
import { SkillItem } from "@/modules/Skills/ui/SkillsList/SkillItem";
import styles from "@/modules/Skills/ui/Skills.module.css";
import { TMastery } from "@/modules/Skills/model/skill.interface";
import { CvManagementSkills } from "@/modules/Cvs/ui/CvSkills/CvManagementSkills";
import { CvSkillItem } from "@/modules/Cvs/ui/CvSkills/CvSkillItem";

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
    <section className={styles.skills}>
      <div className={styles.skillsLists}>
        {grouped.map(({ groupName, skills }) => (
          <div key={groupName} className={styles.group}>
            <h3 className={styles.categoryName}>{groupName}</h3>
            <ul className={styles.skillsList}>
              {skills.map((skill, index) => (
                <CvSkillItem
                  key={index}
                  name={skill.name}
                  mastery={skill.mastery as TMastery}
                  categoryId={skill.categoryId}
                />
              ))}
            </ul>
          </div>
        ))}
      </div>
      <CvManagementSkills cvId={cvId} />
    </section>
  );
};
