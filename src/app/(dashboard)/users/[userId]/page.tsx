"use client";
import { ProfilePage } from "@/modules/Users";
import { use } from "react";

export default function Page({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = use(params);
  return <ProfilePage userId={userId} />;
}
