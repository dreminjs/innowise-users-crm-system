"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTokens } from "@/modules/Tokens";

export default function Home() {
  const router = useRouter();

  const accessToken = useTokens((state) => state.accessToken);

  useEffect(() => {
    if (!accessToken) {
      router.replace("/auth/signin");
    } else {
      router.replace("/users");
    }
  }, [accessToken, router]);

  return <div>...</div>;
}
