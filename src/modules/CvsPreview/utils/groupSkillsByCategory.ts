import { GetSkillCategoriesQuery } from "@/graphql/graphql";

type Skill = {
  name: string;
  mastery: string;
  categoryId?: string | null;
};

export const groupSkillsByCategory = (
  skills: Skill[],
  categories: GetSkillCategoriesQuery["skillCategories"],
) => {
  const categoryMap = Object.fromEntries(
    categories.map((cat) => [cat.id, cat]),
  );
  const result: Record<
    string,
    {
      groupName: string;
      skills: Skill[];
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
};
