"use client";

import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import Swal from "sweetalert2";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { forgotPasswordSchema, ForgotPasswordType } from "@/schema/user.schema";
import { forgotPasswordFormSubmit } from "@/actions/user.action";
import { Button } from "@/components/ui/button";
import { IoPerson } from "react-icons/io5";

const ForgotPasswordForm = () => {
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
  } = useForm<ForgotPasswordType>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "all",
  });

  const handleForgotPasswordSubmission: SubmitHandler<
    ForgotPasswordType
  > = async (data) => {
    const result = await forgotPasswordFormSubmit(data);
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
    <div className="flex flex-col items-center justify-center w-full h-full max-w-md p-10">
      <div className="z-20 flex flex-col w-full gap-5">
        <h3 className="text-secondary-gray text-start text-4xl font-bold">
          Forgot Password?
        </h3>

        <p className="text-start text-secondary-gray font-semibold">
          Enter the email address associated with the account.
        </p>

        <form
          onSubmit={handleSubmit(handleForgotPasswordSubmission)}
          className="flex flex-col w-full gap-4"
        >
          <div className="flex flex-col w-full">
            <label htmlFor="email" className="flex items-center gap-2">
              <IoPerson size={15} className="text-secondary-gray" />
              <span className="text-secondary-gray">Email</span>
            </label>

            <input
              type="text"
              className="text-secondary-gray ring-0 border-b-secondary-gray w-full px-2 py-1 bg-transparent border-b-2 outline-none"
              placeholder="Enter your email address"
              {...register("email")}
            />

            {errors?.email?.message && (
              <p className="py-2 text-xs text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <ForgotPasswordFormSubmit pending={pending} />

          <div className="flex items-center justify-center gap-2 text-center">
            <span className="text-secondary-gray text-sm">
              Didn&apos;t receive link?
            </span>
            <Link
              href="#"
              onClick={() => {}}
              className="text-primary-green hover:underline w-fit text-sm"
            >
              Resend
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;

const ForgotPasswordFormSubmit = ({ pending }: { pending: boolean }) => {
  return (
    <div className="flex flex-col items-center w-full gap-5 py-4">
      <Button
        disabled={pending}
        className="bg-primary-green hover:bg-secondary-gray md:w-fit w-full px-10 py-3 text-center text-white"
      >
        {pending ? (
          <ClipLoader size={28} loading={pending} color="white" />
        ) : (
          "Send Link"
        )}
      </Button>
    </div>
  );
};
