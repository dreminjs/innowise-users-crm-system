"use client";

import { SearchToolbar } from "@/shared/ui/SearchToolbar/SearchToolbar";

type Props = {
  value: string;
  onChange: (value: string) => void;
  createAction: () => void;
};

export const ProjectsSearch = ({ value, onChange, createAction }: Props) => {
  return (
    <SearchToolbar
      value={value}
      onChange={onChange}
      buttonLabel="ADD PROJECT"
      onCreate={createAction}
    />
  );
};
