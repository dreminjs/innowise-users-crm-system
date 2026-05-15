"use client";

import { FC, useState } from "react";
import clsx from "clsx";
import { Progress } from "@chakra-ui/react";
import { Mastery } from "@/generated/graphql";
import {
  masteryBgColor,
  masteryColorPalette,
  masteryValue,
} from "@/modules/Skills/model/skill.constants";
import { TMastery } from "@/modules/Skills/model/skill.interface";
import { useCvSkillStore } from "../../model/cv-skill.store";
import styles from "@/modules/Skills/ui/Skills.module.css";
import { EditCvSkillModal } from "@/modules/Cvs/ui/CvSkills/modals/EditCvSkillModal";

interface Props {
  name: string;
  mastery: TMastery;
  categoryId: string;
  cvId: string;
}

export const CvSkillItem: FC<Props> = ({ name, mastery, categoryId, cvId }) => {
  const { isDeleteMode, toggleSkill, deleteSkills } = useCvSkillStore();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleClick = () => {
    if (isDeleteMode) {
      toggleSkill(name);

      return;
    }

    setIsEditModalOpen(true);
  };

  return (
    <>
      <li>
        <button
          onClick={handleClick}
          className={clsx(
            styles.skillItem,
            deleteSkills[name] && styles.skillItemDeleteActive,
          )}
        >
          <Progress.Root
            value={masteryValue[mastery]}
            variant="outline"
            width="78px"
          >
            <Progress.Track
              style={{
                backgroundColor: masteryBgColor[mastery],
              }}
              height="4px"
            >
              <Progress.Range
                height="4px"
                style={{
                  backgroundColor: masteryColorPalette[mastery],
                }}
              />
            </Progress.Track>
          </Progress.Root>

          <span className={styles.skillName}>{name}</span>
        </button>
      </li>

      <EditCvSkillModal
        cvId={cvId}
        open={isEditModalOpen}
        toggleAction={() => setIsEditModalOpen(false)}
        categoryId={categoryId}
        mastery={mastery as Mastery}
      />
    </>
  );
};
