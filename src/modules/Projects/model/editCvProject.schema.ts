import { z } from "zod";

type Translator = (key: string) => string;
export const createEditCvProjectSchema = (t: Translator) =>
  z.object({
    projectId: z.string().min(1, t("validation.projectRequired")),
    name: z.string(),
    domain: z.string(),
    description: z.string(),
    environment: z.array(z.string()),
    startDate: z.string().min(1, t("validation.startDateRequired")),
    endDate: z.string(),
    responsibilities: z
      .string()
      .min(1, t("validation.responsibilitiesRequired"))
      .max(2000, t("validation.responsibilitiesMax")),
  });
