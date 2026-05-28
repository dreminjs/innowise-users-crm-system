"use client";
import { useLazyQuery } from "@apollo/client/react";
import { SIGNIN } from "../../api/queries";
import { AuthInput } from "@/generated/graphql";
import { useNotification } from "@/modules/Notifications/";
import { useEffect } from "react";
import { useTokens } from "@/modules/Tokens";
import { useUserStore } from "@/application/store/user.store";

export const useSignin = () => {
  const addNotification = useNotification((state) => state.addNotification);
  const setAccessToken = useTokens((state) => state.setAccessToken);
  const setRefreshToken = useTokens((state) => state.setRefreshToken);
  const setUser = useUserStore((state) => state.setUser);
  const [mutate, { data, loading, error }] = useLazyQuery(SIGNIN);

  useEffect(() => {
    if (data) {
      setAccessToken(data.login.access_token);
      setRefreshToken(data.login.refresh_token);
      setUser({
        role: data.login.user.role,
        userId: data.login.user.id,
        email: data.login.user.email,
        position_name: data.login.user.position_name,
      });
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
