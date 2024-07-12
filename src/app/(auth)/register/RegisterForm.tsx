"use client";

import React, { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { userSchema } from "@/schema/user.schema";
import { createUserFormSubmit } from "@/actions/user.action";
import { Button } from "@/components/ui/button";
import { IoPerson } from "react-icons/io5";
import { Eye, EyeOff, LockIcon, Mail } from "lucide-react";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks";
import CustomErrorElement from "@/components/CustomErrorElement";
import { CreateUserType } from "@/types/index";
import { UserType } from "@/types/backend";

const RegisterForm = () => {
  const [user, setUser] = useAuth();
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
    getValues,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateUserType>({
    resolver: zodResolver(userSchema.omit({ _id: true })),
    mode: "all",
  });

  // submit create user form
  const mutation = useMutation({
    mutationKey: ["user"],
    mutationFn: createUserFormSubmit,
    onSettled: (result) => {
      if (!result?.status) {
        setSubmitFormErrors(result?.errors!);
        reset({ password: "" });
        return;
      }

      setUser(result?.data as UserType);
      reset();
      toast.success(result?.message);
      router.replace(redirectUrl);
    },
  });

  const handleCreateUserSubmission: SubmitHandler<CreateUserType> = async (
    data
  ) => {
    setSubmitFormErrors([]);
    mutation.mutate(data);
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

        <CustomErrorElement errors={submitFormErrors} />

        <form
          onSubmit={handleSubmit(handleCreateUserSubmission)}
          className="flex flex-col w-full gap-6"
          method="POST"
        >
          {/* Compound Name */}
          <div className="flex flex-col w-full">
            <label htmlFor="name" className="flex items-center gap-2">
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

          {/* Location */}
          <div className="flex flex-col w-full">
            <label htmlFor="location" className="flex items-center gap-2">
              <IoPerson size={15} className="text-secondary-gray" />
              <span className="text-secondary-gray">Location</span>
            </label>
            <input
              type="text"
              className="text-secondary-gray ring-0 border-b-secondary-gray w-full px-2 py-1 border-b-2 outline-none"
              {...register("location")}
            />
            {errors?.location?.message && (
              <p className="py-2 text-xs text-red-500">
                {errors.location.message}
              </p>
            )}
          </div>

          {/* Email */}
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

          {/* Password */}
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

          {/* Region */}
          <div className="flex flex-col w-full">
            <label htmlFor="region" className="flex items-center gap-2">
              <IoPerson size={15} className="text-secondary-gray" />
              <span className="text-secondary-gray">Region</span>
            </label>
            <input
              type="text"
              className="text-secondary-gray ring-0 border-b-secondary-gray w-full px-2 py-1 border-b-2 outline-none"
              {...register("region")}
            />
            {errors?.region?.message && (
              <p className="py-2 text-xs text-red-500">
                {errors.region.message}
              </p>
            )}
          </div>

          {/* District */}
          <div className="flex flex-col w-full">
            <label htmlFor="district" className="flex items-center gap-2">
              <IoPerson size={15} className="text-secondary-gray" />
              <span className="text-secondary-gray">District</span>
            </label>
            <input
              type="text"
              className="text-secondary-gray ring-0 border-b-secondary-gray w-full px-2 py-1 border-b-2 outline-none"
              {...register("district")}
            />
            {errors?.district?.message && (
              <p className="py-2 text-xs text-red-500">
                {errors.district.message}
              </p>
            )}
          </div>

          {/* Operation Hours */}
          <div className="flex flex-col w-full">
            <label htmlFor="operatingHours" className="flex items-center gap-2">
              <IoPerson size={15} className="text-secondary-gray" />
              <span className="text-secondary-gray">Operating Hours</span>
            </label>
            <input
              type="text"
              className="text-secondary-gray ring-0 border-b-secondary-gray w-full px-2 py-1 border-b-2 outline-none"
              {...register("operatingHours")}
            />
            {errors?.operatingHours?.message && (
              <p className="py-2 text-xs text-red-500">
                {errors.operatingHours.message}
              </p>
            )}
          </div>

          {/* Available Services */}
          <div className="flex flex-col w-full">
            <label
              htmlFor="availableServices"
              className="flex items-center gap-2"
            >
              <IoPerson size={15} className="text-secondary-gray" />
              <span className="text-secondary-gray">Available Services</span>
            </label>

            <small className="text-xs font-light text-secondary-gray/80">
              It should be comma separated (eg. screening, ambulance )
            </small>

            <input
              type="text"
              className="text-secondary-gray ring-0 border-b-secondary-gray w-full px-2 py-1 border-b-2 outline-none"
              {...register("availableServices")}
            />
            {errors?.availableServices?.message && (
              <p className="py-2 text-xs text-red-500">
                {errors.availableServices.message}
              </p>
            )}
          </div>

          {/* Terms and Conditions */}
          <div className="items-top flex space-x-2">
            <input
              type="checkbox"
              {...register("termsAndConditions")}
              className="border-secondary-gray border-2"
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="termsAndConditions"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Accept terms and conditions
              </label>
              <p className="text-sm text-muted-foreground">
                You agree to our Terms of Service and Privacy Policy.
              </p>

              {errors?.termsAndConditions?.message && (
                <p className="py-2 text-xs text-red-500">
                  {errors.termsAndConditions.message}
                </p>
              )}
            </div>
          </div>

          <CreateUserSubmitButton
            pending={mutation.isPending}
            agreed={getValues("termsAndConditions") === true}
          />

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

const CreateUserSubmitButton = ({
  pending,
  agreed,
}: {
  pending: boolean;
  agreed: boolean;
}) => {
  return (
    <div className="flex flex-col items-center w-full gap-5">
      <Button
        disabled={pending || !agreed}
        className={`${
          agreed
            ? "bg-primary-green hover:bg-secondary-gray cursor-pointer"
            : "bg-primary-green/50 hover:bg-primary-green/50 cursor-not-allowed"
        }  w-full px-10 py-3 text-center text-white`}
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
