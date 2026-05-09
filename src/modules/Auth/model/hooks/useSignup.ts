import { useMutation } from "@apollo/client/react";
import { AuthInput } from "@/generated/graphql";
import { useNotification } from "@/modules/Notifications/";
import { useRouter } from "next/navigation";
import { useTokens } from "@/modules/Tokens";
import { SIGNUP } from "../../api/mutations";
import { useUserStore } from "@/application/store/user.store";
export const useSignup = () => {
  const router = useRouter();
  const addNotification = useNotification((state) => state.addNotification);
  const setAccessToken = useTokens((state) => state.setAccessToken);
  const setRefreshToken = useTokens((state) => state.setRefreshToken);
  const setUser = useUserStore((state) => state.setUser);

  const [mutate, { loading, error }] = useMutation(SIGNUP, {
    onError(error) {
      addNotification({ message: error.message, type: "error" });
    },
    onCompleted(data) {
      setAccessToken(data.signup.access_token);
      setRefreshToken(data.signup.refresh_token);
      setUser({
        role: data.signup.user.role,
        userId: data.signup.user.id,
        email: data.signup.user.email,
        position_name: data.signup.user.position_name,
      });
      router.push("/users");
    },
  });

  return {
    onSubmit: (dto: AuthInput) => {
      mutate({ variables: { dto } });
    },

    loading,
    error,
  };
};
