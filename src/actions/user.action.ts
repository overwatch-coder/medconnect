"use server";

import { axiosInstance as axios } from "@/lib/utils";
import { getErrors } from "@/lib/validate-data";
import {
  ForgotPasswordType,
  LoginType,
  ResetPasswordType,
  forgotPasswordSchema,
  loginSchema,
  resetPasswordSchema,
  registerSchema,
  RegisterType,
} from "@/schema/user.schema";

// login
export const loginFormSubmit = async (data: LoginType) => {
  const validatedData = loginSchema.safeParse(data);

  if (!validatedData.success) {
    return getErrors(validatedData.error);
  }

  return {
    success: true,
    data: validatedData.data,
    message: "Login successful",
    errors: null,
  };
};

// register
export const registerFormSubmit = async (data: RegisterType) => {
  const validatedData = registerSchema.safeParse(data);

  if (!validatedData.success) {
    return getErrors(validatedData.error);
  }

  return {
    success: true,
    data: validatedData.data,
    message: "Registeration successful",
    errors: null,
  };
};

// forgot-passowrd
export const forgotPasswordFormSubmit = async (data: ForgotPasswordType) => {
  const validatedData = forgotPasswordSchema.safeParse(data);

  if (!validatedData.success) {
    return getErrors(validatedData.error);
  }

  return {
    success: true,
    data: validatedData.data,
    message:
      "A password reset link has been sent to the email provided if correct",
    errors: null,
  };
};

// reset-passowrd
export const resetPasswordFormSubmit = async (data: ResetPasswordType) => {
  const validatedData = resetPasswordSchema.safeParse(data);

  if (!validatedData.success) {
    return getErrors(validatedData.error);
  }

  return {
    success: true,
    data: validatedData.data,
    message: "Password Changed successfully",
    errors: null,
  };
};
