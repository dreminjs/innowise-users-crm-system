"use client";

import { SearchToolbar } from "@/shared/ui/SearchToolbar/SearchToolbar";

type Props = {
  value: string;
  changeAction: (value: string) => void;
};

export const UsersSearch = ({ value, changeAction }: Props) => {
  return (
    <SearchToolbar
      value={value}
      changeAction={changeAction}
      placeholder="Search users..."
    />
  );
};
