import { z } from "zod";

export const userSchema = z.object({
  compoundName: z.string().min(1, { message: "Compound Name cannot be empty" }),
  location: z.string().min(1, { message: "Location cannot be empty" }),
  region: z.string().min(1, { message: "Region cannot be empty" }),
  district: z.string().min(1, { message: "District cannot be empty" }),
  operatingHours: z
    .string()
    .min(1, { message: "Operating hours cannot be empty" }),
  availableServices: z.string().optional(),
  email: z
    .string()
    .min(1, { message: "Email cannot be empty" })
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(1, { message: "Password cannot be empty" })
    .min(8, { message: "Password must be at least 8 characters long" }),
  termsAndConditions: z.coerce.boolean().refine((val) => val === true, {
    message: "Terms and Conditions must be accepted",
  }),
  _id: z.string({ required_error: "Compound ID is required" }),
});

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email address is required" })
    .trim()
    .min(1, {
      message: "Email address is required",
    })
    .email({ message: "Please enter a valid email address" }),
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
