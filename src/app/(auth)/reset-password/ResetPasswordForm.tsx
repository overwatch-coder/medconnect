"use client";

import React, { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import Swal from "sweetalert2";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { resetPasswordSchema, ResetPasswordType } from "@/schema/user.schema";
import { resetPasswordFormSubmit } from "@/actions/user.action";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, LockIcon } from "lucide-react";

const ResetPasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
  } = useForm<ResetPasswordType>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "all",
  });

  const handleForgotPasswordSubmission: SubmitHandler<
    ResetPasswordType
  > = async (data) => {
    const result = await resetPasswordFormSubmit(data);
    if (!result.success) {
      return Swal.fire({
        title: "Oops!",
        text: Array.isArray(result.error?.message)
          ? result.error?.message.join(", ")
          : result.error?.message,
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
    <div className="md:max-w-md flex flex-col items-center justify-center w-full h-full">
      <div className="z-20 flex flex-col w-full gap-5">
        <h3 className="text-secondary-gray text-4xl font-bold text-center">
          Reset Password
        </h3>

        <p className="text-secondary-gray font-semibold text-center">
          Enter new password to reset the old password{" "}
        </p>

        <form
          onSubmit={handleSubmit(handleForgotPasswordSubmission)}
          className="flex flex-col w-full gap-4"
        >
          {/* Password */}
          <div className="flex flex-col w-full">
            <label htmlFor="password" className="flex items-center gap-2">
              <LockIcon size={15} className="text-secondary-gray" />
              <span className="text-secondary-gray">New Password</span>
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
              className="text-secondary-gray focus:border-b-2 ring-0 border-b-secondary-gray placeholder:text-xs w-full px-2 py-1 border-b outline-none"
              {...register("password")}
              placeholder="choose a new password"
            />
            {errors?.password?.message && (
              <p className="py-2 text-xs text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col w-full">
            <label
              htmlFor="confirmPassword"
              className="flex items-center gap-2"
            >
              <LockIcon size={15} className="text-secondary-gray" />
              <span className="text-secondary-gray">Confirm Password</span>
              <span
                className="ml-auto cursor-pointer"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? (
                  <Eye size={15} className="text-secondary-gray" />
                ) : (
                  <EyeOff size={15} className="text-secondary-gray" />
                )}
              </span>
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              className="text-secondary-gray focus:border-b-2 ring-0 border-b-secondary-gray placeholder:text-xs w-full px-2 py-1 border-b outline-none"
              {...register("confirmPassword")}
              placeholder="enter password again"
            />
            {errors?.confirmPassword?.message && (
              <p className="py-2 text-xs text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <ResetPasswordFormSubmitButton pending={pending} />

          <div className="flex items-center justify-center text-center">
            <Link
              href="/login"
              className="text-secondary-gray hover:underline w-fit text-sm"
            >
              Go Back
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordForm;

const ResetPasswordFormSubmitButton = ({ pending }: { pending: boolean }) => {
  return (
    <div className="flex flex-col items-center w-full gap-5 py-4">
      <Button
        disabled={pending}
        className="bg-primary-green hover:bg-secondary-gray w-full px-10 py-4 text-center text-white"
      >
        {pending ? (
          <ClipLoader size={28} loading={pending} color="white" />
        ) : (
          "Change Password"
        )}
      </Button>
    </div>
  );
};
