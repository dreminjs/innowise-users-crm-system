import { useQuery } from "@apollo/client/react";
import { GET_PROFILE_SKILLS } from "../../api/queries";
import { FC, useMemo } from "react";
import { SkillItem } from "./SkillItem";
import styles from "../Skills.module.css";
import { TMastery } from "../../model/skill.interface";
import { GetSkillCategoriesQuery } from "@/graphql/graphql";
import { Empty } from "@/shared/ui/Empty";
interface ISkillsListProps {
  userId: string;
  categoriesData: GetSkillCategoriesQuery;
  isAvailableToChange: boolean;
}

export const SkillsList: FC<ISkillsListProps> = ({
  userId,
  categoriesData,
  isAvailableToChange,
}) => {
  // console.log("Sklls list", categoriesData);
  const { data: profileData } = useQuery(GET_PROFILE_SKILLS, {
    variables: { userId },
  });

  const skills = profileData?.profile?.skills ?? [];
  const categories = categoriesData?.skillCategories ?? [];

  const grouped = useMemo(() => {
    const categoryMap = Object.fromEntries(
      categories.map((cat) => [cat.id, cat]),
    );

    const result: Record<string, { groupName: string; skills: typeof skills }> =
      {};

    skills.forEach((skill) => {
      if (!skill.categoryId) return;
      const category = categoryMap[skill.categoryId];
      if (!category) return;

      const group = category.parent ?? category;

      if (!result[group.id]) {
        result[group.id] = { groupName: group.name, skills: [] };
      }
      result[group.id].skills.push(skill);
    });

    return Object.values(result);
  }, [skills, categories]);

  console.log(grouped);

  return (
    <>
      <div className={styles.skillsLists}>
        {grouped.map(({ groupName, skills }) => (
          <div key={groupName} className={styles.group}>
            <h3 className={styles.categoryName}>{groupName}</h3>
            <ul className={styles.skillsList}>
              {skills.map((skill, i) => (
                <SkillItem
                  key={i}
                  name={skill.name}
                  mastery={skill.mastery as TMastery}
                  categoryId={skill.categoryId}
                  isAvailableToChange={isAvailableToChange}
                />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
};
