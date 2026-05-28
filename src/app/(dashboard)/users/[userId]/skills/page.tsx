"use client";
import { useUserStore } from "@/application/store/user.store";
import { UserSkills } from "@/modules/Skills/ui/UsersSkill/UserSkills";
import { use } from "react";

export default function Page({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = use(params);
  const currentUserId = useUserStore((state) => state.userId);
  const currentUserRole = useUserStore((state) => state.role);

  if (!currentUserId || !currentUserRole) {
    return null;
  }
  return (
    <>
      <UserSkills
        userSkillsId={userId}
        currentUserId={currentUserId}
        role={currentUserRole}
      />
    </>
  );
}
