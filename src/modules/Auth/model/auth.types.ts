import z from "zod";
import {
  authSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from "./auth.schema";

export type TAuthFormData = z.infer<typeof authSchema>;

export type TForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export type TResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
