"use client";

import { FC, useState } from "react";
import { useTranslations } from "next-intl";
import { useCreateLanguage } from "@/modules/Languages/model/hooks/useCreateLanguage";
import { LanguagesToolbar } from "@/modules/Languages/ui/LanguagesToolbar/LanguagesToolbar";
import { LanguagesTable } from "@/modules/Languages/ui/LanguagesTable/LanguagesTable";
import { LanguageModal } from "@/modules/Languages/ui/LanguageModal/LanguageModal";

export const Languages: FC = () => {
  const t = useTranslations("LanguageModal");
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { createLanguage, loading } = useCreateLanguage();
  return (
    <>
      <LanguagesToolbar
        value={search}
        changeAction={setSearch}
        createAction={() => setIsModalOpen(true)}
      />

      <LanguagesTable search={search} />

      <LanguageModal
        open={isModalOpen}
        toggleAction={() => setIsModalOpen(false)}
        title={t("createTitle")}
        confirmLabel={t("create")}
        loading={loading}
        submitAction={async (values) => {
          await createLanguage({
            variables: {
              language: values,
            },
          });
          setIsModalOpen(false);
        }}
      />
    </>
  );
};
