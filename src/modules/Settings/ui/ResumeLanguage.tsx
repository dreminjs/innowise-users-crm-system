import { CustomSelect } from "@/shared/ui/CustomSelect";
import { useSettingsStore } from "../model/settings.store";
import { languageOptions } from "../model/settings.data";
import { TLanguage } from "../model/settings.types";

export const ResumeLanguage = () => {
  const { resumeLanguage, setResumeLanguage } = useSettingsStore();
  return (
    <>
      <>
        <CustomSelect
          label={"Resume Language (Translation)"}
          options={languageOptions}
          value={resumeLanguage || "English"}
          onChange={(value) => setResumeLanguage(value as TLanguage)}
        />
      </>
    </>
  );
};
