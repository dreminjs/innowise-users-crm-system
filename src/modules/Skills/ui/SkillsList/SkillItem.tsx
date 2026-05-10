import { FC, useState } from "react";
import { TMastery } from "../../model/skill.interface";
import {
  masteryBgColor,
  masteryColorPalette,
  masteryValue,
} from "../../model/skill.constants";
import { Progress } from "@chakra-ui/react";
import styles from "../Skills.module.css";
import { useSkillStore } from "../../model/skill.store";
import clsx from "clsx";
import { EditSkillModal } from "../EditSkillModal/EditSkillModal";
import { Mastery } from "@/generated/graphql";

interface ISkillItemProps {
  name: string;
  mastery: TMastery;
  categoryId: string | null;
}

export const SkillItem: FC<ISkillItemProps> = ({
  name,
  mastery,
  categoryId,
}) => {
  const { isDeleteMode, addDeleteSkill, deleteSkills } = useSkillStore();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  return (
    <>
      <li>
        <button
          onClick={() =>
            isDeleteMode ? addDeleteSkill(name) : setIsEditModalOpen(true)
          }
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
              style={{ backgroundColor: masteryBgColor[mastery] }}
              height="4px"
            >
              <Progress.Range
                height="4px"
                style={{ backgroundColor: masteryColorPalette[mastery] }}
              />
            </Progress.Track>
          </Progress.Root>
          <span className={styles.skillName}>{name}</span>
        </button>
      </li>
      <EditSkillModal
        open={isEditModalOpen}
        onToggle={() => setIsEditModalOpen(false)}
        categoryId={categoryId}
        mastery={mastery as Mastery}
      />
    </>
  );
};
