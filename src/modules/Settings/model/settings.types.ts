export type TLanguage = "English" | "Russian" | "German";

export type TAppearance = "Device settings" | "Dark" | "Light";

export type TLanguageOption = {
  label: string;
  value: TLanguage;
};

export type TLanguageLocalization = TLanguageOption & {
  locale: TLanguageLocale;
};

export type TLanguageLocale = "en" | "ru" | "de";
