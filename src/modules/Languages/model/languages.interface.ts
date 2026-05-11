import { z } from "zod";
import { languageSchema } from "./languages.schema";

export type TLanguageForm = z.infer<typeof languageSchema>;
