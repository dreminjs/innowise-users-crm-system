import { FC } from "react";
import styles from "../Skills.module.css";

interface ISkillsRowTableProps {
  name: string;
  type: string;
  category: string;
}

export const SkillsRowTable: FC<ISkillsRowTableProps> = ({
  name,
  type,
  category,
}) => {
  return (
    <tr>
      <td className={styles.nameColumn}>{name}</td>
      <td className={styles.typeColumn}>{type}</td>
      <td className={styles.categoryColumn}>{category}</td>
    </tr>
  );
};
