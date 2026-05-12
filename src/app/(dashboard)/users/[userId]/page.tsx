"use client";
import { useGetProfile, ProfilePage } from "@/modules/Users";
import { use } from "react";

export default function Page({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = use(params);
  const { data } = useGetProfile(userId);

  return <ProfilePage userId={userId} />;
}
