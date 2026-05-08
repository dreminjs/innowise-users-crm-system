import { useQuery } from "@apollo/client/react";
import { GET_USER_PROFILE } from "../../api/queries";
import { useDynamicSegment } from "@/application/store/dynamicSegment.store";
import { useEffect } from "react";

export const useGetProfile = (userId: string) => {
  const setSegment = useDynamicSegment((state) => state.setSegment);

  const { data, loading, error } = useQuery(GET_USER_PROFILE, {
    variables: { userId },
  });

  useEffect(() => {
    if (!error) {
      if (data?.user.profile.first_name && data?.user.profile.last_name) {
        setSegment(data.user.profile.first_name + data.user.profile.last_name);
      } else if (data?.user.email) {
        setSegment(data.user.email);
      }
    }
  }, [loading, data, error, setSegment]);

  return {
    data,
    loading,
    error,
  };
};
