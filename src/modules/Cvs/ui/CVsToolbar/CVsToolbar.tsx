"use client";

import { SearchToolbar } from "@/shared/ui/SearchToolbar/SearchToolbar";

type Props = {
  value: string;
  changeAction: (value: string) => void;
  createAction: () => void;
};

export const CVsToolbar = ({ value, changeAction, createAction }: Props) => {
  return (
    <SearchToolbar
      value={value}
      onChange={changeAction}
      buttonLabel="ADD CV"
      onCreate={createAction}
    />
  );
};
