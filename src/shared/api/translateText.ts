import { TLanguageLocale } from "@/modules/Settings/model/settings.types";

export const translateText = async (text: string, target: TLanguageLocale) => {
  try {
    const response = await fetch("/api/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        target,
      }),
    });
    if (!response.ok) {
      return text;
    }
    const data = await response.json();
    return data.translatedText ?? text;
  } catch {
    return text;
  }
};
