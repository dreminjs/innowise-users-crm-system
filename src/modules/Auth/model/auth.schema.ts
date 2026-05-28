import z from "zod";

export const authSchema = z.object({
  email: z.string().email().min(1, "email is required"),
  password: z.string().min(1, "password is required"),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export const resetPasswordSchema = z.object({
  newPassword: z.string().min(1, "new password is required"),
});
