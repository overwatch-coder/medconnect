import React from "react";
import { Metadata } from "next";
import ResetPasswordForm from "@/app/(auth)/reset-password/ResetPasswordForm";

export const metadata: Metadata = {
  title: "Reset Password | MedConnect",
  description: "Reset Your MedConnect Password",
};

const ResetPassword = () => {
  return (
    <main className="bg-secondary-gray/20 flex flex-col items-center justify-center min-h-screen">
      {/* Reset Password Form */}
      <section className="rounded-xl md:max-w-xl flex items-center justify-center p-10 bg-white">
        <ResetPasswordForm />
      </section>
    </main>
  );
};

export default ResetPassword;
