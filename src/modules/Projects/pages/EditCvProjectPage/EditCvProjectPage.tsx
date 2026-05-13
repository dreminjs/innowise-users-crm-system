"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@apollo/client/react";
import styles from "./EditCvProjectPage.module.css";
import { useUpdateCvProject } from "@/modules/Projects/hooks/useUpdateProject";
import { GET_CV_PROJECTS } from "@/modules/Projects/api/queries";

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

  const [updateCvProject, { loading: saving }] = useUpdateCvProject(cvId);

  const project = useMemo(() => {
    return data?.cv?.projects?.find((project) => project.id === projectId);
  }, [data, projectId]);

  const [isInitialized, setIsInitialized] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [responsibilities, setResponsibilities] = useState("");

  if (project && !isInitialized) {
    setStartDate(project.start_date ?? "");
    setEndDate(project.end_date ?? "");
    setResponsibilities(project.responsibilities?.[0] ?? "");
    setIsInitialized(true);
  }
  const handleSubmit = async () => {
    if (!project || !project.id) return;
    try {
      await updateCvProject({
        variables: {
          project: {
            cvId,
            projectId: project.id,
            start_date: startDate,
            end_date: endDate || null,
            roles: [],
            responsibilities: [responsibilities],
          },
        },
      });
    } catch (error) {
      throw error;
    }
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
          <div>
            <h1 className={styles.title}>Edit Project</h1>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.grid}>
            <div className={styles.field}>
              <label className={styles.label}>Project</label>
              <input value={project.name} disabled className={styles.input} />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Domain</label>
              <input value={project.domain} disabled className={styles.input} />
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
              value={project.description}
              disabled
              className={styles.textarea}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Environment</label>
            <input
              value={project.environment.join(", ")}
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
            <div className={styles.actions}>
              <button
                onClick={handleSubmit}
                disabled={saving || !project}
                className={styles.saveButton}
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
