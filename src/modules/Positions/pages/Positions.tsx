"use client";

import { FC, useState } from "react";
import { useTranslations } from "next-intl";
import { useCreatePosition } from "@/modules/Positions/model/hooks/useCreatePosition";
import { PositionsToolbar } from "@/modules/Positions/ui/PositionsToolbar/PositionsToolbar";
import { PositionsTable } from "@/modules/Positions/ui/PositionsTable/PositionsTable";
import { PositionModal } from "@/modules/Positions/ui/PositionModal/PositionModal";

export const Positions: FC = () => {
  const t = useTranslations("PositionModal");
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { createPosition, loading } = useCreatePosition();

  return (
    <>
      <PositionsToolbar
        value={search}
        changeAction={setSearch}
        createAction={() => setIsModalOpen(true)}
      />
      <PositionsTable search={search} />
      <PositionModal
        open={isModalOpen}
        toggleAction={() => setIsModalOpen(false)}
        title={t("createTitle")}
        confirmLabel={t("create")}
        loading={loading}
        submitAction={async (values) => {
          await createPosition({
            variables: {
              position: values,
            },
          });
          setIsModalOpen(false);
        }}
      />
    </>
  );
};
