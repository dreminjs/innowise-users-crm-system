"use client";
import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { useQuery } from "@apollo/client/react";
import { useRouter } from "next/navigation";
import styles from "./EditCvProjectPage.module.css";
import {
  GET_CV_PROJECTS,
  GET_PROJECT_OPTIONS,
} from "@/modules/Projects/api/queries";
import { useUpdateCvProject } from "@/modules/Projects/hooks/useUpdateProject";
import { useAddCvProject } from "@/modules/Projects/hooks/useAddCvProject";
import { Loading } from "@/shared/ui/Loading";
import { Empty } from "@/shared/ui/Empty";
import { EditCvProjectForm } from "@/modules/Projects/ui/EditCvProjectForm/EditCvProjectForm";
import {
  mapCvProjectToFormValues,
  mapFormToAddCvProjectInput,
  mapFormToUpdateCvProjectInput,
} from "@/modules/Projects/model/editCvProject.mapper";
import { TEditCvProjectFormData } from "@/modules/Projects/model/editCvProject.types";
import { useRemoveCvProject } from "@/modules/Projects/hooks/useDeleteProject";

type Props = {
  cvId: string;
  projectId: string;
};
export const EditCvProjectPage = ({ cvId, projectId }: Props) => {
  const t = useTranslations("EditCvProject");
  const router = useRouter();
  const { data, loading } = useQuery(GET_CV_PROJECTS, {
    variables: {
      cvId,
    },
  });
  const { data: projectsData } = useQuery(GET_PROJECT_OPTIONS);
  const [updateCvProject, { loading: updatingProject }] =
    useUpdateCvProject(cvId);
  const [addCvProject, { loading: addingProject }] = useAddCvProject(cvId);
  const [removeCvProject, { loading: removingProject }] =
    useRemoveCvProject(cvId);
  const cvProject = useMemo(() => {
    return data?.cv?.projects?.find(
      (project) => project.project.id === projectId,
    );
  }, [data, projectId]);
  const initialValues = useMemo(() => {
    if (!cvProject) {
      return null;
    }
    return mapCvProjectToFormValues(cvProject);
  }, [cvProject]);
  const projectOptions = useMemo(() => {
    const usedProjectIds =
      data?.cv?.projects
        ?.filter((project) => project.project.id !== projectId)
        .map((project) => project.project.id) ?? [];
    return (
      projectsData?.projects
        .filter((project) => !usedProjectIds.includes(project.id))
        .map((project) => ({
          label: project.name,
          value: project.id,
          domain: project.domain,
          description: project.description,
          environment: project.environment,
        })) ?? []
    );
  }, [projectsData, data, projectId]);
  const handleSubmit = async (form: TEditCvProjectFormData) => {
    if (!cvProject) {
      return;
    }
    const isProjectChanged = form.projectId !== cvProject.project.id;
    if (isProjectChanged) {
      await removeCvProject({
        variables: {
          project: {
            cvId,
            projectId: cvProject.project.id,
          },
        },
      });
      await addCvProject({
        variables: mapFormToAddCvProjectInput(cvId, cvProject, form),
      });
    } else {
      await updateCvProject({
        variables: mapFormToUpdateCvProjectInput(cvId, cvProject, form),
      });
    }
    router.replace(`/cvs/${cvId}/projects`);
  };
  if (loading) {
    return <Loading />;
  }
  if (!cvProject || !initialValues) {
    return <Empty />;
  }
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>{t("title")}</h1>
        </div>
        <EditCvProjectForm
          initialValues={initialValues}
          loading={updatingProject || addingProject || removingProject}
          projectOptions={projectOptions}
          submitAction={handleSubmit}
          cancelAction={() => router.replace(`/cvs/${cvId}/projects`)}
          usedProjectIds={[]}
        />
      </div>
    </div>
  );
};
