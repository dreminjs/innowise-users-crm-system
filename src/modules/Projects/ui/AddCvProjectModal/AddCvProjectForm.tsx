"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@apollo/client/react";
import styles from "./AddCvProjectModal.module.css";
import { useAddCvProject } from "@/modules/Projects/hooks/useAddCvProject";
import { GET_PROJECT_OPTIONS } from "@/modules/Projects/api/queries";
import { CustomSelect } from "@/shared/ui/CustomSelect/CustomSelect";

type Props = {
  cvId: string;
  onClose: () => void;
};

export const AddCvProjectForm = ({ cvId, onClose }: Props) => {
  const [projectId, setProjectId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const { data } = useQuery(GET_PROJECT_OPTIONS);
  const [addCvProject] = useAddCvProject(cvId);
  const selectedProject = useMemo(() => {
    return data?.projects.find((project) => project.id === projectId);
  }, [data, projectId]);
  const handleSubmit = async () => {
    if (!projectId) return;
    try {
      await addCvProject({
        variables: {
          project: {
            cvId,
            projectId,
            start_date: startDate,
            end_date: endDate || null,
            roles: [],
            responsibilities: [responsibilities],
          },
        },
      });
      onClose();
    } catch (error) {
      throw error;
    }
  };
  return (
    <div className={styles.form}>
      <div className={styles.row}>
        <div className={styles.field}>
          <CustomSelect
            label="Project"
            value={projectId}
            onChange={setProjectId}
            options={
              data?.projects.map((project) => ({
                label: project.name,
                value: project.id,
              })) ?? []
            }
          />
        </div>
        <div className={styles.field}>
          <input
            value={selectedProject?.domain ?? ""}
            disabled
            placeholder=" "
            className={styles.input}
          />
          <label className={styles.label}>Domain</label>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.field}>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            placeholder=" "
            className={styles.input}
          />
          <label className={styles.label}>Start Date</label>
        </div>
        <div className={styles.field}>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            placeholder=" "
            className={styles.input}
          />
          <label className={styles.label}>End Date</label>
        </div>
      </div>
      <div className={styles.field}>
        <textarea
          value={selectedProject?.description ?? ""}
          readOnly
          placeholder=" "
          className={styles.textarea}
        />
        <label className={styles.label}>Description</label>
      </div>
      <div className={styles.field}>
        <input
          value={selectedProject?.environment.join(", ") ?? ""}
          readOnly
          placeholder=" "
          className={styles.input}
        />
        <label className={styles.label}>Environment</label>
      </div>
      <div className={styles.field}>
        <textarea
          value={responsibilities}
          onChange={(e) => setResponsibilities(e.target.value)}
          placeholder=" "
          className={styles.textarea}
        />
        <label className={styles.label}>Responsibilities</label>
      </div>
      <div className={styles.actions}>
        <button onClick={onClose} className={styles.cancelButton}>
          CANCEL
        </button>
        <button onClick={handleSubmit} className={styles.submitButton}>
          ADD
        </button>
      </div>
    </div>
  );
};
