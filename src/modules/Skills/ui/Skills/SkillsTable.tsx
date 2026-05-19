import { FC } from "react";
import { SkillsHeaderTable } from "./SkillsHeaderTable";
import styles from "./Skills.module.css";
import { SkillsBodyTable } from "./SkillsBody/SkillsBodyTable";
import { Loading } from "@/shared/ui/Loading";
import { useQuery } from "@apollo/client/react";
import { GET_SKILLS } from "../../api/queries";

export const SkillsTable: FC = () => {
  const { data, loading, error } = useQuery(GET_SKILLS);
  if (loading) return <Loading />;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <table className={styles.table}>
      <SkillsHeaderTable />
      <SkillsBodyTable skills={data?.skills || []} />
    </table>
  );
};
