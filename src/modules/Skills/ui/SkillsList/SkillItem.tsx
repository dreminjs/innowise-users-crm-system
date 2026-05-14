import { FC, useState } from "react";
import { TMastery } from "../../model/skill.interface";
import {
  masteryBgColor,
  masteryColorPalette,
  masteryValue,
} from "../../model/skill.constants";
import { Progress } from "@chakra-ui/react";
import { useSkillStore } from "../../model/skill.store";
import { Mastery } from "@/generated/graphql";
import { EditSkillModal } from "../EditSkillModal/EditSkillModal";
import clsx from "clsx";
import styles from "../Skills.module.css";

interface ISkillItemProps {
  name: string;
  mastery: TMastery;
  categoryId: string | null;
  isAvailableToChange: boolean;
}

export const SkillItem: FC<ISkillItemProps> = ({
  name,
  mastery,
  categoryId,
  isAvailableToChange,
}) => {
  const { isDeleteMode, toggleDeleteSkill, deleteSkills } = useSkillStore();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const handleClick = () => {
    if (isDeleteMode) {
      toggleDeleteSkill(name);
    } else {
      setIsEditModalOpen(true);
    }
  };
  return (
    <>
      <li>
        <button
          {...(isAvailableToChange ? { onClick: handleClick } : {})}
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
