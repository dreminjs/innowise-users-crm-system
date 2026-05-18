"use client";

import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@apollo/client/react";
import { useRouter } from "next/navigation";
import styles from "./EditCvProjectPage.module.css";
import { GET_CV_PROJECTS } from "@/modules/Projects/api/queries";
import { useUpdateCvProject } from "@/modules/Projects/hooks/useUpdateProject";
import { DatePicker } from "@/shared/ui/DatePicker/DatePicker";
import { Loading } from "@/shared/ui/Loading";
import { Empty } from "@/shared/ui/Empty";
import { ModalField } from "@/shared/ui/ModalField/ModalField";
import { ConfirmButtons } from "@/shared/ui/ConfirmButtons";
type Props = {
  cvId: string;
  projectId: string;
};

export const EditCvProjectPage = ({ cvId, projectId }: Props) => {
  const router = useRouter();
  const { data, loading } = useQuery(GET_CV_PROJECTS, {
    variables: {
      cvId,
    },
  });

  const [updateCvProject, { loading: saving }] = useUpdateCvProject(cvId);
  const project = useMemo(() => {
    return data?.cv?.projects?.find(
      (project) => project.project.id === projectId,
    );
  }, [data, projectId]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [responsibilities, setResponsibilities] = useState("");

  useEffect(() => {
    if (!project) return;
    setStartDate(project.start_date ?? "");
    setEndDate(project.end_date ?? "");
    setResponsibilities(project.responsibilities?.[0] ?? "");
  }, [project]);

  const handleSubmit = async () => {
    if (!project) return;

    await updateCvProject({
      variables: {
        project: {
          cvId,
          projectId: project.project.id,
          start_date: startDate,
          end_date: endDate || null,
          roles: project.roles ?? [],
          responsibilities: responsibilities ? [responsibilities] : [],
        },
      },
    });
    router.replace(`/cvs/${cvId}/projects`);
  };

  if (loading) {
    return <Loading />;
  }

  if (!project) {
    return <Empty />;
  }
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Edit Project</h1>
        </div>
        <div className={styles.card}>
          <div className={styles.grid}>
            <ModalField label="Project" active={Boolean(project.project.name)}>
              <input value={project.project.name} readOnly placeholder=" " />
            </ModalField>

            <ModalField label="Domain" active={Boolean(project.project.domain)}>
              <input value={project.project.domain} readOnly placeholder=" " />
            </ModalField>

            <ModalField label="Start Date" active={Boolean(startDate)}>
              <DatePicker
                label=""
                value={startDate}
                changeAction={setStartDate}
              />
            </ModalField>

            <ModalField label="End Date" active={Boolean(endDate)}>
              <DatePicker label="" value={endDate} changeAction={setEndDate} />
            </ModalField>
          </div>

          <ModalField
            label="Description"
            textarea
            active={Boolean(project.project.description)}
          >
            <textarea
              value={project.project.description}
              readOnly
              placeholder=" "
            />
          </ModalField>

          <ModalField
            label="Environment"
            active={Boolean(project.project.environment?.length)}
          >
            <input
              value={project.project.environment.join(", ")}
              readOnly
              placeholder=" "
            />
          </ModalField>

          <ModalField
            label="Responsibilities"
            textarea
            active={Boolean(responsibilities)}
          >
            <textarea
              value={responsibilities}
              onChange={(e) => setResponsibilities(e.target.value)}
              placeholder=" "
            />
          </ModalField>
          <ConfirmButtons
            confirmLabel={saving ? "Saving..." : "Save"}
            confirmButtonType="button"
            onConfirm={handleSubmit}
            onCancel={() => router.replace(`/cvs/${cvId}/projects`)}
            disabled={saving}
          />
        </div>
      </div>
    </div>
  );
};
