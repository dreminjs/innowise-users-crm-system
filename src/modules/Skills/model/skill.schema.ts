import { Mastery } from "@/generated/graphql";
import z from "zod";

export const skillSchema = z.object({
  categoryId: z.string(),
  mastery: z.nativeEnum(Mastery),
});
