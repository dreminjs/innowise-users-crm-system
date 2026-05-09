import { z } from "zod";
import { skillSchema } from "./skill.schema";

export type TSkillForm = z.infer<typeof skillSchema>;
