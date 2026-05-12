import { GetCvsQuery } from "@/graphql/graphql";
import { getCvUserName } from "./getCvUserName";

type Cv = GetCvsQuery["cvs"][number];

export type CvSortField = "name" | "user";
export type CvSortOrder = "asc" | "desc";

export const sortCvs = (cvs: Cv[], field: CvSortField, order: CvSortOrder) => {
  return [...cvs].sort((a, b) => {
    const first = field === "name" ? a.name : getCvUserName(a);
    const second = field === "name" ? b.name : getCvUserName(b);
    const result = first.localeCompare(second);
    return order === "asc" ? result : -result;
  });
};
