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
import { RescheduleAppointmentType } from "@/types/index";
import { rescheduleAppointmentSchema } from "@/schema/appointment.schema";
import { useMutation } from "@tanstack/react-query";
import { AppointmentsDataType } from "@/app/dashboard/appointments/AppointmentsTable";
import Image from "next/image";

const RescheduleAppointment = ({
  appointment,
}: {
  appointment: AppointmentsDataType;
}) => {
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<RescheduleAppointmentType>({
    resolver: zodResolver(rescheduleAppointmentSchema),
    defaultValues: appointment,
    mode: "all",
  });

  const { mutateAsync, isPending: pending } = useMutation({
    mutationFn: async (data: RescheduleAppointmentType) => {
      console.log({ data });
      return data;
    },

    onSuccess: () => {
      toast.success("Appointment rescheduled successfully");
      reset();
    },
  });

  const handleFormSubmit: SubmitHandler<RescheduleAppointmentType> = async (
    data
  ) => {
    console.log({ data });
    await mutateAsync(data);
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Image
            src="/assets/icons/calendar.svg"
            alt="Calendar"
            width={20}
            height={20}
            className="cursor-pointer"
          />
        </DialogTrigger>

        <DialogContent
          id="hide"
          className="flex flex-col gap-4 w-full max-w-[90vw] md:max-w-[40vw] overflow-hidden"
        >
          <DialogHeader className="overflow-y-scroll scrollbar-hide">
            <DialogTitle className="flex items-center justify-between">
              <span className="text-xl md:text-2xl text-secondary-gray font-bold">
                Reschedule Appointment
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
                        labelName="Date"
                        inputName="date"
                        register={register}
                        errors={errors}
                        inputType="date"
                      />

                      <CustomInputForm
                        labelName="Time"
                        inputName="time"
                        register={register}
                        errors={errors}
                        inputType="time"
                      />

                      <CustomInputForm
                        labelName="Patient ID"
                        inputName="patientID"
                        register={register}
                        errors={errors}
                        inputType="hidden"
                      />
                    </div>
                  </div>

                  {/* Submit form button */}
                  <RescheduleAppointmentButton
                    pending={pending}
                    reset={reset}
                  />
                </div>
              </form>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RescheduleAppointment;

const RescheduleAppointmentButton = ({
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
          "Reschedule"
        )}
      </Button>
    </div>
  );
};
