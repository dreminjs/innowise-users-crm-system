"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@apollo/client/react";
import styles from "./AddCvProjectModal.module.css";
import { GET_PROJECT_OPTIONS } from "@/modules/Projects/api/queries";
import { useAddCvProject } from "@/modules/Projects/hooks/useAddCvProject";
import { CustomSelect } from "@/shared/ui/CustomSelect/CustomSelect";
import { DatePicker } from "@/shared/ui/DatePicker/DatePicker";
import { ModalField } from "@/shared/ui/ModalField/ModalField";

type Props = {
  cvId: string;
  closeAction: () => void;
};

export const AddCvProjectForm = ({ cvId, closeAction }: Props) => {
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
      closeAction();
    } catch (error) {
      throw error;
    }
  };
  return (
    <div className={styles.form}>
      <div className={styles.row}>
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
        <ModalField label="Domain" active={Boolean(selectedProject?.domain)}>
          <input value={selectedProject?.domain ?? ""} readOnly />
        </ModalField>
      </div>
      <div className={styles.row}>
        <ModalField label="Start Date" active={Boolean(startDate)}>
          <DatePicker label="" value={startDate} changeAction={setStartDate} />
        </ModalField>
        <ModalField label="End Date" active={Boolean(endDate)}>
          <DatePicker label="" value={endDate} changeAction={setEndDate} />
        </ModalField>
      </div>
      <ModalField
        label="Description"
        textarea
        active={Boolean(selectedProject?.description)}
      >
        <textarea value={selectedProject?.description ?? ""} readOnly />
      </ModalField>
      <ModalField
        label="Environment"
        active={Boolean(selectedProject?.environment?.length)}
      >
        <input value={selectedProject?.environment.join(", ") ?? ""} readOnly />
      </ModalField>
      <ModalField
        label="Responsibilities"
        textarea
        active={Boolean(responsibilities)}
      >
        <textarea
          value={responsibilities}
          onChange={(e) => setResponsibilities(e.target.value)}
        />
      </ModalField>
      <div className={styles.actions}>
        <button
          type="button"
          onClick={closeAction}
          className={styles.cancelButton}
        >
          CANCEL
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className={styles.submitButton}
        >
          ADD
        </button>
      </div>
    </div>
  );
};
