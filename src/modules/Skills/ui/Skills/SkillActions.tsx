"use client";

import { FC, useState } from "react";
import { useTranslations } from "next-intl";
import { ActionsMenu } from "@/shared/ui/ActionsMenu/ActionsMenu";
import { useDeleteSkill } from "@/modules/Skills/model/hooks/useDeleteSkill";
import { useUpdateSkill } from "@/modules/Skills/model/hooks/useUpdateSkill";
import { SkillModal } from "@/modules/Skills/ui/SkillModal/SkillModal";

type Props = {
  skillId: string;
  skillName: string;
  categoryId?: string | null;
};

export const SkillActions: FC<Props> = ({ skillId, skillName, categoryId }) => {
  const t = useTranslations("SkillActions");
  const modalT = useTranslations("SkillModal");
  const [isEditOpen, setIsEditOpen] = useState(false);
  const { deleteSkill } = useDeleteSkill();
  const { updateSkill, loading } = useUpdateSkill();
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
              await deleteSkill({
                variables: {
                  skill: {
                    skillId,
                  },
                },
              });
            },
          },
        ]}
      />

      <SkillModal
        open={isEditOpen}
        toggleAction={() => setIsEditOpen(false)}
        title={modalT("editTitle")}
        loading={loading}
        defaultValues={{
          name: skillName,
          categoryId: categoryId ?? "",
        }}
        confirmLabel={modalT("save")}
        submitAction={async (values) => {
          await updateSkill({
            variables: {
              skill: {
                skillId,
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
