import { useQuery } from "@apollo/client/react";
import { GET_SKILL_CATEGORIES } from "@/modules/Skills/api/queries";
import { GetCvQuery } from "@/graphql/graphql";
import { AppMessages } from "@/shared/lib/getMessages";
import { groupSkillsByCategory } from "../../utils/groupSkillsByCategory";
import styles from "./PreviewSkills.module.css";
import { useTranslations } from "next-intl";

type Props = {
  skills: GetCvQuery["cv"]["skills"];
  messages: AppMessages;
};

export const PreviewSkills = ({ skills, messages }: Props) => {
  const { data } = useQuery(GET_SKILL_CATEGORIES);
  const grouped = groupSkillsByCategory(skills, data?.skillCategories ?? []);
  const t = useTranslations("Skills");
  return (
    <section>
      <h2 className={`${styles.title} preview-title`}>
        {messages?.Preview.professionalSkills}
      </h2>
      <table className={styles.table}>
        <tbody>
          {grouped.map(({ groupName, skills }) => (
            <tr key={groupName} className={styles.row}>
              <td className={styles.category}>
                {messages?.Skills[groupName as keyof typeof messages.Skills] ??
                  t(groupName)}
              </td>
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
