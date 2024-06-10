"use server";

import { getErrors } from "@/lib/parse-error";
import { axiosInstance } from "@/lib/utils";
import {
  ForgotPasswordType,
  LoginType,
  ResetPasswordType,
  forgotPasswordSchema,
  loginSchema,
  resetPasswordSchema,
  userSchema,
  CreateUserType,
} from "@/schema/user.schema";
import { ResponseData } from "@/types/index";

// login
export const loginFormSubmit = async (data: LoginType) => {
  try {
    // validate data and check for errors
    const validatedData = loginSchema.safeParse(data);

    if (!validatedData.success) {
      return getErrors({}, true, validatedData.error);
    }

    // submit data
    const res = await axiosInstance.post("/auth/login", validatedData.data);

    const resData: ResponseData = res.data;

    // return the data response
    return {
      success: resData.success,
      message: resData.message,
      data: resData.success ? resData.data : null,
      errors: !resData.success ? [resData.message] : [],
    };
  } catch (error: any) {
    console.log("login submit error => ", { error });

    return getErrors(error, false);
  }
};

// create a new user
export const createUserFormSubmit = async (data: CreateUserType) => {
  try {
    // validate data and check for errors
    const validatedData = userSchema.omit({ _id: true }).safeParse(data);

    if (!validatedData.success) {
      return getErrors({}, true, validatedData.error);
    }

    const services = validatedData.data.availableServices;

    // submit data
    const res = await axiosInstance.post("/users", {
      ...validatedData.data,
      availableServices: services ? services.split(",") : [],
    });

    const resData: ResponseData = res.data;

    // return the data response
    return {
      success: resData.success,
      message: resData.message,
      data: resData.success ? resData.data : null,
      errors: !resData.success ? [resData.message] : [],
    };
  } catch (error: any) {
    console.log("create user submit error => ", { error });

    return getErrors(error, false);
  }
};

// forgot-passowrd
export const forgotPasswordFormSubmit = async (data: ForgotPasswordType) => {
  try {
    // validate data and check for errors
    const validatedData = forgotPasswordSchema.safeParse(data);

    if (!validatedData.success) {
      return getErrors({}, true, validatedData.error);
    }

    // submit data to backend
    const res = await axiosInstance.post(
      "/auth/forgot-password",
      validatedData.data
    );

    const resData: ResponseData = res.data;

    // return the data response
    return {
      success: resData.success,
      message: resData.message,
      data: resData.success ? resData.data : null,
      errors: !resData.success ? [resData.message] : [],
    };
  } catch (error: any) {
    console.log("forgot password submit error => ", { error });

    return getErrors(error, false);
  }
};

// reset-passowrd
export const resetPasswordFormSubmit = async (data: ResetPasswordType) => {
  try {
    // validate data and check for errors
    const validatedData = resetPasswordSchema.safeParse(data);

    if (!validatedData.success) {
      return getErrors({}, true, validatedData.error);
    }

    // submit data to backend
    const { confirmPassword, ...dataToSubmit } = validatedData.data;
    const res = await axiosInstance.post("/auth/reset-password", dataToSubmit);

    const resData: ResponseData = res.data;

    // return the data response
    return {
      success: resData.success,
      message: resData.message,
      data: resData.success ? resData.data : null,
      errors: !resData.success ? [resData.message] : [],
    };
  } catch (error: any) {
    console.log("reset password submit error => ", { error });

    return getErrors(error, false);
  }
};
