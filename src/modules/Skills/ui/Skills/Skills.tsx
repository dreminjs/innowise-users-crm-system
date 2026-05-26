"use client";

import { FC, useState } from "react";
import { SkillsTable } from "./SkillsTable";
import { SkillsToolbar } from "./SkillsToolbar/SkillsToolbar";
import { useCreateSkill } from "@/modules/Skills/model/hooks/useCreateSkill";
import { SkillModal } from "@/modules/Skills/ui/SkillModal/SkillModal";
import { useTranslations } from "next-intl";

export const Skills: FC = () => {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { createSkill, loading } = useCreateSkill();
  const t = useTranslations("Skills");
  return (
    <>
      <SkillsToolbar
        value={search}
        changeAction={setSearch}
        createAction={() => setIsModalOpen(true)}
      />

      <SkillsTable search={search} />
      <SkillModal
        open={isModalOpen}
        toggleAction={() => setIsModalOpen(false)}
        title={t("addSkill")}
        loading={loading}
        submitAction={async (values) => {
          await createSkill({
            variables: {
              skill: values,
            },
          });
        }}
      />
    </>
  );
};
