"use client";

import { FC, useState } from "react";
import { useTranslations } from "next-intl";
import { useCreateDepartment } from "@/modules/Departments/model/hooks/useCreateDepartment";
import { DepartmentsToolbar } from "@/modules/Departments/ui/DepartmentsToolbar/DepartmentsToolbar";
import { DepartmentsTable } from "@/modules/Departments/ui/DepartmentsTable/DepartmentsTable";
import { DepartmentModal } from "@/modules/Departments/ui/DepartmentModal/DepartmentModal";

export const Departments: FC = () => {
  const t = useTranslations("DepartmentModal");
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { createDepartment, loading } = useCreateDepartment();
  return (
    <>
      <DepartmentsToolbar
        value={search}
        changeAction={setSearch}
        createAction={() => setIsModalOpen(true)}
      />

      <DepartmentsTable search={search} />
      <DepartmentModal
        open={isModalOpen}
        toggleAction={() => setIsModalOpen(false)}
        title={t("createTitle")}
        confirmLabel={t("create")}
        loading={loading}
        submitAction={async (values) => {
          await createDepartment({
            variables: {
              department: values,
            },
          });
          setIsModalOpen(false);
        }}
      />
    </>
  );
};
