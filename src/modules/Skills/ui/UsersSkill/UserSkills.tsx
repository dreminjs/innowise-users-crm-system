import { MenagementSkills } from "../MenagementSkills/MenagementSkills";
import { SkillsList } from "@/modules/Skills";
import { useQuery } from "@apollo/client/react";
import { GET_PROFILE_SKILLS, GET_SKILL_CATEGORIES } from "../../api/queries";
import { Loading } from "@/shared/ui/Loading";
import { FC } from "react";

interface ISkllsProps {
  userSkillsId: string;
  currentUserId: string;
}

export const UserSkills: FC<ISkllsProps> = ({
  userSkillsId,
  currentUserId,
}) => {
  const {
    data: categoriesData,
    loading,
    error,
  } = useQuery(GET_SKILL_CATEGORIES);
  const { data: profileData } = useQuery(GET_PROFILE_SKILLS, {
    variables: { userId: currentUserId },
  });
  if (loading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <section>
      {currentUserId && (
        <>
          {categoriesData?.skillCategories.length &&
            profileData?.profile?.skills?.length && (
              <SkillsList
                categoriesData={categoriesData}
                profileSkillsData={profileData}
                isAvailableToChange={userSkillsId === currentUserId}
              />
            )}
          <MenagementSkills
            isAvailableToDelete={Boolean(profileData?.profile?.skills?.length)}
          />
        </>
      )}
    </section>
  );
};
