"use client";
import { useTokens } from "@/modules/Tokens/";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const useCheckAuth = (isTokenNessecary: boolean) => {
  const accessToken = useTokens((state) => state.accessToken);
  const router = useRouter();

  useEffect(() => {
    if (isTokenNessecary && !accessToken) {
      router.push("/login");
    } else if (!isTokenNessecary && accessToken) {
      router.push("/");
    }
  }, [accessToken]);
};
