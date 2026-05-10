import { useUserStore } from "@/application/store/user.store";
import { MenagementSkills } from "./MenagementSkills/MenagementSkills";
import { SkillsList } from "./SkillsList/SkillsList";
import styles from "./Skills.module.css";
import { useQuery } from "@apollo/client/react";
import { GET_SKILL_CATEGORIES } from "../api/queries";
import { Spinner } from "@chakra-ui/react";

export const Skills = () => {
  const currentUserId = useUserStore((state) => state.userId);
  const {
    data: categoriesData,
    loading,
    error,
  } = useQuery(GET_SKILL_CATEGORIES);

  if (loading) return <Spinner />;

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
