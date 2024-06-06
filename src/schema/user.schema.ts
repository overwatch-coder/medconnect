import { z } from "zod";

export const loginSchema = z.object({
  username: z.string({ required_error: "Username is required" }).trim().min(1, {
    message: "Username is required",
  }),
  password: z.string({ required_error: "Password is required" }).trim().min(6, {
    message: "Password must be at least 6 characters",
  }),
});

export const forgotPasswordSchema = z.object({
  email: z
    .string({ required_error: "Email address is required" })
    .email({ message: "Invalid email address" }),
});

export type LoginType = z.infer<typeof loginSchema>;
export type ForgotPasswordType = z.infer<typeof forgotPasswordSchema>;
