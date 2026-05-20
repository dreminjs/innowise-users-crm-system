"use client";

import { use } from "react";
import { LanguagesPage } from "@/modules/Languages/pages/LanguagesPage";

export default function Page({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = use(params);
  return <LanguagesPage userId={userId} />;
}
