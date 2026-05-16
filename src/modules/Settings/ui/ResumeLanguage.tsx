import { CustomSelect } from "@/shared/ui/CustomSelect";
import { useSettingsStore } from "../model/settings.store";
import { languageOptions } from "../model/settings.data";
import { TLanguage } from "../model/settings.types";
import { FC } from "react";

interface IResumeLanguageProps {
  label: string;
}

export const ResumeLanguage: FC<IResumeLanguageProps> = ({ label }) => {
  const { resumeLanguage, setResumeLanguage } = useSettingsStore();
  return (
    <>
      <>
        <CustomSelect
          label={label}
          options={languageOptions}
          value={resumeLanguage || "English"}
          onChange={(value) => setResumeLanguage(value as TLanguage)}
        />
      </>
    </>
  );
};
