import { GetProjectsQuery } from "@/graphql/graphql";
export type ProjectSortField = "name" | "domain" | "start_date" | "end_date";
export type ProjectSortOrder = "asc" | "desc";
type Project = NonNullable<GetProjectsQuery["projects"][number]>;

export const processProjects = (
  projects: Project[],
  search: string,
  sortField: ProjectSortField,
  sortOrder: ProjectSortOrder,
) => {
  const normalized = search.toLowerCase();
  const filtered = projects.filter((project) => {
    return (
      project.name.toLowerCase().includes(normalized) ||
      project.domain?.toLowerCase().includes(normalized)
    );
  });

  filtered.sort((a, b) => {
    const modifier = sortOrder === "asc" ? 1 : -1;
    if (sortField === "name") {
      return a.name.localeCompare(b.name) * modifier;
    }
    if (sortField === "domain") {
      return (a.domain ?? "").localeCompare(b.domain ?? "") * modifier;
    }
    if (sortField === "start_date") {
      return (
        (new Date(a.start_date).getTime() - new Date(b.start_date).getTime()) *
        modifier
      );
    }
    return (
      (new Date(a.end_date ?? "9999-12-31").getTime() -
        new Date(b.end_date ?? "9999-12-31").getTime()) *
      modifier
    );
  });

  return filtered;
};
