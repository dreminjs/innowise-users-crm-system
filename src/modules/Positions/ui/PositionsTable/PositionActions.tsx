"use client";

import { FC, useState } from "react";
import { useTranslations } from "next-intl";
import { ActionsMenu } from "@/shared/ui/ActionsMenu/ActionsMenu";
import { useDeletePosition } from "../../model/hooks/useDeletePosition";
import { useUpdatePosition } from "../../model/hooks/useUpdatePosition";
import { PositionModal } from "@/modules/Positions/ui/PositionModal/PositionModal";

type Props = {
  positionId: string;
  positionName: string;
};

export const PositionActions: FC<Props> = ({ positionId, positionName }) => {
  const t = useTranslations("PositionActions");
  const modalT = useTranslations("PositionModal");
  const [isEditOpen, setIsEditOpen] = useState(false);
  const { deletePosition } = useDeletePosition();
  const { updatePosition, loading } = useUpdatePosition();
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
              await deletePosition({
                variables: {
                  position: {
                    positionId,
                  },
                },
              });
            },
          },
        ]}
      />
      <PositionModal
        open={isEditOpen}
        toggleAction={() => setIsEditOpen(false)}
        title={modalT("editTitle")}
        confirmLabel={modalT("save")}
        loading={loading}
        defaultValues={{
          name: positionName,
        }}
        submitAction={async (values) => {
          await updatePosition({
            variables: {
              position: {
                positionId,
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
