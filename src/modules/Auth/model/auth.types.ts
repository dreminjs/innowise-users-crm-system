import z from "zod";
import { authSchema, forgotPasswordSchema } from "./auth.schema";

export type TAuthFormData = z.infer<typeof authSchema>;

export type TForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
