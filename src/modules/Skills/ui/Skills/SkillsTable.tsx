"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { useQuery } from "@apollo/client/react";
import { GetSkillsQuery } from "@/graphql/graphql";
import { GET_SKILLS } from "../../api/queries";
import { GenericTable, Column } from "@/shared/ui/GenericTable/GenericTable";
import { useTableState } from "@/shared/helpers/useTableState";
import { SkillActions } from "@/modules/Skills/ui/Skills/SkillActions";
import styles from "./Skills.module.css";
type Skill = GetSkillsQuery["skills"][number];
type SortField = "name" | "category";
type ColumnField = SortField | "actions";
type Props = {
  search: string;
};

export const SkillsTable = ({ search }: Props) => {
  const t = useTranslations("SkillsTable");
  const { data, loading, error } = useQuery<GetSkillsQuery>(GET_SKILLS);
  const { sortField, sortOrder, handleSort } = useTableState<SortField>({
    defaultField: "name",
  });

  const processedSkills = useMemo(() => {
    const normalizedSearch = search.toLowerCase();
    const filteredSkills = (data?.skills ?? []).filter((skill) => {
      return (
        skill.name.toLowerCase().includes(normalizedSearch) ||
        skill.category?.name?.toLowerCase().includes(normalizedSearch)
      );
    });
    filteredSkills.sort((a, b) => {
      if (sortField === "name") {
        return sortOrder === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }
      const aCategory = a.category?.name ?? "";
      const bCategory = b.category?.name ?? "";
      return sortOrder === "asc"
        ? aCategory.localeCompare(bCategory)
        : bCategory.localeCompare(aCategory);
    });

    return filteredSkills;
  }, [data, search, sortField, sortOrder]);

  const columns = useMemo<Column<Skill, ColumnField, SortField>[]>(() => {
    return [
      {
        key: "name",
        title: t("name"),
        sortable: true,
        sortKey: "name",
        className: styles.nameColumn,
        render: (skill: Skill) => (
          <div className={styles.cellContent}>{skill.name}</div>
        ),
      },
      {
        key: "category",
        title: t("category"),
        sortable: true,
        sortKey: "category",
        className: styles.categoryColumn,
        render: (skill: Skill) => (
          <div className={styles.cellContent}>
            {skill.category?.name ?? "-"}
          </div>
        ),
      },

      {
        key: "actions",
        title: "",
        sortable: false,
        className: styles.actionsColumn,
        render: (skill: Skill) => (
          <SkillActions
            skillId={skill.id}
            skillName={skill.name}
            categoryId={skill.category?.id}
          />
        ),
      },
    ];
  }, [t]);

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <GenericTable<Skill, ColumnField, SortField>
      data={processedSkills}
      columns={columns}
      rowKey={(skill) => skill.id}
      loading={loading}
      sortField={sortField}
      sortOrder={sortOrder}
      onSort={handleSort}
    />
  );
};
