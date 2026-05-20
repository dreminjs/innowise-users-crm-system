"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { useQuery } from "@apollo/client/react";
import { GetLanguagesQuery } from "@/graphql/graphql";
import { GenericTable, Column } from "@/shared/ui/GenericTable/GenericTable";
import { useTableState } from "@/shared/helpers/useTableState";
import styles from "./LanguagesTable.module.css";
import { GET_LANGUAGES } from "@/modules/Languages/api/queries";
import { LanguageActions } from "@/modules/Languages/ui/LanguagesTable/LanguageActions";
type Language = NonNullable<GetLanguagesQuery["languages"][number]>;
type SortField = "name";
type ColumnField = "name" | "native_name" | "iso2" | "actions";
type Props = {
  search: string;
};

export const LanguagesTable = ({ search }: Props) => {
  const t = useTranslations("LanguagesTable");
  const { data, loading, error } = useQuery<GetLanguagesQuery>(GET_LANGUAGES);
  const { sortField, sortOrder, handleSort } = useTableState<SortField>({
    defaultField: "name",
  });
  const processedLanguages = useMemo(() => {
    const normalized = search.toLowerCase();
    const filtered = (data?.languages ?? []).filter(
      (language): language is Language => {
        if (!language) {
          return false;
        }
        return (
          language.name.toLowerCase().includes(normalized) ||
          language.native_name?.toLowerCase().includes(normalized) ||
          language.iso2?.toLowerCase().includes(normalized)
        );
      },
    );
    filtered.sort((a, b) =>
      sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name),
    );
    return filtered;
  }, [data, search, sortOrder]);
  const columns = useMemo<Column<Language, ColumnField, SortField>[]>(() => {
    return [
      {
        key: "name",
        title: t("name"),
        sortable: true,
        sortKey: "name",
        className: styles.nameColumn,
        render: (language: Language) => (
          <div className={styles.cellContent}>{language.name}</div>
        ),
      },
      {
        key: "native_name",
        title: t("nativeName"),
        sortable: false,
        className: styles.nativeNameColumn,
        render: (language: Language) => (
          <div className={styles.cellContent}>
            {language.native_name ?? "-"}
          </div>
        ),
      },
      {
        key: "iso2",
        title: t("iso2"),
        sortable: false,
        className: styles.isoColumn,
        render: (language: Language) => (
          <div className={styles.cellContent}>{language.iso2 ?? "-"}</div>
        ),
      },
      {
        key: "actions",
        title: "",
        sortable: false,
        className: styles.actionsColumn,
        render: (language: Language) => (
          <LanguageActions
            languageId={language.id}
            languageName={language.name}
            nativeName={language.native_name ?? ""}
            iso2={language.iso2 ?? ""}
          />
        ),
      },
    ];
  }, [t]);

  if (error) {
    return <p>Error: {error.message}</p>;
  }
  return (
    <GenericTable<Language, ColumnField, SortField>
      data={processedLanguages}
      columns={columns}
      rowKey={(language) => language.id}
      loading={loading}
      sortField={sortField}
      sortOrder={sortOrder}
      onSort={handleSort}
    />
  );
};
