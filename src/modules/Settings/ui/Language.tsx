"use client";

import { FC, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { CustomSelect } from "@/shared/ui/CustomSelect";
import { useSettingsStore } from "../model/settings.store";
import { languageOptions } from "../model/settings.data";
import { TLanguageLocale } from "../model/settings.types";
interface ILanguageProps {
  label: string;
  testId?: string;
}
export const Language: FC<ILanguageProps> = ({ label, testId }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const { language, setLanguage } = useSettingsStore();
  const handleLanguageChange = (value: TLanguageLocale) => {
    document.cookie = `NEXT_LOCALE=${value}; path=/; max-age=31536000`;
    setLanguage(value);
    startTransition(() => {
      router.replace(pathname);
      router.refresh();
    });
  };
  return (
    <CustomSelect
      label={label}
      options={languageOptions}
      value={language}
      disabled={isPending}
      testId={testId}
      onChange={(value) => handleLanguageChange(value as TLanguageLocale)}
    />
  );
};
