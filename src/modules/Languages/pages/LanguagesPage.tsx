import { FC } from "react";
import { Languages } from "../ui/Langauges";
import styles from "../ui/Languages.module.css";
import { useUserStore } from "@/application/store/user.store";
interface ILanguagesProps {
  userId: string;
}

export const LanguagesPage: FC<ILanguagesProps> = ({ userId }) => {
  const currentUserId = useUserStore((state) => state.userId);
  return (
    <main className={styles.page}>
      {userId && currentUserId && (
        <Languages usersLanguagesId={userId} currentUserId={currentUserId} />
      )}
    </main>
  );
};
