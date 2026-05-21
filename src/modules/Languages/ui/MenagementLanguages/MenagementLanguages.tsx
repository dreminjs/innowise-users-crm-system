"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AddNewButton } from "@/shared/ui/AddNewButton";
import { RemoveItemButton } from "@/shared/ui/RemoveItemButton";
import { useLanguageStore } from "../../model/language.store";
import { RemoveLanguagesButton } from "./RemoveLanguagesButton";
import { AddLanguageModal } from "./AddLanguageModal/AddLanguageModal";
import styles from "../Languages.module.css";

interface Props {
  userId: string;
}

export const MenagementLanguages = ({ userId }: Props) => {
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const { toggleDeleteMode, isDeleteMode } = useLanguageStore();
  const t = useTranslations();
  return (
    <>
      <div className={styles.managementLanguages}>
        {isDeleteMode ? (
          <>
            <button
              className={styles.cancelDeleteButton}
              onClick={() => toggleDeleteMode()}
            >
              {t("ConfirmButtons.cancel")}
            </button>
            <RemoveLanguagesButton userId={userId} />
          </>
        ) : (
          <div className={styles.menagementLanguages}>
            <AddNewButton
              onClick={() => setIsLanguageModalOpen(true)}
              label={t("Languages.add")}
            />
            <RemoveItemButton
              onClick={() => toggleDeleteMode()}
              label={t("Languages.delete")}
            />
          </div>
        )}
      </div>
      <AddLanguageModal
        userId={userId}
        open={isLanguageModalOpen}
        onToggle={() => setIsLanguageModalOpen((prev) => !prev)}
      />
    </>
  );
};
