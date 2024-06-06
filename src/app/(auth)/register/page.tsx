import RegisterForm from "@/app/(auth)/register/RegisterForm";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import React from "react";

export const metadata: Metadata = {
  title: "Create A New Account | MedConnect",
  description:
    "Create an account to access MedConnect - Healthcare for Rural Communities",
};

const Register = () => {
  return (
    <main className="bg-primary-green min-h-screen">
      <div className="md:grid-cols-2 grid grid-cols-1 relative">
        {/* Register Text Description */}
        <section className="flex flex-col items-center justify-center">
          <div className="flex flex-col gap-10 p-10">
            <h1 className="flex items-center gap-3">
              <Image
                src="/assets/icons/logo-black.svg"
                alt="logo"
                width={80}
                height={80}
              />
              <p className="xl:text-4xl text-4xl font-bold text-white">
                Med
                <span className="text-secondary-gray">Connect</span>
              </p>
            </h1>

            <div className="flex flex-col gap-4">
              <h3 className="flex items-center gap-5">
                <span className="text-3xl text-white">Optimizing</span>
                <hr className="w-1/3 bg-white h-[1px]" />
              </h3>

              <h2 className="text-3xl font-bold text-white">
                Healthcare Through Technology
              </h2>

              <Button className="hover:border-0 md:w-fit flex items-center w-full gap-3 px-10 py-3 text-center bg-transparent border border-white">
                <span className="text-white">Know More</span>
                <ArrowRight className="text-white" size={20} />
              </Button>
            </div>

            {/* Register Image - Only on large devices */}
            <div className="md:block left-1/2 absolute bottom-0 hidden w-full max-w-md transform -translate-x-1/2">
              <Image
                src="/assets/images/login-image.svg"
                alt="login"
                width={500}
                height={500}
                quality={100}
                loading="lazy"
                className="object-contain w-[450px] h-[450px]"
              />
            </div>
          </div>
        </section>

        {/* Register Form */}
        <section className="flex items-center justify-center min-h-screen bg-white md:rounded-ss-[100px] rounded-t-[50px] md:rounded-t-none">
          <RegisterForm />
        </section>
      </div>
    </main>
  );
};

export default Register;
