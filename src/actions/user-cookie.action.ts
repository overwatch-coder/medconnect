"use server";

import { MedConnect } from "@/types/backend";
import { cookies } from "next/headers";

// save user data to cookies
export const saveUserToCookies = async (
  userData: MedConnect
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
export const getUserFromCookies = async (): Promise<MedConnect | null> => {
  const cookieStore = cookies();
  const user = cookieStore.get("user");
  return user?.value ? JSON.parse(user.value) : null;
};
