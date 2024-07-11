import { fetchData, mutateData } from "@/actions/api-request.action";
import {
  getUserFromCookies,
  removeUserFromCookies,
  saveUserToCookies,
} from "@/actions/user-cookie.action";
import { handleApiError, hasField, validateSchema } from "@/lib/validations";
import {
  forgotPasswordSchema,
  loginSchema,
  resetPasswordSchema,
  userSchema,
} from "@/schema/user.schema";
import { AdminData, AuthData, StaffData } from "@/types/backend";
import {
  CreateUserType,
  ForgotPasswordType,
  LoginType,
  ResetPasswordType,
} from "@/types/index";

// get current user
export const currentUser = async () => {
  const user = await getUserFromCookies();

  if (!user) {
    return null;
  }

  return user;
};

// login form submit
export const loginFormSubmit = async (data: LoginType) => {
  try {
    const parsedData = validateSchema(loginSchema, data);

    if (!parsedData.status) {
      return {
        ...parsedData,
      };
    }

    const resData = await mutateData("/auth/login", parsedData.data);

    if (!resData.status) {
      console.log({ resData });
      return resData;
    }

    console.log({ resData });

    const isAdmin = hasField(resData.data, "admin");
    const adminData = isAdmin ? (resData.data?.admin as AdminData) : null;
    const staffData = isAdmin ? (resData.data?.staff as StaffData) : null;
    const authData = resData.data?.auth as AuthData;

    console.log({ authData, adminData, staffData });

    const cookieData = {
      token: authData.token,
      email: authData.email,
      role: isAdmin ? "Admin" : ("Staff" as "Admin" | "Staff"),
      authId: authData.id,
      name: isAdmin ? adminData?.name : staffData?.fullName,
      contact: isAdmin ? adminData?.contact : staffData?.contact,
      adminId: isAdmin ? (adminData?._id as string) : null,
      staffId: isAdmin ? null : (staffData?._id as string),
      chpsCompoundId: isAdmin ? null : (staffData?.chpsCompoundId as string),
    };

    await saveUserToCookies(cookieData);

    return {
      ...resData,
      data: cookieData,
    };
  } catch (error: any) {
    console.log({ error });
    return handleApiError(error);
  }
};

// create user form submit
export const createUserFormSubmit = async (data: CreateUserType) => {
  try {
    const parsedData = validateSchema(userSchema.omit({ _id: true }), data);

    if (!parsedData.status) {
      return {
        ...parsedData,
      };
    }

    const services = parsedData.data!.availableServices;

    const resData = await mutateData("/users", {
      ...parsedData.data,
      availableServices: services ? services.split(",") : [],
    });

    if (!resData.status) {
      return resData;
    }

    return resData;
  } catch (error: any) {
    return handleApiError(error);
  }
};

// forgot password form submit
export const forgotPasswordFormSubmit = async (data: ForgotPasswordType) => {
  try {
    const parsedData = validateSchema(forgotPasswordSchema, data);

    if (!parsedData.status) {
      return {
        ...parsedData,
      };
    }

    const resData = await mutateData("/auth/forgot-password", parsedData.data);

    if (!resData.status) {
      return resData;
    }

    return resData;
  } catch (error: any) {
    return handleApiError(error);
  }
};

// reset password form submit
export const resetPasswordFormSubmit = async (data: ResetPasswordType) => {
  try {
    const parsedData = validateSchema(resetPasswordSchema, data);

    if (!parsedData.status) {
      return {
        ...parsedData,
      };
    }

    const { confirmPassword, ...dataToSubmit } = parsedData.data;
    const resData = await mutateData("/auth/reset-password", dataToSubmit);

    if (!resData.status) {
      return resData;
    }

    return resData;
  } catch (error: any) {
    return handleApiError(error);
  }
};

// logout user
export const logout = async () => {
  const user = await getUserFromCookies();
  try {
    const resData = await mutateData(
      "/auth/logout",
      {},
      {
        token: user?.token,
      }
    );

    if (!resData.status) {
      return resData;
    }

    await removeUserFromCookies();
    return resData;
  } catch (error: any) {
    return handleApiError(error);
  }
};
