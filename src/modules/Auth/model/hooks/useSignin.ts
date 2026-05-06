import { useLazyQuery } from "@apollo/client/react";
import { SIGNIN } from "../../api/queries";
import { AuthInput } from "@/generated/graphql";

export const useSignin = () => {
  const [mutate, { data, loading, error }] = useLazyQuery(SIGNIN);

  return {
    onSubmit: (dto: AuthInput) => {
      mutate({ variables: { dto } });
    },
    data,
    loading,
    error,
  };
};
