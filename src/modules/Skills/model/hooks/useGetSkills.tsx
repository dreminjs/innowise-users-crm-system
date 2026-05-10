import { useQuery } from "@apollo/client/react";
import { GET_SKILLS } from "../../api/queries";

export const useGetSkills = () => {
  return useQuery(GET_SKILLS);
};
