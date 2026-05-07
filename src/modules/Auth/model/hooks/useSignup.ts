import { useMutation } from "@apollo/client/react";
import { SIGNUP } from "../../api/queries";
import { AuthInput } from "@/generated/graphql";
import { useNotification } from "@/modules/Notifications/";
import { useRouter } from "next/navigation";
import { useTokens } from "@/modules/Tokens";
export const useSignup = () => {
  const router = useRouter();
  const addNotification = useNotification((state) => state.addNotification);
  const setAccessToken = useTokens((state) => state.setAccessToken);
  const setRefreshToken = useTokens((state) => state.setRefreshToken);
  const [mutate, { loading, error }] = useMutation(SIGNUP, {
    onError(error) {
      addNotification({ message: error.message, type: "error" });
    },
    onCompleted(data) {
      setAccessToken(data.signup.access_token);
      setRefreshToken(data.signup.refresh_token);
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
