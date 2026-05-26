import { GetCvProjectsQuery } from "@/graphql/graphql";
import { TEditCvProjectFormData } from "./editCvProject.types";

type CvProject = NonNullable<
  NonNullable<GetCvProjectsQuery["cv"]>["projects"]
>[number];

export const mapCvProjectToFormValues = (
  cvProject: CvProject,
): TEditCvProjectFormData => {
  return {
    projectId: cvProject.project.id,
    name: cvProject.project.name,
    domain: cvProject.project.domain,
    description: cvProject.project.description,
    environment: cvProject.project.environment,
    startDate: cvProject.start_date ?? "",
    endDate: cvProject.end_date ?? "",
    responsibilities: cvProject.responsibilities?.[0] ?? "",
  };
};

export const mapFormToUpdateCvProjectInput = (
  cvId: string,
  cvProject: CvProject,
  form: TEditCvProjectFormData,
) => {
  return {
    project: {
      cvId,
      projectId: cvProject.project.id,
      start_date: form.startDate,
      end_date: form.endDate || null,
      roles: cvProject.roles ?? [],
      responsibilities: form.responsibilities ? [form.responsibilities] : [],
    },
  };
};

export const mapFormToAddCvProjectInput = (
  cvId: string,
  cvProject: CvProject,
  form: TEditCvProjectFormData,
) => {
  return {
    project: {
      cvId,
      projectId: form.projectId,
      start_date: form.startDate,
      end_date: form.endDate || null,
      roles: cvProject.roles ?? [],
      responsibilities: form.responsibilities ? [form.responsibilities] : [],
    },
  };
};
