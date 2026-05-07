import { useMutation } from "@apollo/client/react";
import { FORGOT_PASSWORD } from "../../api/queries";
import { ForgotPasswordInput } from "@/generated/graphql";
import { useNotification } from "@/modules/Notifications";
import { useRouter } from "next/navigation";

export const useForgotPassword = () => {
  const addNotification = useNotification((state) => state.addNotification);
  const [forgotPassword, { loading, error }] = useMutation(FORGOT_PASSWORD, {
    onCompleted() {
      addNotification({ message: "Проверьте вашу почту", type: "success" });
    },
    onError: (error) => {
      addNotification({ message: error.message, type: "error" });
    },
  });

  return {
    onSubmit: (data: ForgotPasswordInput) => {
      forgotPassword({ variables: { dto: data } });
    },
    loading,
    error,
  };
};
