"use client";

import { SearchToolbar } from "@/shared/ui/SearchToolbar/SearchToolbar";
import { useTranslations } from "next-intl";

type Props = {
  value: string;
  changeAction: (value: string) => void;
  createAction: () => void;
};

export const ProjectsSearch = ({
  value,
  changeAction,
  createAction,
}: Props) => {
  const t = useTranslations("AddCvProject");
  return (
    <SearchToolbar
      value={value}
      changeAction={changeAction}
      buttonLabel={t("title")}
      createAction={createAction}
    />
  );
};
