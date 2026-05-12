import { useUserStore } from "@/application/store/user.store";
import { Languages } from "../ui/Langauges";
import styles from "../ui/Languages.module.css";
export const LanguagesPage = () => {
  const currentUserId = useUserStore((state) => state.userId);
  return (
    <main className={styles.page}>
      {currentUserId && <Languages usersLanguagesId={currentUserId} />}
    </main>
  );
};
