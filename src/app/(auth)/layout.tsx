import { currentUser } from "@/actions/user.action";
import { redirect } from "next/navigation";
import React from "react";

const AuthLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const user = await currentUser();

  if (user !== null) {
    return redirect("/dashboard");
  }

  return <section className="overflow-x-hidden">{children}</section>;
};

export default AuthLayout;
