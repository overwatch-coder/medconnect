"use server";

import {
  ForgotPasswordType,
  LoginType,
  forgotPasswordSchema,
  loginSchema,
} from "@/schema/user.schema";

// login
export const loginFormSubmit = async (data: LoginType) => {
  const validatedData = loginSchema.safeParse(data);

  if (!validatedData.success) {
    return {
      error: {
        message: validatedData.error.errors.map((err) => err.message),
      },
      success: false,
      data: null,
      stack: null,
      message: "validation error",
    };
  }

  return {
    success: true,
    data: validatedData.data,
    stack: null,
    message: "Login successful",
  };
};

// forgot-passowrd
export const forgotPasswordFormSubmit = async (data: ForgotPasswordType) => {
  const validatedData = forgotPasswordSchema.safeParse(data);

  if (!validatedData.success) {
    return {
      error: {
        message: validatedData.error.errors.map((err) => err.message),
      },
      success: false,
      data: null,
      stack: null,
      message: "validation error",
    };
  }

  return {
    success: true,
    data: validatedData.data,
    stack: null,
    message: "Login successful",
  };
};
