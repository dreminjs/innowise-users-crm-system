import en from "../../../messages/en.json";
import ru from "../../../messages/ru.json";
import de from "../../../messages/de.json";
import { TLanguageLocale } from "@/modules/Settings/model/settings.types";

export type AppMessages = typeof en;

const messages: Record<TLanguageLocale, AppMessages> = {
  en,
  ru,
  de,
};

export const getMessages = (locale: TLanguageLocale): AppMessages => {
  return messages[locale];
};
