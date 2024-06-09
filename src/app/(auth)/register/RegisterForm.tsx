"use client";

import React, { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import Swal from "sweetalert2";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { registerSchema, RegisterType } from "@/schema/user.schema";
import { registerFormSubmit } from "@/actions/user.action";
import { Button } from "@/components/ui/button";
import { IoPerson } from "react-icons/io5";
import { Eye, EyeOff, LockIcon, Mail } from "lucide-react";
import Image from "next/image";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.has("redirect")
    ? `${searchParams.get("redirect")}`
    : "/";

  const {
    register,
    reset,
    formState: { errors, isSubmitting: pending },
    handleSubmit,
  } = useForm<RegisterType>({
    resolver: zodResolver(registerSchema),
    mode: "all",
  });

  const handleRegisterSubmission: SubmitHandler<RegisterType> = async (
    data
  ) => {
    const result = await registerFormSubmit(data);
    if (!result.success) {
      return Swal.fire({
        title: "Oops!",
        text: result.errors?.join(", "),
        icon: "error",
        timer: 4000,
        timerProgressBar: true,
      });
    }

    toast.success(result.message);
    reset();
    router.replace(redirectUrl);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full max-w-md p-10">
      {/* Register Image - Only on Small devices */}
      <div className="md:hidden pb-10">
        <Image
          src="/assets/images/login-image.svg"
          alt="register"
          width={500}
          height={500}
          quality={100}
          loading="lazy"
          className="object-cover"
        />
      </div>

      <div className="z-20 flex flex-col w-full gap-8">
        <h3 className="text-secondary-gray text-start text-3xl font-bold">
          Create A C.H.P.S. Account
        </h3>

        <form
          onSubmit={handleSubmit(handleRegisterSubmission)}
          className="flex flex-col w-full gap-6"
          method="POST"
        >
          <div className="flex flex-col w-full">
            <label htmlFor="name" className="flex items-center gap-2">
              <IoPerson size={15} className="text-secondary-gray" />
              <span className="text-secondary-gray">Compound Name</span>
            </label>
            <input
              type="text"
              className="text-secondary-gray ring-0 border-b-secondary-gray w-full px-2 py-1 border-b-2 outline-none"
              {...register("name")}
            />
            {errors?.name?.message && (
              <p className="py-2 text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="username" className="flex items-center gap-2">
              <IoPerson size={15} className="text-secondary-gray" />
              <span className="text-secondary-gray">Username</span>
            </label>
            <input
              type="text"
              className="text-secondary-gray ring-0 border-b-secondary-gray w-full px-2 py-1 border-b-2 outline-none"
              {...register("username")}
            />
            {errors?.username?.message && (
              <p className="py-2 text-xs text-red-500">
                {errors.username.message}
              </p>
            )}
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="email" className="flex items-center gap-2">
              <Mail size={15} className="text-secondary-gray" />
              <span className="text-secondary-gray">Email</span>
            </label>
            <input
              type="email"
              className="text-secondary-gray ring-0 border-b-secondary-gray w-full px-2 py-1 border-b-2 outline-none"
              {...register("email")}
            />
            {errors?.email?.message && (
              <p className="py-2 text-xs text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="password" className="flex items-center gap-2">
              <LockIcon size={15} className="text-secondary-gray" />
              <span className="text-secondary-gray">Password</span>
              <span
                className="ml-auto cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <Eye size={15} className="text-secondary-gray" />
                ) : (
                  <EyeOff size={15} className="text-secondary-gray" />
                )}
              </span>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              className="text-secondary-gray ring-0 border-b-secondary-gray w-full px-2 py-1 border-b-2 outline-none"
              {...register("password")}
            />
            {errors?.password?.message && (
              <p className="py-2 text-xs text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <RegisterSubmitButton pending={pending} />

          <div className="flex flex-row-reverse justify-between gap-3 py-2">
            <div className="flex items-center gap-2">
              <span className="text-secondary-gray text-sm">
                Already have an account?{" "}
              </span>
              <Link
                href="/login"
                className="text-primary-green hover:underline w-fit text-sm"
              >
                Login
              </Link>
            </div>

            <Link
              href="/"
              className="text-secondary-gray hover:underline ps-5 w-fit text-sm"
            >
              Go Back
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;

const RegisterSubmitButton = ({ pending }: { pending: boolean }) => {
  return (
    <div className="flex flex-col items-center w-full gap-5">
      <Button
        disabled={pending}
        className="bg-primary-green hover:bg-secondary-gray w-full px-10 py-3 text-center text-white"
      >
        {pending ? (
          <ClipLoader size={28} loading={pending} color="white" />
        ) : (
          "Create New Account"
        )}
      </Button>
    </div>
  );
};
