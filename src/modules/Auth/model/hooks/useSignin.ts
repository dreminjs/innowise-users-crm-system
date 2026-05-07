"use client";
import { useLazyQuery } from "@apollo/client/react";
import { SIGNIN } from "../../api/queries";
import { AuthInput } from "@/generated/graphql";
import { useRouter } from "next/navigation";
import { useNotification } from "@/modules/Notifications/";
import { useEffect } from "react";
import { useTokens } from "@/modules/Tokens";

export const useSignin = () => {
  const addNotification = useNotification((state) => state.addNotification);
  const setAccessToken = useTokens((state) => state.setAccessToken);
  const setRefreshToken = useTokens((state) => state.setRefreshToken);

  const router = useRouter();
  const [mutate, { data, loading, error }] = useLazyQuery(SIGNIN);

  useEffect(() => {
    if (data) {
      setAccessToken(data.login.access_token);
      setRefreshToken(data.login.refresh_token);
      router.push("/users");
    } else if (error && !data) {
      addNotification({
        message: error.message,
        type: "error",
      });
    }
  }, [data, error]);

  return {
    onSubmit: (dto: AuthInput) => {
      mutate({ variables: { dto } });
    },
    data,
    loading,
    error,
  };
};
