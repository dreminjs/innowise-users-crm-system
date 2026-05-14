import { useUserStore } from "@/application/store/user.store";
import { Skills } from "../ui/Skills";
import styles from "../ui/Skills.module.css";

export const SkillsPage = () => {
  const currentUserId = useUserStore((state) => state.userId);

  return (
    <div className={styles.page}>
      {currentUserId && (
        <Skills userSkillsId={currentUserId} currentUserId={currentUserId} />
      )}
    </div>
  );
};
