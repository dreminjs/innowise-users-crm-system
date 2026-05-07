"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTokens } from "@/modules/Tokens";

export default function Home() {
  // const router = useRouter();

  // const accessToken = useTokens((state) => state.accessToken);
  // const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect(() => {
  //   setMounted(true);
  // }, []);
  // useEffect(() => {
  //   if (!accessToken) {
  //     router.replace("/auth/signin");
  //   } else {
  //     router.replace("/users");
  //   }
  // }, [accessToken, router]);

  // if (!mounted) {
  //   return null;
  // }

  return (
    <div>
      The current theme is: {theme}
      <button onClick={() => setTheme("light")}>Light Mode</button>
      <button onClick={() => setTheme("dark")}>Dark Mode</button>
    </div>
  );
}
