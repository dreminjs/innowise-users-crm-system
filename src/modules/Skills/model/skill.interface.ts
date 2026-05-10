import { z } from "zod";
import { skillSchema } from "./skill.schema";
import { masteryColorPalette } from "./skill.constants";

export type TSkillForm = z.infer<typeof skillSchema>;
export type TMastery = keyof typeof masteryColorPalette;
