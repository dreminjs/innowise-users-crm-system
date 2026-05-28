"use client";
import { SkillsPage } from "@/modules/Skills/pages/SkillsPage";
import { UserSkills } from "@/modules/Skills/ui/UsersSkill/UserSkills";
import { useUserStore } from "@/application/store/user.store";

export default function Page() {
  const userId = useUserStore((state) => state.userId);
  const role = useUserStore((state) => state.role);
  const isAdmin = role === "Admin";
  if (!userId || !role) {
    return;
  }
  return (
    <>
      {isAdmin ? (
        <SkillsPage />
      ) : (
        <UserSkills
          userSkillsId={userId}
          currentUserId={userId}
          isAdmin={isAdmin}
        />
      )}
    </>
  );
}
