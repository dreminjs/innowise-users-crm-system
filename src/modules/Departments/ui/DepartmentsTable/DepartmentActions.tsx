"use client";

import { FC, useState } from "react";
import { useTranslations } from "next-intl";
import { ActionsMenu } from "@/shared/ui/ActionsMenu/ActionsMenu";
import { useDeleteDepartment } from "../../model/hooks/useDeleteDepartment";
import { useUpdateDepartment } from "../../model/hooks/useUpdateDepartment";
import { DepartmentModal } from "@/modules/Departments/ui/DepartmentModal/DepartmentModal";

type Props = {
  departmentId: string;
  departmentName: string;
};

export const DepartmentActions: FC<Props> = ({
  departmentId,
  departmentName,
}) => {
  const t = useTranslations("DepartmentActions");
  const modalT = useTranslations("DepartmentModal");
  const [isEditOpen, setIsEditOpen] = useState(false);
  const { deleteDepartment } = useDeleteDepartment();
  const { updateDepartment, loading } = useUpdateDepartment();
  return (
    <>
      <ActionsMenu
        items={[
          {
            type: "button",
            label: t("edit"),
            onClick: () => setIsEditOpen(true),
          },
          {
            type: "button",
            label: t("delete"),
            variant: "danger",
            onClick: async () => {
              await deleteDepartment({
                variables: {
                  department: {
                    departmentId,
                  },
                },
              });
            },
          },
        ]}
      />

      <DepartmentModal
        open={isEditOpen}
        toggleAction={() => setIsEditOpen(false)}
        title={modalT("editTitle")}
        confirmLabel={modalT("save")}
        loading={loading}
        defaultValues={{
          name: departmentName,
        }}
        submitAction={async (values) => {
          await updateDepartment({
            variables: {
              department: {
                departmentId,
                ...values,
              },
            },
          });
          setIsEditOpen(false);
        }}
      />
    </>
  );
};
