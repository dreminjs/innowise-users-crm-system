"use client";
import { useUserStore } from "@/application/store/user.store";
import { SkillsList } from "@/modules/Skills";
import {
  GET_PROFILE_SKILLS,
  GET_SKILL_CATEGORIES,
} from "@/modules/Skills/api/queries";
import { Loading } from "@/shared/ui/Loading";
import { useQuery } from "@apollo/client/react";
import { usePathname } from "next/navigation";

export default function Page() {
  const pathname = usePathname();
  const skillsUserId = pathname.split("/")[2];
  const userId = useUserStore((state) => state.userId);
  const {
    data: categoriesData,
    loading,
    error,
  } = useQuery(GET_SKILL_CATEGORIES);

  const { data: profileData } = useQuery(GET_PROFILE_SKILLS, {
    variables: { userId: skillsUserId },
  });

  if (loading) return <Loading />;

  if (error) return <div>Error: {error.message}</div>;

  if (!categoriesData?.skillCategories.length) return <div>Empty :(</div>;

  return (
    <>
      {categoriesData && profileData?.profile && (
        <SkillsList
          categoriesData={categoriesData}
          isAvailableToChange={skillsUserId === userId}
          profileSkillsData={profileData}
        />
      )}
    </>
  );
}
