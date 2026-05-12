import { GetCvsQuery } from "@/graphql/graphql";
import { getCvUserName } from "./getCvUserName";

type Cv = GetCvsQuery["cvs"][number];

export const filterCvs = (cvs: Cv[], search: string) => {
  const normalized = search.toLowerCase().trim();
  if (!normalized) return cvs;
  return cvs.filter((cv) => {
    const userName = getCvUserName(cv).toLowerCase();
    return (
      cv.name.toLowerCase().includes(normalized) ||
      cv.description.toLowerCase().includes(normalized) ||
      userName.includes(normalized)
    );
  });
};
