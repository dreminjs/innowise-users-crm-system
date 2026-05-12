import { CustomSelect } from "@/shared/ui/CustomSelect";
import { useSettingsStore } from "../model/settings.store";
import { languageOptions } from "../model/settings.data";
import { TLanguage } from "../model/settings.types";

export const Language = () => {
  const { language, setLanguage } = useSettingsStore();

  return (
    <>
      <CustomSelect
        label={"Language"}
        options={languageOptions}
        value={language}
        onChange={(value) => setLanguage(value as TLanguage)}
      />
    </>
  );
};
