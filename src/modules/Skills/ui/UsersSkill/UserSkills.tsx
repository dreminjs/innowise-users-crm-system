import { MenagementSkills } from "../MenagementSkills/MenagementSkills";
import { SkillsList } from "@/modules/Skills";
import { useQuery } from "@apollo/client/react";
import { GET_PROFILE_SKILLS, GET_SKILL_CATEGORIES } from "../../api/queries";
import { Loading } from "@/shared/ui/Loading";
import { FC } from "react";
import { UserRole } from "@/graphql/graphql";
import { Empty } from "@/shared/ui/Empty";

interface ISkllsProps {
  userSkillsId: string;
  currentUserId: string;
  role: UserRole;
}

export const UserSkills: FC<ISkllsProps> = ({
  userSkillsId,
  currentUserId,
  role,
}) => {
  const {
    data: categoriesData,
    loading,
    error,
  } = useQuery(GET_SKILL_CATEGORIES);
  const { data: profileData } = useQuery(GET_PROFILE_SKILLS, {
    variables: { userId: currentUserId },
  });
  console.log(userSkillsId);
  const isEditable = role === UserRole.Admin || userSkillsId === currentUserId;
  if (loading) return <Loading />;
  if (error || !categoriesData?.skillCategories || !profileData?.profile) {
    return <Empty />;
  }
  const hasSkills = profileData.profile.skills.length > 0;
  const hasCategories = categoriesData.skillCategories.length > 0;

  return (
    <section>
      {hasCategories && hasSkills ? (
        <SkillsList
          categoriesData={categoriesData}
          profileSkillsData={profileData}
          isAvailableToChange={isEditable}
        />
      ) : (
        <Empty />
      )}
      {isEditable && <MenagementSkills isAvailableToDelete={hasSkills} />}
    </section>
  );
};
