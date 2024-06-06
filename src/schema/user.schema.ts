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

export const resetPasswordSchema = z
  .object({
    password: z
      .string({ required_error: "Password is required" })
      .trim()
      .min(6, {
        message: "Password must be at least 6 characters",
      }),
    confirmPassword: z
      .string({ required_error: "Password is required" })
      .trim(),
  })
  .superRefine((data, ctx) => {
    if (data.confirmPassword !== data.password) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

export const registerSchema = z.object({
  username: z.string({ required_error: "Username is required" }).trim().min(1, {
    message: "Username is required",
  }),
  name: z.string({ required_error: "Name is required" }).trim().min(1, {
    message: "Name is required",
  }),
  email: z
    .string({ required_error: "Email address is required" })
    .email({ message: "Invalid email address" }),
  password: z.string({ required_error: "Password is required" }).trim().min(6, {
    message: "Password must be at least 6 characters",
  }),
});

export type LoginType = z.infer<typeof loginSchema>;
export type ForgotPasswordType = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordType = z.infer<typeof resetPasswordSchema>;
export type RegisterType = z.infer<typeof registerSchema>;
