"use client";

import { CustomSelect } from "@/shared/ui/CustomSelect";
import { useTheme } from "next-themes";
import { FC, useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";

interface IAppearanceProps {
  label: string;
}

export const Appearance: FC<IAppearanceProps> = ({ label }) => {
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  const t = useTranslations("Appearance");

  useEffect(() => {
    setMounted(true);
  }, []);

  const options = useMemo(
    () => [
      {
        label: t("system"),
        value: "system",
      },
      {
        label: t("dark"),
        value: "dark",
      },
      {
        label: t("light"),
        value: "light",
      },
    ],
    [t],
  );

  return (
    <CustomSelect
      label={label}
      options={options}
      value={mounted ? (theme ?? "system") : "system"}
      onChange={(value) => setTheme(value)}
    />
  );
};
