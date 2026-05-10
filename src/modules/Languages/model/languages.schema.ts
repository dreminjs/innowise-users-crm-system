import { Proficiency } from "@/generated/graphql";
import z from "zod";

export const languageSchema = z.object({
  name: z.string(),
  proficiency: z.nativeEnum(Proficiency),
});
