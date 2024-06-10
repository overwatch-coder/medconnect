import { z } from "zod";

export const userSchema = z.object({
  _id: z.string(),
  compoundName: z.string().trim().min(1, {
    message: "Compound Name is required",
  }),
  password: z.string({ required_error: "Password is required" }).trim().min(8, {
    message: "Password must be at least 8 characters",
  }),
  location: z.string().trim().min(1, {
    message: "Location is required",
  }),
  region: z.string().trim().min(1, {
    message: "Region is required",
  }),
  district: z.string().trim().min(1, {
    message: "District is required",
  }),
  operatingHours: z.string().trim().min(1, {
    message: "Operating Hours is required",
  }),
  availableServices: z.array(z.string()).optional().default([]),
  email: z
    .string({ required_error: "Email address is required" })
    .email({ message: "Invalid email address" }),
  termsAndConditions: z.coerce.boolean().default(false),
});

export const loginSchema = z.object({
  compoundName: z
    .string({ required_error: "Compound Name is required" })
    .trim()
    .min(1, {
      message: "Compound Name is required",
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
    email: z
      .string({ required_error: "Email address is required" })
      .email({ message: "Invalid email address" }),
    password: z
      .string({ required_error: "Password is required" })
      .trim()
      .min(6, {
        message: "Password must be at least 6 characters",
      }),
    confirmPassword: z
      .string({ required_error: "Password is required" })
      .trim(),
    token: z.string({ required_error: "Token is required" }),
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

export type User = z.infer<typeof userSchema>;
export type CreateUser = Omit<User, "_id">;
export type LoginType = z.infer<typeof loginSchema>;
export type ForgotPasswordType = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordType = z.infer<typeof resetPasswordSchema>;
export type RegisterType = z.infer<typeof registerSchema>;
