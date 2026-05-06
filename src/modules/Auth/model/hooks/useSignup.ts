import { useMutation } from "@apollo/client/react";
import { SIGNUP } from "../../api/queries";
import { AuthInput } from "@/generated/graphql";
import { useNotification } from "@/modules/Notifications/model/notification.store";
import { redirect } from "next/navigation";
export const useSignup = () => {
  const addNotification = useNotification((state) => state.addNotification);

  const [mutate, { loading, error }] = useMutation(SIGNUP, {
    onError(error) {
      addNotification({ message: error.message, type: "error" });
    },
    onCompleted() {
      console.log("onCompleted: redirecting to /users");
      redirect("/users");
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
