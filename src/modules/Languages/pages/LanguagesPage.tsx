import { FC } from "react";
import { Languages } from "../ui/Langauges";
import styles from "../ui/Languages.module.css";
interface ILanguagesProps {
  userId: string;
}

export const LanguagesPage: FC<ILanguagesProps> = ({ userId }) => {
  return (
    <main className={styles.page}>
      {userId && <Languages usersLanguagesId={userId} />}
    </main>
  );
};
