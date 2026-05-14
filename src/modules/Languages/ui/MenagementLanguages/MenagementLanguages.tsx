"use client";
import { useState } from "react";
import { AddNewButton } from "@/shared/ui/AddNewButton";
import { RemoveItemButton } from "@/shared/ui/RemoveItemButton";
import { useLanguageStore } from "../../model/language.store";
import { RemoveLanguagesButton } from "./RemoveLanguagesButton";
import { AddLanguageModal } from "./AddLanguageModal/AddLanguageModal";
import styles from "../Languages.module.css";
import { useTranslations } from "next-intl";

export const MenagementLanguages = () => {
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const { toggleDeleteMode, isDeleteMode } = useLanguageStore();
  const t = useTranslations();

  return (
    <>
      <div className={styles.menagementLanguages}>
        {isDeleteMode ? (
          <>
            <button
              className={styles.cancelDeleteButton}
              onClick={() => toggleDeleteMode()}
            >
              {t("ConfirmButtons.cancel")}
            </button>
            <RemoveLanguagesButton />
          </>
        ) : (
          <>
            <AddNewButton
              onClick={() => setIsLanguageModalOpen(true)}
              label={t("Languages.add")}
            />
            <RemoveItemButton
              onClick={() => toggleDeleteMode()}
              label={t("Languages.delete")}
            />
          </>
        )}
      </div>

      <AddLanguageModal
        open={isLanguageModalOpen}
        onToggle={() => setIsLanguageModalOpen((prev) => !prev)}
      />
    </>
  );
};
