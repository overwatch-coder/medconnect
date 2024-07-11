"use server";

import { cookies } from "next/headers";

export type UserDataSaved = {
  token: string;
  authId: string;
  role: "Admin" | "Staff";
  email: string;
  name: string | undefined;
  contact: string | undefined;
  adminId: string | null;
  staffId: string | null;
  chpsCompoundId: string | null;
};

// save user data to cookies
export const saveUserToCookies = async (
  userData: UserDataSaved
): Promise<void> => {
  const cookieStore = cookies();
  cookieStore.set("user", JSON.stringify(userData), {
    httpOnly: true,
    sameSite: "strict",
    path: "/",
    expires: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
  });
};

// remove user data from cookies
export const removeUserFromCookies = async (): Promise<void> => {
  const cookieStore = cookies();
  cookieStore.delete("user");
};

// get user data from cookies
export const getUserFromCookies = async (): Promise<UserDataSaved | null> => {
  const cookieStore = cookies();
  const user = cookieStore.get("user");
  return user?.value ? JSON.parse(user.value) : null;
};
