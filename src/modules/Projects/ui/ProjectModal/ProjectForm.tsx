"use client";

import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ModalField } from "@/shared/ui/ModalField/ModalField";
import { DatePicker } from "@/shared/ui/DatePicker/DatePicker";
import styles from "./ProjectModal.module.css";
import {
  createProjectSchema,
  TProjectFormData,
} from "@/modules/Projects/model/project.schema";
import { ConfirmButtons } from "@/shared/ui/ConfirmButtons";

type Props = {
  mode: "create" | "edit";
  loading?: boolean;
  closeAction: () => void;
  defaultValues?: {
    name: string;
    domain: string;
    description: string;
    environment: string[];
    start_date: string;
    end_date?: string | null;
  };
  submitAction: (values: {
    name: string;
    domain: string;
    description: string;
    environment: string[];
    start_date: string;
    end_date?: string | null;
  }) => Promise<void>;
};

export const ProjectForm = ({
  mode,
  loading,
  closeAction,
  defaultValues,
  submitAction,
}: Props) => {
  const t = useTranslations("ProjectModal");
  const schema = createProjectSchema(t);

  const {
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<TProjectFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: defaultValues?.name ?? "",
      domain: defaultValues?.domain ?? "",
      description: defaultValues?.description ?? "",
      environment: defaultValues?.environment.join(", ") ?? "",
      startDate: defaultValues?.start_date ?? "",
      endDate: defaultValues?.end_date ?? "",
    },
  });

  const onSubmit = async (form: TProjectFormData) => {
    await submitAction({
      name: form.name,
      domain: form.domain,
      description: form.description,
      start_date: form.startDate,
      end_date: form.endDate || null,
      environment: form.environment
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    });

    closeAction();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <ModalField
        label={t("name")}
        active={Boolean(watch("name"))}
        error={errors.name?.message}
      >
        <input
          value={watch("name")}
          onChange={(e) =>
            setValue("name", e.target.value, {
              shouldValidate: true,
            })
          }
          className={styles.input}
        />
      </ModalField>

      <ModalField label={t("domain")} active={Boolean(watch("domain"))}>
        <input
          value={watch("domain")}
          onChange={(e) => setValue("domain", e.target.value)}
          className={styles.input}
        />
      </ModalField>

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
        active={Boolean(watch("description"))}
      >
        <textarea
          value={watch("description")}
          onChange={(e) => setValue("description", e.target.value)}
          className={styles.textarea}
        />
      </ModalField>

      <ModalField
        label={t("environment")}
        active={Boolean(watch("environment"))}
      >
        <input
          value={watch("environment")}
          onChange={(e) => setValue("environment", e.target.value)}
          className={styles.input}
        />
      </ModalField>

      <ConfirmButtons
        confirmLabel={t(mode === "create" ? "create" : "save")}
        confirmButtonType="submit"
        cancelAction={closeAction}
        disabled={loading}
      />
    </form>
  );
};
