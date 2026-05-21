"use client";

import { Languages } from "@/modules/Languages/pages/Languages";
import { useUserStore } from "@/application/store/user.store";
import { UserRole } from "@/generated/graphql";
import { LanguagesPage } from "@/modules/Languages/pages/LanguagesPage";

export default function Page() {
  const userId = useUserStore((state) => state.userId);
  const role = useUserStore((state) => state.role);
  const isAdmin = role === UserRole.Admin;
  if (!userId) {
    return;
  }
  return <>{isAdmin ? <Languages /> : <LanguagesPage userId={userId} />}</>;
}
