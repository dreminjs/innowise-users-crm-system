"use client";

import { useTranslations } from "next-intl";
import { FormModal } from "@/shared/ui/FormModal";
import { ProjectForm } from "@/modules/Projects/ui/ProjectModal/ProjectForm";

type Props = {
  open: boolean;
  toggleAction: () => void;
  mode: "create" | "edit";
  loading?: boolean;
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

export const ProjectModal = ({
  open,
  toggleAction,
  mode,
  loading,
  defaultValues,
  submitAction,
}: Props) => {
  const t = useTranslations("ProjectModal");

  return (
    <FormModal
      open={open}
      toggleAction={toggleAction}
      title={t(mode === "create" ? "createTitle" : "editTitle")}
    >
      <ProjectForm
        loading={loading}
        mode={mode}
        closeAction={toggleAction}
        defaultValues={defaultValues}
        submitAction={submitAction}
      />
    </FormModal>
  );
};
