import ForgotPasswordForm from "@/app/(auth)/forgot-password/ForgotPasswordForm";
import { Metadata } from "next";
import Image from "next/image";
import React from "react";

export const metadata: Metadata = {
  title: "Forgot Password | MedConnect",
  description:
    "Forgot Your MedConnect Password? No worries, just enter your email and we'll send you a link to reset your password.",
};

const ForgotPassword = () => {
  return (
    <main className="bg-secondary-gray/20 flex flex-col items-center justify-center min-h-screen">
      <div className="md:grid-cols-2 grid grid-cols-1">
        {/* Forgot Password Image */}
        <section className="flex flex-col items-center justify-center">
          <div className="w-full">
            <Image
              src="/assets/images/forgot-password-image.svg"
              alt="login"
              width={500}
              height={500}
              quality={100}
              loading="lazy"
              className="2xl:w-full object-cover"
            />
          </div>
        </section>

        {/* Forgot Password Form */}
        <section className="md:justify-start flex items-center justify-center">
          <ForgotPasswordForm />
        </section>
      </div>
    </main>
  );
};

export default ForgotPassword;
