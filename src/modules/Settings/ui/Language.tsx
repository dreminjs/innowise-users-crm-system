import { CustomSelect } from "@/shared/ui/CustomSelect";
import { useSettingsStore } from "../model/settings.store";
import { languageOptions, languages } from "../model/settings.data";
import { TLanguage } from "../model/settings.types";

export const Language = () => {
  const { language, setLanguage } = useSettingsStore();

  const handleLanguageChange = (value: TLanguage) => {
    const lang = languages.find((l) => l.value === value);
    if (!lang) return;

    document.cookie = `NEXT_LOCALE=${lang.locale}; path=/; max-age=31536000`;
    setLanguage(lang.value);

    window.location.reload();
  };

  return (
    <>
      <CustomSelect
        label={"Language"}
        options={languageOptions}
        value={language}
        onChange={(value) => handleLanguageChange(value as TLanguage)}
      />
    </>
  );
};
