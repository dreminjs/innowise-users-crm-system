import { useNotification } from "@/modules/Notifications";

type Props = {
  successMessage: string;
  errorMessage: string;
};

export const useMutationNotification = ({
  successMessage,
  errorMessage,
}: Props) => {
  const addNotification = useNotification((state) => state.addNotification);

  const handleSuccess = () => {
    addNotification({
      type: "success",
      message: successMessage,
    });
  };

  const handleError = () => {
    addNotification({
      type: "error",
      message: errorMessage,
    });
  };

  return {
    onCompleted: handleSuccess,
    onError: handleError,
  };
};
