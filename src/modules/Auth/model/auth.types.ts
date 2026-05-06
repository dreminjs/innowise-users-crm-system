import z from "zod";
import { authSchema } from "./auth.schema";

export type TAuthFormData = z.infer<typeof authSchema>;
