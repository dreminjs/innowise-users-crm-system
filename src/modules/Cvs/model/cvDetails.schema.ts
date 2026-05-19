import { z } from "zod";
import { useTranslations } from "next-intl";

type Translator = ReturnType<typeof useTranslations>;

export const createCvDetailsSchema = (t: Translator) =>
  z.object({
    name: z
      .string()
      .min(1, t("validation.nameRequired"))
      .max(100, t("validation.nameMax")),

    education: z.string().max(200, t("validation.educationMax")),

    description: z
      .string()
      .min(1, t("validation.descriptionRequired"))
      .max(1000, t("validation.descriptionMax")),
  });

export type TCvDetailsFormData = z.infer<
  ReturnType<typeof createCvDetailsSchema>
>;
