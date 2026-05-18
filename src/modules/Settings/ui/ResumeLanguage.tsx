import { FC } from "react";
import { CustomSelect } from "@/shared/ui/CustomSelect";
import { useSettingsStore } from "../model/settings.store";
import { languageOptions } from "../model/settings.data";
import { TLanguageLocale } from "../model/settings.types";

interface IResumeLanguageProps {
  label: string;
}

export const ResumeLanguage: FC<IResumeLanguageProps> = ({ label }) => {
  const { resumeLanguage, setResumeLanguage } = useSettingsStore();
  return (
    <CustomSelect
      label={label}
      options={languageOptions}
      value={resumeLanguage}
      onChange={(value) => setResumeLanguage(value as TLanguageLocale)}
    />
  );
};
