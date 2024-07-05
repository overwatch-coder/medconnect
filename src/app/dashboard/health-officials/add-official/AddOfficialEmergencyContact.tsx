"use client";

import React from "react";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
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
import { HealthOfficialEmergencyContactType } from "@/types/index";
import { healthOfficialEmergencyContactSchema } from "@/schema/health-officials.schema";
import { useMutation } from "@tanstack/react-query";

type AddOfficialEmergencyContactProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddOfficialEmergencyContact = ({
  open,
  setOpen,
}: AddOfficialEmergencyContactProps) => {
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<HealthOfficialEmergencyContactType>({
    resolver: zodResolver(healthOfficialEmergencyContactSchema),
    mode: "all",
  });

  const { mutateAsync, isPending: pending } = useMutation({
    mutationFn: async (data: HealthOfficialEmergencyContactType) => {
      console.log({ data });
      return data;
    },

    onSuccess: (data) => {
      toast.success("Health Official Emergency Contact added successfully");
      setOpen(false);
      reset();
    },
  });

  const handleFormSubmit: SubmitHandler<
    HealthOfficialEmergencyContactType
  > = async (data) => {
    console.log({ data });
    await mutateAsync(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        id="hide"
        className="flex flex-col gap-4 w-full max-w-[90vw] md:max-w-[50vw] overflow-hidden"
      >
        <DialogHeader className="overflow-y-scroll scrollbar-hide">
          <DialogTitle className="flex items-center justify-between">
            <span className="text-xl md:text-2xl text-secondary-gray font-bold">
              Add Staff (3)
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

          <div className="flex flex-col gap-5 w-full">
            <form
              onSubmit={handleSubmit(handleFormSubmit)}
              className="flex flex-col gap-4 w-full"
              method="POST"
            >
              <div className="flex flex-col gap-5 px-3 pt-5 pb-10 bg-white h-full">
                {/* Emergency Contact Person */}
                <div className="flex flex-col gap-5 p-4 rounded-md border border-secondary-gray/50 w-full">
                  <FormSectionHeader title="Emergency Contact Person" />

                  <div className="flex flex-col gap-5 px-2 md:px-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                      <CustomInputForm
                        labelName="Contact Name"
                        inputName="contactName"
                        register={register}
                        errors={errors}
                        inputType="text"
                        placeholderText="Enter contact name"
                      />

                      <CustomInputForm
                        labelName="Phone Number"
                        inputName="phoneNumber"
                        register={register}
                        errors={errors}
                        inputType="text"
                        placeholderText="Enter phone number"
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
                        labelName="Email Address"
                        inputName="email"
                        register={register}
                        errors={errors}
                        inputType="text"
                        placeholderText="Enter email address"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit form button */}
                <AddOfficialEmergencyContactButton
                  pending={pending}
                  reset={reset}
                />
              </div>
            </form>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddOfficialEmergencyContact;

const AddOfficialEmergencyContactButton = ({
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
          "Add Staff"
        )}
      </Button>
    </div>
  );
};
