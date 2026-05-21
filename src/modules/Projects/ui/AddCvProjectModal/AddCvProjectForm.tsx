"use client";
import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { useQuery } from "@apollo/client/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./AddCvProjectModal.module.css";
import { GET_PROJECT_OPTIONS } from "@/modules/Projects/api/queries";
import { useAddCvProject } from "@/modules/Projects/hooks/useAddCvProject";
import { CustomSelect } from "@/shared/ui/CustomSelect/CustomSelect";
import { DatePicker } from "@/shared/ui/DatePicker/DatePicker";
import { ModalField } from "@/shared/ui/ModalField/ModalField";
import {
  createAddCvProjectSchema,
  TAddCvProjectFormData,
} from "@/modules/Projects/model/addCvProject.schema";

type Props = {
  cvId: string;
  closeAction: () => void;
};

export const AddCvProjectForm = ({ cvId, closeAction }: Props) => {
  const t = useTranslations("AddCvProject");
  const schema = createAddCvProjectSchema(t);
  const { data } = useQuery(GET_PROJECT_OPTIONS);
  const [addCvProject] = useAddCvProject(cvId);
  const {
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<TAddCvProjectFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      projectId: "",
      startDate: "",
      endDate: "",
      responsibilities: "",
    },
  });

  const projectId = watch("projectId");
  const selectedProject = useMemo(() => {
    return data?.projects.find((project) => project.id === projectId);
  }, [data, projectId]);

  const onSubmit = async (form: TAddCvProjectFormData) => {
    try {
      await addCvProject({
        variables: {
          project: {
            cvId,
            projectId: form.projectId,
            start_date: form.startDate,
            end_date: form.endDate || null,
            roles: [],
            responsibilities: [form.responsibilities],
          },
        },
      });
      closeAction();
    } catch (error) {
      throw error;
    }
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.row}>
        <CustomSelect
          label={t("project")}
          value={watch("projectId")}
          error={errors.projectId?.message}
          onChange={(value) =>
            setValue("projectId", value, {
              shouldValidate: true,
            })
          }
          options={
            data?.projects.map((project) => ({
              label: project.name,
              value: project.id,
            })) ?? []
          }
        />
        <ModalField
          label={t("domain")}
          active={Boolean(selectedProject?.domain)}
        >
          <input value={selectedProject?.domain ?? ""} readOnly />
        </ModalField>
      </div>
      <div className={styles.row}>
        <ModalField
          label={t("startDate")}
          active={Boolean(watch("startDate"))}
          error={errors.startDate?.message}
        >
          <DatePicker
            value={watch("startDate")}
            changeAction={(value) =>
              setValue("startDate", value, {
                shouldValidate: true,
              })
            }
          />
        </ModalField>
        <ModalField
          label={t("endDate")}
          active={Boolean(watch("endDate"))}
          error={errors.endDate?.message}
        >
          <DatePicker
            value={watch("endDate")}
            changeAction={(value) =>
              setValue("endDate", value, {
                shouldValidate: true,
              })
            }
          />
        </ModalField>
      </div>
      <ModalField
        label={t("description")}
        textarea
        active={Boolean(selectedProject?.description)}
      >
        <textarea value={selectedProject?.description ?? ""} readOnly />
      </ModalField>
      <ModalField
        label={t("environment")}
        active={Boolean(selectedProject?.environment?.length)}
      >
        <input value={selectedProject?.environment.join(", ") ?? ""} readOnly />
      </ModalField>
      <ModalField
        label={t("responsibilities")}
        textarea
        active={Boolean(watch("responsibilities"))}
        error={errors.responsibilities?.message}
      >
        <textarea
          value={watch("responsibilities")}
          onChange={(e) =>
            setValue("responsibilities", e.target.value, {
              shouldValidate: true,
            })
          }
          placeholder=" "
        />
      </ModalField>
      <div className={styles.actions}>
        <button
          type="button"
          onClick={closeAction}
          className={styles.cancelButton}
        >
          {t("cancel")}
        </button>
        <button type="submit" className={styles.submitButton}>
          {t("add")}
        </button>
      </div>
    </form>
  );
};
