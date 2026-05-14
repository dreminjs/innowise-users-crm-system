"use client";

import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@apollo/client/react";
import styles from "./EditCvProjectPage.module.css";
import { GET_CV_PROJECTS } from "@/modules/Projects/api/queries";
import { useUpdateCvProject } from "@/modules/Projects/hooks/useUpdateProject";
import { useRouter } from "next/navigation";

type Props = {
  cvId: string;
  projectId: string;
};

export const EditCvProjectPage = ({ cvId, projectId }: Props) => {
  const { data, loading } = useQuery(GET_CV_PROJECTS, {
    variables: {
      cvId,
    },
  });
  const router = useRouter();
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
    if (!project) {
      return;
    }
    setStartDate(project.start_date ?? "");
    setEndDate(project.end_date ?? "");
    setResponsibilities(project.responsibilities?.[0] ?? "");
  }, [project]);

  const handleSubmit = async () => {
    if (!project) {
      return;
    }
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
    return <div className={styles.loaderWrapper}>Loading...</div>;
  }

  if (!project) {
    return <div className={styles.notFound}>Project not found</div>;
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Edit Project</h1>
        </div>
        <div className={styles.card}>
          <div className={styles.grid}>
            <div className={styles.field}>
              <label className={styles.label}>Project</label>
              <input
                value={project.project.name}
                disabled
                className={styles.input}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Domain</label>
              <input
                value={project.project.domain}
                disabled
                className={styles.input}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className={styles.input}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className={styles.input}
              />
            </div>
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Description</label>
            <textarea
              value={project.project.description}
              disabled
              className={styles.textarea}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Environment</label>
            <input
              value={project.project.environment.join(", ")}
              disabled
              className={styles.input}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Responsibilities</label>
            <textarea
              value={responsibilities}
              onChange={(e) => setResponsibilities(e.target.value)}
              className={styles.textarea}
            />
          </div>
          <div className={styles.actions}>
            <button
              onClick={handleSubmit}
              disabled={saving}
              className={styles.saveButton}
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
