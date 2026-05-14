import { useUserStore } from "@/application/store/user.store";
import { MenagementSkills } from "./MenagementSkills/MenagementSkills";
import { SkillsList } from "@/modules/Skills";
import { useQuery } from "@apollo/client/react";
import { GET_SKILL_CATEGORIES } from "../api/queries";
import { Loading } from "@/shared/ui/Loading";
import { FC } from "react";

interface ISkllsProps {
  userSkillsId: string;
  currentUserId: string;
}

export const Skills: FC<ISkllsProps> = ({ userSkillsId, currentUserId }) => {
  const {
    data: categoriesData,
    loading,
    error,
  } = useQuery(GET_SKILL_CATEGORIES);
  if (loading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <section>
      {currentUserId && (
        <>
          {categoriesData?.skillCategories.length && (
            <SkillsList
              userId={currentUserId}
              categoriesData={categoriesData}
              isAvailableToChange={userSkillsId === currentUserId}
            />
          )}
          <MenagementSkills />
        </>
      )}
    </section>
  );
};
