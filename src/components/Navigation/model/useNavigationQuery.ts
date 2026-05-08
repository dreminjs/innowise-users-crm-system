import { useQuery } from "@apollo/client/react";
import { INavigationItemPayload } from "./navigation.interface";
import { GET_USER_FULLNAME } from "@/modules/Users/api/queries";

export const useNavigationQuery = (payload: INavigationItemPayload) => {
  const isEmployee = payload.type === "employee";

  // const { data } = useQuery(GET_USER_FULLNAME, {
  //   skip: !isEmployee,
  //   variables: { userId: payload.id },
  // });
};
