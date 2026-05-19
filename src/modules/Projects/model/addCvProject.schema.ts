import { z } from "zod";

type Translator = (key: string) => string;

export const createAddCvProjectSchema = (t: Translator) =>
  z.object({
    projectId: z.string().min(1, t("validation.projectRequired")),
    startDate: z.string().min(1, t("validation.startDateRequired")),
    endDate: z.string(),
    responsibilities: z
      .string()
      .min(1, t("validation.responsibilitiesRequired"))
      .max(2000, t("validation.responsibilitiesMax")),
  });
export type TAddCvProjectFormData = z.infer<
  ReturnType<typeof createAddCvProjectSchema>
>;
