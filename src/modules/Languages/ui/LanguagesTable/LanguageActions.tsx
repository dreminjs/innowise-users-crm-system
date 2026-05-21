"use client";

import { FC, useState } from "react";
import { useTranslations } from "next-intl";
import { ActionsMenu } from "@/shared/ui/ActionsMenu/ActionsMenu";
import { LanguageModal } from "@/modules/Languages/ui/LanguageModal/LanguageModal";
import { useUpdateLanguage } from "@/modules/Languages/model/hooks/useUpdateLanguage";
import { useDeleteLanguage } from "@/modules/Languages/model/hooks/useDeleteLanguage";

type Props = {
  languageId: string;
  languageName: string;
  nativeName: string;
  iso2: string;
};

export const LanguageActions: FC<Props> = ({
  languageId,
  languageName,
  nativeName,
  iso2,
}) => {
  const t = useTranslations("LanguageActions");
  const modalT = useTranslations("LanguageModal");
  const [isEditOpen, setIsEditOpen] = useState(false);
  const { deleteLanguage } = useDeleteLanguage();
  const { updateLanguage, loading } = useUpdateLanguage();
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
              await deleteLanguage({
                variables: {
                  language: {
                    languageId,
                  },
                },
              });
            },
          },
        ]}
      />

      <LanguageModal
        open={isEditOpen}
        toggleAction={() => setIsEditOpen(false)}
        title={modalT("editTitle")}
        confirmLabel={modalT("save")}
        loading={loading}
        defaultValues={{
          name: languageName,
          nativeName,
          iso2,
        }}
        submitAction={async (values) => {
          await updateLanguage({
            variables: {
              language: {
                languageId,
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
