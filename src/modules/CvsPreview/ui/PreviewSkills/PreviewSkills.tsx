import { useQuery } from "@apollo/client/react";
import { GET_SKILL_CATEGORIES } from "@/modules/Skills/api/queries";
import { GetCvQuery } from "@/graphql/graphql";
import { groupSkillsByCategory } from "../../utils/groupSkillsByCategory";
import styles from "./PreviewSkills.module.css";

type Props = {
  skills: GetCvQuery["cv"]["skills"];
};

export const PreviewSkills = ({ skills }: Props) => {
  const { data } = useQuery(GET_SKILL_CATEGORIES);
  const grouped = groupSkillsByCategory(skills, data?.skillCategories ?? []);
  return (
    <section>
      <h2 className={`${styles.title} preview-title`}>Professional skills</h2>
      <table className={styles.table}>
        <tbody>
          {grouped.map(({ groupName, skills }) => (
            <tr key={groupName} className={styles.row}>
              <td className={styles.category}>{groupName}</td>
              <td className={styles.skills}>
                {skills.map((skill, index) => (
                  <span key={skill.name}>
                    {skill.name}
                    {index !== skills.length - 1 && ", "}
                  </span>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};
