import { getUserFromCookies } from "@/actions/user.action";
import { redirect } from "next/navigation";
import React from "react";

const AuthLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const user = await getUserFromCookies();

  if (user?.userId && user?.token) {
    return redirect("/dashboard");
  }

  return <section className="overflow-x-hidden">{children}</section>;
};

export default AuthLayout;
