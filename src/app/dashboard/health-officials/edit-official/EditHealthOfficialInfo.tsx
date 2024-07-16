"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import ClipLoader from "react-spinners/ClipLoader";
import { FormSectionHeader } from "@/app/dashboard/compounds/add-new/AddCompoundForm";
import CustomInputForm from "@/components/CustomInputForm";
import { toast } from "react-toastify";
import { HealthStaffType } from "@/types/index";
import { HealthStaffSchema } from "@/schema/health-officials.schema";
import { useAuth } from "@/hooks";
import RenderCustomError from "@/components/RenderCustomError";
import { useMutateData } from "@/hooks/useFetch";
import { IStaff } from "@/types/backend";
import { createOrEditStaff } from "@/actions/staff.action";
import { useQueryClient } from "@tanstack/react-query";

type EditHealthOfficialInfoProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  healthOfficial: IStaff;
};

export interface HealthSubmitData
  extends Omit<HealthStaffType, "workSchedule"> {
  workSchedule: string[];
  staffId: string;
}

const EditHealthOfficialInfo = ({
  open,
  setOpen,
  healthOfficial,
}: EditHealthOfficialInfoProps) => {
  const [user] = useAuth();
  const queryClient = useQueryClient();

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<HealthStaffType>({
    resolver: zodResolver(HealthStaffSchema),
    defaultValues: {
      ...healthOfficial,
      workSchedule: healthOfficial.workSchedule.join(","),
    },
    mode: "all",
  });

  const {
    mutateAsync,
    isPending: pending,
    error,
    isError,
  } = useMutateData<HealthSubmitData, IStaff>({
    mutationFn: async (data) =>
      createOrEditStaff({ data: data, staffId: healthOfficial._id }),
    config: {
      queryKey: ["staff", user?.staff?.chpsCompoundId!],
      reset: reset,
    },
  });

  const handleFormSubmit: SubmitHandler<HealthStaffType> = async (data) => {
    await mutateAsync(
      {
        ...data,
        workSchedule: data.workSchedule.split(","),
        staffId: healthOfficial.staffId,
      },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries({
            queryKey: ["staff", user?.staff?.chpsCompoundId!],
          });

          toast.success("Staff Information updated successfully");

          reset();

          setOpen(false);
        },
      }
    );
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          id="hide"
          className="flex flex-col gap-4 w-full max-w-[90vw] md:max-w-[50vw] max-h-[95vh] h-full overflow-hidden"
        >
          <DialogHeader className="overflow-y-scroll scrollbar-hide">
            <DialogTitle className="flex items-center justify-between">
              <span className="text-xl md:text-2xl text-secondary-gray font-bold">
                Edit Staff
              </span>
              <DialogClose
                onClick={() => {
                  reset();
                }}
              >
                <X
                  className="border border-red-500 text-red-500 rounded-full"
                  size={25}
                />
              </DialogClose>
            </DialogTitle>

            <DialogDescription className="flex flex-col gap-5 w-full">
              {/* Error */}
              <RenderCustomError isError={isError} error={error} />

              <form
                onSubmit={handleSubmit(handleFormSubmit)}
                className="flex flex-col gap-4 w-full"
                method="POST"
                encType="multipart/form-data"
              >
                <div className="flex flex-col gap-5 px-3 pt-5 pb-10 bg-white h-full">
                  {/* General Information */}
                  <div className="flex flex-col gap-5 p-4 rounded-md border border-secondary-gray/50 w-full">
                    <FormSectionHeader title="General Information" />

                    <div className="flex flex-col gap-5 px-2 md:px-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                        <CustomInputForm
                          labelName="Full Name"
                          inputName="fullName"
                          register={register}
                          errors={errors}
                          inputType="text"
                          placeholderText="Enter full name"
                        />

                        <CustomInputForm
                          labelName="Email"
                          inputName="email"
                          register={register}
                          errors={errors}
                          inputType="text"
                          placeholderText="Enter email"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                        <CustomInputForm
                          labelName="Gender"
                          inputName="gender"
                          register={register}
                          errors={errors}
                          inputType="select"
                          selectOptions={[
                            { value: "Male", label: "Male" },
                            { value: "Female", label: "Female" },
                            { value: "Other", label: "Other" },
                          ]}
                          placeholderText="Select gender"
                        />

                        <CustomInputForm
                          labelName="Date of Birth"
                          inputName="dateOfBirth"
                          register={register}
                          errors={errors}
                          inputType="date"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                        <CustomInputForm
                          labelName="Contact Number"
                          inputName="contact"
                          register={register}
                          errors={errors}
                          inputType="text"
                          placeholderText="Enter contact number"
                        />

                        <CustomInputForm
                          labelName="Position"
                          inputName="position"
                          register={register}
                          errors={errors}
                          inputType="select"
                          selectOptions={[
                            { value: "Doctor", label: "Doctor" },
                            { value: "Nurse", label: "Nurse" },
                            {
                              value: "Physician Assistant",
                              label: "Physician Assistant",
                            },
                            {
                              value: "Community Health Worker",
                              label: "Community Health Worker",
                            },
                            {
                              value: "Staff",
                              label: "Staff",
                            },
                          ]}
                          placeholderText="Select position"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                        <CustomInputForm
                          labelName="Date Started"
                          inputName="dateOfHire"
                          register={register}
                          errors={errors}
                          inputType="date"
                        />

                        <CustomInputForm
                          labelName="Work Schedule"
                          inputName="workSchedule"
                          register={register}
                          errors={errors}
                          inputType="text"
                          placeholderText="e.g. Monday 10:00 to 12:00, Tuesday 10:00 to 12:00"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                        <CustomInputForm
                          labelName="Chps Compound ID"
                          inputName="chpsCompoundId"
                          register={register}
                          errors={errors}
                          inputType="hidden"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit form button */}
                  <SubmtitFormButton
                    pending={pending}
                    reset={reset}
                    setOpen={setOpen}
                  />
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditHealthOfficialInfo;

type SubmtitFormButtonProps = {
  pending: boolean;
  reset: () => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

// Submit form button
const SubmtitFormButton = ({
  pending,
  reset,
  setOpen,
}: SubmtitFormButtonProps) => {
  return (
    <div className="flex gap-5 flex-row items-center justify-end w-1/2 ms-auto">
      <Button
        type="button"
        disabled={pending}
        onClick={() => {
          setOpen(false);
          reset();
        }}
        className="text-center text-primary-gray rounded-none border border-primary-gray/50 bg-transparent hover:bg-transparent w-full"
      >
        {"Cancel"}
      </Button>

      <Button
        disabled={pending}
        className="text-white text-center bg-primary-green hover:bg-primary-green rounded-none w-full"
        type={"submit"}
      >
        {pending ? (
          <ClipLoader size={28} loading={pending} color="white" />
        ) : (
          "Edit Staff"
        )}
      </Button>
    </div>
  );
};
