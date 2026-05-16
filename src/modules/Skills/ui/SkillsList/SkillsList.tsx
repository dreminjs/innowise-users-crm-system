import { FC, useMemo, useState } from "react";
import { SkillItem } from "./SkillItem";
import { TMastery, TSkillForm } from "../../model/skill.interface";
import {
  GetProfileSkillsQuery,
  GetSkillCategoriesQuery,
} from "@/graphql/graphql";
import { Empty } from "@/shared/ui/Empty";
import styles from "../Skills.module.css";
import { EditSkillModal } from "../EditSkillModal/EditSkillModal";
import { useSkillStore } from "../../model/skill.store";
import { Mastery } from "@/generated/graphql";

interface ISkillsListProps {
  categoriesData: GetSkillCategoriesQuery;
  profileSkillsData: GetProfileSkillsQuery;
  isAvailableToChange: boolean;
}

export const SkillsList: FC<ISkillsListProps> = ({
  categoriesData,
  isAvailableToChange,
  profileSkillsData,
}) => {
  const { deleteSkills, toggleDeleteSkill, isDeleteMode } = useSkillStore();

  const [skillToEdit, setSkillToEdit] = useState<TSkillForm | null>(null);
  const skills = profileSkillsData?.profile?.skills ?? [];
  const categories = categoriesData?.skillCategories ?? [];

  const handleClick = (dto: TSkillForm & { name: string }) => {
    if (isDeleteMode) {
      toggleDeleteSkill(dto.name);
    } else {
      setSkillToEdit({ ...dto });
    }
  };

  const handleCloseModal = () => {
    setSkillToEdit(null);
  };

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

  if (!grouped.length) return <Empty />;

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
                  isActive={Boolean(deleteSkills[skill.name])}
                  {...(isAvailableToChange && {
                    onClick: () =>
                      handleClick({
                        categoryId: skill.categoryId!,
                        mastery: skill.mastery as TMastery,
                        name: skill.name,
                      }),
                  })}
                />
              ))}
            </ul>
          </div>
        ))}
      </div>
      <EditSkillModal
        open={Boolean(skillToEdit)}
        onClose={handleCloseModal}
        categoryId={skillToEdit?.categoryId ?? ""}
        mastery={(skillToEdit?.mastery as Mastery) ?? ""}
      />
    </>
  );
};
