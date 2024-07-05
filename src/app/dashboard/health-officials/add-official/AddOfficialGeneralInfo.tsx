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
import ClipLoader from "react-spinners/ClipLoader";
import { FormSectionHeader } from "@/app/dashboard/compounds/add-new/AddCompoundForm";
import CustomInputForm from "@/components/CustomInputForm";
import { toast } from "react-toastify";
import { HealthOfficialType } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import { healthOfficialSchema } from "@/schema/health-officials.schema";
import { Button } from "@/components/ui/button";
import AddOfficialAdditionalInfo from "@/app/dashboard/health-officials/add-official/AddOfficialAdditionalInfo";

type AddOfficialGeneralInfoProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddOfficialGeneralInfo = ({
  open,
  setOpen,
}: AddOfficialGeneralInfoProps) => {
  const [openAddAdditionalInfo, setOpenAddAdditionalInfo] = useState(false);

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<HealthOfficialType>({
    resolver: zodResolver(healthOfficialSchema),
    mode: "all",
  });

  const { mutateAsync, isPending: pending } = useMutation({
    mutationFn: async (data: HealthOfficialType) => {
      console.log({ data });
      return data;
    },

    onSuccess: (data) => {
      toast.success("Health Official General Information added successfully");
      setOpen(false);
      setOpenAddAdditionalInfo(true);
      reset();
    },
  });

  const handleFormSubmit: SubmitHandler<HealthOfficialType> = async (data) => {
    console.log({ data });
    await mutateAsync(data);
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
                Add Staff (1)
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
              <form
                onSubmit={handleSubmit(handleFormSubmit)}
                className="flex flex-col gap-4 w-full"
                method="POST"
              >
                <div className="flex flex-col gap-5 px-3 pt-5 pb-10 bg-white h-full">
                  {/* General Information */}
                  <div className="flex flex-col gap-5 p-4 rounded-md border border-secondary-gray/50 w-full">
                    <FormSectionHeader title="General Information" />

                    <div className="flex flex-col gap-5 px-2 md:px-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                        <CustomInputForm
                          labelName="First Name"
                          inputName="firstName"
                          register={register}
                          errors={errors}
                          inputType="text"
                          placeholderText="Enter first name"
                        />

                        <CustomInputForm
                          labelName="Last Name"
                          inputName="lastName"
                          register={register}
                          errors={errors}
                          inputType="text"
                          placeholderText="Enter last name"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                        <CustomInputForm
                          labelName="Staff ID"
                          inputName="staffID"
                          register={register}
                          errors={errors}
                          inputType="text"
                          placeholderText="Enter staff ID"
                        />

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
                          placeholderText="Enter gender"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                        <CustomInputForm
                          labelName="Date of birth"
                          inputName="dob"
                          register={register}
                          errors={errors}
                          inputType="date"
                        />

                        <CustomInputForm
                          labelName="Contact Number"
                          inputName="contactNumber"
                          register={register}
                          errors={errors}
                          inputType="text"
                          placeholderText="Enter contact number"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                        <CustomInputForm
                          labelName="Email Address"
                          inputName="email"
                          register={register}
                          errors={errors}
                          inputType="text"
                          placeholderText="Enter email address"
                        />

                        <CustomInputForm
                          labelName="Position"
                          inputName="position"
                          register={register}
                          errors={errors}
                          inputType="text"
                          placeholderText="Enter position"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                        <CustomInputForm
                          labelName="Location"
                          inputName="location"
                          register={register}
                          errors={errors}
                          inputType="text"
                          placeholderText="Enter location"
                        />

                        <CustomInputForm
                          labelName="Date Started"
                          inputName="dateStarted"
                          register={register}
                          errors={errors}
                          inputType="date"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit form button */}
                  <AddOfficialGeneralInfoButton
                    pending={pending}
                    reset={reset}
                  />
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <AddOfficialAdditionalInfo
        open={openAddAdditionalInfo}
        setOpen={setOpenAddAdditionalInfo}
      />
    </>
  );
};

export default AddOfficialGeneralInfo;

// Submit form button
const AddOfficialGeneralInfoButton = ({
  pending,
  reset,
}: {
  pending: boolean;
  reset: () => void;
}) => {
  return (
    <div className="flex gap-5 flex-row items-center justify-end w-1/2 ms-auto">
      <DialogClose asChild>
        <Button
          disabled={pending}
          onClick={() => {
            reset();
          }}
          type="reset"
          className="text-center text-primary-gray rounded-none border border-primary-gray/50 bg-transparent hover:bg-transparent w-full"
        >
          Cancel
        </Button>
      </DialogClose>

      <Button
        disabled={pending}
        className="text-white text-center bg-primary-green hover:bg-primary-green rounded-none w-full"
      >
        {pending ? (
          <ClipLoader size={28} loading={pending} color="white" />
        ) : (
          "Next"
        )}
      </Button>
    </div>
  );
};
