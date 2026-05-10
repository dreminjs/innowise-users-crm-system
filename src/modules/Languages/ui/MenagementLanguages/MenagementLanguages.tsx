"use client";
import { useState } from "react";
import { AddNewButton } from "@/shared/ui/AddNewButton";
import { RemoveItemButton } from "@/shared/ui/RemoveItemButton";
import { useLanguageStore } from "../../model/language.store";
import { RemoveLanguagesButton } from "./RemoveSkillsButton";
import { AddLanguageModal } from "./AddLanguageModal/AddLanguageModal";
import styles from "../Languages.module.css";

export const MenagementLanguages = () => {
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const { toggleDeleteMode, isDeleteMode } = useLanguageStore();
  return (
    <>
      <div className={styles.menagementLanguages}>
        {isDeleteMode ? (
          <>
            <button
              className={styles.cancelDeleteButton}
              onClick={() => toggleDeleteMode()}
            >
              CANCEL
            </button>
            <RemoveLanguagesButton />
          </>
        ) : (
          <>
            <AddNewButton
              onClick={() => setIsLanguageModalOpen(true)}
              label={"ADD LANGUAGE"}
            />
            <RemoveItemButton
              onClick={() => toggleDeleteMode()}
              label={"REMOVE LANGUAGE"}
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
