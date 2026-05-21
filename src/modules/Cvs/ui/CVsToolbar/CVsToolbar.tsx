"use client";

import { useTranslations } from "next-intl";
import { SearchToolbar } from "@/shared/ui/SearchToolbar/SearchToolbar";

type Props = {
  value: string;
  changeAction: (value: string) => void;
  createAction: () => void;
};

export const CVsToolbar = ({ value, changeAction, createAction }: Props) => {
  const t = useTranslations("CVsToolbar");
  return (
    <SearchToolbar
      value={value}
      changeAction={changeAction}
      placeholder={t("search")}
      buttonLabel={t("addCv")}
      createAction={createAction}
    />
  );
};
