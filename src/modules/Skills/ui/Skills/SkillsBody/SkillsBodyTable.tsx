import { FC } from "react";
import { SkillsRowTable } from "./SkillsRowTable";
import { GetSkillsQuery } from "@/graphql/graphql";

type TSkillsBodyTableProps = { skills: GetSkillsQuery["skills"] };

export const SkillsBodyTable: FC<TSkillsBodyTableProps> = ({ skills }) => {
  return (
    <tbody>
      {skills.map((el) => (
        <SkillsRowTable
          key={el.id}
          name={el.name}
          type={el.category!.name}
          category={el.category!.name}
        />
      ))}
    </tbody>
  );
};
