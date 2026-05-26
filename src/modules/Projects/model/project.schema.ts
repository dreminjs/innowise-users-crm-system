import { z } from "zod";

export const createProjectSchema = (t: (key: string) => string) =>
  z.object({
    name: z.string().min(1, t("validation.nameRequired")),
    domain: z.string(),
    description: z.string(),
    environment: z.array(z.string()),
    startDate: z.string().min(1, t("validation.startDateRequired")),
    endDate: z.string(),
  });

export type TProjectFormData = z.infer<ReturnType<typeof createProjectSchema>>;
