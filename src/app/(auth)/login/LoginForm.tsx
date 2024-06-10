"use client";

import React, { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import Swal from "sweetalert2";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { loginSchema, LoginType } from "@/schema/user.schema";
import { loginFormSubmit } from "@/actions/user.action";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { IoPerson } from "react-icons/io5";
import { Eye, EyeOff, LockIcon } from "lucide-react";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { useUserAtom } from "@/hooks";
import CustomErrorElement from "@/components/CustomErrorElement";

const LoginForm = () => {
  const [user, setUser] = useUserAtom();

  const [showPassword, setShowPassword] = useState(false);
  const [submitFormErrors, setSubmitFormErrors] = useState<string[]>([]);

  const router = useRouter();

  const searchParams = useSearchParams();
  const redirectUrl = searchParams.has("redirect")
    ? `${searchParams.get("redirect")}`
    : "/dashboard";

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    mode: "all",
  });

  // submit login form
  const mutation = useMutation({
    mutationKey: ["user"],
    mutationFn: loginFormSubmit,
    onSettled: (result) => {
      if (!result?.success) {
        setSubmitFormErrors(result?.errors!);
        reset({ password: "" });
        return;
      }

      setUser({
        token: result?.data?.token,
        user: null,
      });
      reset();
      toast.success(result?.message);
      router.replace(redirectUrl);
    },
  });

  const handleLoginSubmission: SubmitHandler<LoginType> = async (data) => {
    mutation.mutate(data);
  };

  if (user.token) {
    return router.replace("/dashboard");
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-full max-w-md p-10">
      {/* Login Image - Only on Small devices */}
      <div className="md:hidden pb-10">
        <Image
          src="/assets/images/login-image.svg"
          alt="login"
          width={500}
          height={500}
          quality={100}
          loading="lazy"
          className="object-cover"
        />
      </div>

      <div className="z-20 flex flex-col w-full gap-8">
        <h3 className="text-secondary-gray text-start text-3xl font-bold">
          C.H.P.S. Login
        </h3>

        <form
          onSubmit={handleSubmit(handleLoginSubmission)}
          className="flex flex-col w-full gap-6"
          method="POST"
        >
          <CustomErrorElement errors={submitFormErrors} />

          <div className="flex flex-col w-full">
            <label htmlFor="compoundName" className="flex items-center gap-2">
              <IoPerson size={15} className="text-secondary-gray" />
              <span className="text-secondary-gray">Compound Name</span>
            </label>
            <input
              type="text"
              className="text-secondary-gray ring-0 border-b-secondary-gray w-full px-2 py-1 border-b-2 outline-none"
              {...register("compoundName")}
            />
            {errors?.compoundName?.message && (
              <p className="py-2 text-xs text-red-500">
                {errors.compoundName.message}
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

          <div className="flex flex-row justify-between gap-3 py-2">
            <div className="flex items-center gap-2">
              <Checkbox id="rememberMe" />
              <label
                htmlFor="rememberMe"
                className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-secondary-gray text-sm font-medium leading-none"
              >
                Remember Me
              </label>
            </div>

            <Link
              href="/forgot-password"
              className="text-primary-green hover:underline w-fit text-sm"
            >
              Forgot password?
            </Link>
          </div>

          <LoginSubmitButton pending={mutation.isPending} />

          {/* <div className="flex flex-row-reverse justify-between gap-3 py-2">
            <div className="flex items-center gap-2">
              <span className="text-secondary-gray text-sm">
                Don&apos;t have an account yet?{" "}
              </span>
              <Link
                href="/register"
                className="text-primary-green hover:underline w-fit text-sm"
              >
                Register
              </Link>
            </div>

            <Link
              href="/"
              className="text-secondary-gray hover:underline w-fit ps-5 text-sm"
            >
              Go Back
            </Link>
          </div> */}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

const LoginSubmitButton = ({ pending }: { pending: boolean }) => {
  return (
    <div className="flex flex-col items-center w-full gap-5">
      <Button
        disabled={pending}
        className="bg-primary-green hover:bg-secondary-gray w-full px-10 py-3 text-center text-white"
      >
        {pending ? (
          <ClipLoader size={28} loading={pending} color="white" />
        ) : (
          "Login"
        )}
      </Button>
    </div>
  );
};
