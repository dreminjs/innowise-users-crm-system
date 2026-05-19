import { useUserStore } from "@/application/store/user.store";
import { UserSkills } from "../ui/UsersSkill/UserSkills";
import { Skills } from "../ui/Skills/Skills";
import styles from "./SkillsPage.module.css";

export const SkillsPage = () => {
  const currentUserId = useUserStore((state) => state.userId);
  const role = useUserStore((state) => state.role);
  return (
    <div className={styles.page}>
      {currentUserId &&
        (role === "Admin" ? (
          <Skills />
        ) : (
          <UserSkills
            userSkillsId={currentUserId}
            currentUserId={currentUserId}
          />
        ))}
    </div>
  );
};
