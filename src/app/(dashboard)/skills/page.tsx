"use client";
import { SkillsPage } from "@/modules/Skills/pages/SkillsPage";
import { UserSkills } from "@/modules/Skills/ui/UsersSkill/UserSkills";
import { useUserStore } from "@/application/store/user.store";
import { UserRole } from "@/generated/graphql";
import { unauthorized } from "next/navigation";

export default function Page() {
  const userId = useUserStore((state) => state.userId);
  if (!userId) {
    unauthorized();
  }
  const role = useUserStore((state) => state.role);
  const isAdmin = role === UserRole.Admin;
  return (
    <>
      {isAdmin ? (
        <SkillsPage />
      ) : (
        <UserSkills userSkillsId={userId} currentUserId={userId} />
      )}
    </>
  );
}
