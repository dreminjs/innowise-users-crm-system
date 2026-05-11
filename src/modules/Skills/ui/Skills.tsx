import { useUserStore } from "@/application/store/user.store";
import { MenagementSkills } from "./MenagementSkills/MenagementSkills";
import { SkillsList } from "./SkillsList/SkillsList";
import { useQuery } from "@apollo/client/react";
import { GET_SKILL_CATEGORIES } from "../api/queries";
import { Loading } from "@/shared/ui/Loading";
import styles from "./Skills.module.css";

export const Skills = () => {
  const currentUserId = useUserStore((state) => state.userId);
  const {
    data: categoriesData,
    loading,
    error,
  } = useQuery(GET_SKILL_CATEGORIES);

  if (loading) return <Loading />;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <section className={styles.skills}>
      {categoriesData && currentUserId && (
        <>
          <SkillsList
            userId={currentUserId}
            categoriesData={categoriesData ?? []}
          />
          <MenagementSkills />
        </>
      )}
    </section>
  );
};
