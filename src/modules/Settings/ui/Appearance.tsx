"use client";
import { CustomSelect } from "@/shared/ui/CustomSelect";
import { useTheme } from "next-themes";
import { FC, useEffect, useState } from "react";

const options = [
  {
    label: "Device settings",
    value: "Device settings",
  },
  {
    label: "Dark",
    value: "dark",
  },
  {
    label: "Light",
    value: "light",
  },
];

interface IAppearanceProps {
  label: string;
}

export const Appearance: FC<IAppearanceProps> = ({ label }) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);
  return (
    <CustomSelect
      label={label}
      options={options}
      value={mounted ? (theme ?? "light") : "light"}
      onChange={(value) => setTheme(value)}
    />
  );
};
