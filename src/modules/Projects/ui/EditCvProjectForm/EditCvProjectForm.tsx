"use client";
import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "../../pages/EditCvProjectPage/EditCvProjectPage.module.css";
import { ModalField } from "@/shared/ui/ModalField/ModalField";
import { DatePicker } from "@/shared/ui/DatePicker/DatePicker";
import { ConfirmButtons } from "@/shared/ui/ConfirmButtons";
import { CustomSelect } from "@/shared/ui/CustomSelect/CustomSelect";
import { createEditCvProjectSchema } from "@/modules/Projects/model/editCvProject.schema";
import { TEditCvProjectFormData } from "@/modules/Projects/model/editCvProject.types";
type ProjectOption = {
  label: string;
  value: string;
  domain: string;
  description: string;
  environment: string[];
};
type Props = {
  initialValues: TEditCvProjectFormData;
  loading: boolean;
  projectOptions: ProjectOption[];
  usedProjectIds: string[];
  submitAction: (values: TEditCvProjectFormData) => Promise<void>;
  cancelAction: () => void;
};
export const EditCvProjectForm = ({
  initialValues,
  loading,
  projectOptions,
  usedProjectIds,
  submitAction,
  cancelAction,
}: Props) => {
  const t = useTranslations("EditCvProject");
  const schema = createEditCvProjectSchema(t);
  const {
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<TEditCvProjectFormData>({
    resolver: zodResolver(schema),
    defaultValues: initialValues,
  });
  const selectedProjectId = watch("projectId");
  const availableProjects = projectOptions.filter(
    (project) =>
      project.value === selectedProjectId ||
      !usedProjectIds?.includes(project.value),
  );
  const selectedProject = availableProjects.find(
    (project) => project.value === selectedProjectId,
  );
  useEffect(() => {
    if (!selectedProject) {
      return;
    }
    setValue("name", selectedProject.label);
    setValue("domain", selectedProject.domain);
    setValue("description", selectedProject.description);
    setValue("environment", selectedProject.environment);
  }, [selectedProject, setValue]);
  const onSubmit = async (form: TEditCvProjectFormData) => {
    await submitAction(form);
  };
  return (
    <form className={styles.card} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.grid}>
        <CustomSelect
          label={t("project")}
          value={watch("projectId")}
          error={errors.projectId?.message}
          onChange={(value) =>
            setValue("projectId", value, {
              shouldValidate: true,
            })
          }
          options={availableProjects.map((project) => ({
            label: project.label,
            value: project.value,
          }))}
        />
        <ModalField label={t("domain")} active={Boolean(watch("domain"))}>
          <input value={watch("domain")} readOnly />
        </ModalField>
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
        active={Boolean(watch("description"))}
      >
        <textarea value={watch("description")} readOnly />
      </ModalField>
      <ModalField
        label={t("environment")}
        active={Boolean(watch("environment").length)}
      >
        <input value={watch("environment").join(", ")} readOnly />
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
        />
      </ModalField>
      <ConfirmButtons
        confirmLabel={loading ? t("saving") : t("save")}
        confirmButtonType="submit"
        cancelAction={cancelAction}
        disabled={loading}
      />
    </form>
  );
};
