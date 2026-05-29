"use client";
import { useUserStore } from "@/application/store/user.store";
import { UserSkills } from "@/modules/Skills/ui/UsersSkill/UserSkills";
import { use } from "react";
import { UserRole } from "@/generated/graphql";

export default function Page({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = use(params);
  const currentUserId = useUserStore((state) => state.userId);
  const currentUserRole = useUserStore((state) => state.role);
  const isAdmin = currentUserRole === UserRole.Admin;
  if (!currentUserId || !currentUserRole) {
    return null;
  }
  return (
    <>
      <UserSkills
        userSkillsId={userId}
        currentUserId={currentUserId}
        isAdmin={isAdmin}
      />
    </>
  );
}
