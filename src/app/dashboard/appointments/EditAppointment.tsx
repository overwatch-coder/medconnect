"use client";

import React from "react";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import ClipLoader from "react-spinners/ClipLoader";
import CustomInputForm from "@/components/CustomInputForm";
import { toast } from "react-toastify";
import { AppointmentType } from "@/types/index";
import { appointmentSchema } from "@/schema/appointment.schema";
import { useMutation } from "@tanstack/react-query";
import { AppointmentsDataType } from "@/app/dashboard/appointments/AppointmentsTable";
import { TbEdit } from "react-icons/tb";

const EditAppointment = ({
  appointment,
}: {
  appointment: AppointmentsDataType;
}) => {
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<Partial<AppointmentType>>({
    resolver: zodResolver(appointmentSchema.partial()),
    defaultValues: {
      ...appointment,
      age: appointment.age.toString(),
    },
    mode: "all",
  });

  const { mutateAsync, isPending: pending } = useMutation({
    mutationFn: async (data: Partial<AppointmentType>) => {
      console.log({ data });
      return data;
    },

    onSuccess: () => {
      toast.success("Appointment updated successfully");
      reset();
    },
  });

  const handleFormSubmit: SubmitHandler<Partial<AppointmentType>> = async (
    data
  ) => {
    console.log({ data });
    await mutateAsync(data);
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <TbEdit size={20} className="text-primary-green cursor-pointer" />
        </DialogTrigger>

        <DialogContent
          id="hide"
          className="flex flex-col gap-4 w-full max-w-[90vw] md:max-w-[40vw] max-h-[95vh] h-full overflow-hidden"
        >
          <DialogHeader className="overflow-y-scroll scrollbar-hide">
            <DialogTitle className="flex items-center justify-between">
              <span className="text-xl md:text-2xl text-secondary-gray font-bold">
                Update Appointment
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
                  {/* Patient appointment */}
                  <div className="flex flex-col gap-5 rounded-none w-full">
                    <div className="grid grid-cols-1 gap-5 w-full">
                      <CustomInputForm
                        labelName="Patient Name"
                        inputName="patientName"
                        register={register}
                        errors={errors}
                        inputType="text"
                        placeholderText="Enter patient name"
                      />

                      <CustomInputForm
                        labelName="Patient ID"
                        inputName="patientID"
                        register={register}
                        errors={errors}
                        inputType="text"
                        placeholderText="Enter patient ID"
                      />

                      <CustomInputForm
                        labelName="Age"
                        inputName="age"
                        register={register}
                        errors={errors}
                        inputType="text"
                        placeholderText="Enter age"
                      />

                      <CustomInputForm
                        labelName="Date"
                        inputName="date"
                        register={register}
                        errors={errors}
                        inputType="date"
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-5 w-full">
                      <CustomInputForm
                        labelName="Time"
                        inputName="time"
                        register={register}
                        errors={errors}
                        inputType="time"
                      />

                      <CustomInputForm
                        labelName="Assigned Health official"
                        inputName="assignedHO"
                        register={register}
                        errors={errors}
                        inputType="text"
                        placeholderText="Enter assigned health official"
                      />

                      <CustomInputForm
                        labelName="Phone Number"
                        inputName="phoneNumber"
                        register={register}
                        errors={errors}
                        inputType="text"
                        placeholderText="Enter phone Number"
                      />
                    </div>
                  </div>

                  {/* Submit form button */}
                  <EditAppointmentButton pending={pending} reset={reset} />
                </div>
              </form>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditAppointment;

const EditAppointmentButton = ({
  pending,
  reset,
}: {
  pending: boolean;
  reset: () => void;
}) => {
  return (
    <div className="flex gap-5 flex-row items-center justify-between">
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
          "Update"
        )}
      </Button>
    </div>
  );
};
