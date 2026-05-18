import { FC } from "react";

import { CustomSelect } from "@/shared/ui/CustomSelect";
import { useSettingsStore } from "../model/settings.store";
import { languageOptions } from "../model/settings.data";
import { TLanguageLocale } from "../model/settings.types";

interface ILanguageProps {
  label: string;
}

export const Language: FC<ILanguageProps> = ({ label }) => {
  const { language, setLanguage } = useSettingsStore();
  const handleLanguageChange = (value: TLanguageLocale) => {
    document.cookie = `NEXT_LOCALE=${value}; path=/; max-age=31536000`;
    setLanguage(value);
    window.location.reload();
  };
  return (
    <CustomSelect
      label={label}
      options={languageOptions}
      value={language}
      onChange={(value) => handleLanguageChange(value as TLanguageLocale)}
    />
  );
};
