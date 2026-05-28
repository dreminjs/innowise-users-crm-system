import { FC } from "react";
import { TMastery } from "../../../model/skill.interface";
import {
  masteryBgColor,
  masteryColorPalette,
  masteryValue,
} from "../../../model/skill.constants";
import { Progress } from "@chakra-ui/react";
import clsx from "clsx";
import styles from "../Skills.module.css";

interface ISkillItemProps {
  name: string;
  mastery: TMastery;
  isActive: boolean;
  onClick?: () => void;
}

export const SkillItem: FC<ISkillItemProps> = ({
  name,
  mastery,
  isActive,
  onClick,
}) => {
  return (
    <>
      <li>
        <button
          {...(onClick && { onClick: onClick })}
          className={clsx(
            styles.skillItem,
            isActive && styles.skillItemDeleteActive,
          )}
          data-testid="skill-item"
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
    </>
  );
};
