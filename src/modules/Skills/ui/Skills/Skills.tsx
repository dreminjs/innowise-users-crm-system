import { FC } from "react";
import { SkillsTable } from "./SkillsTable";
import { SkillsToobar } from "./SkillsToolbar/SkillsToolbar";

export const Skills: FC = () => {
  return (
    <>
      <SkillsToobar />
      <SkillsTable />
    </>
  );
};
