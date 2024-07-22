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
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { IAppointment } from "@/types/backend";
import { AppointmentType } from "@/types/index";
import { appointmentSchema } from "@/schema/appointment.schema";
import RenderCustomError from "@/components/RenderCustomError";
import { createOrEditAppointment } from "@/actions/single-patient.action";
import { useMutateData } from "@/hooks/useFetch";

type RescheduleAppointmentProps = {
  appointment: IAppointment;
  refetchAppointments: () => void;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const RescheduleAppointment = ({
  appointment,
  refetchAppointments,
  open,
  setOpen,
}: RescheduleAppointmentProps) => {
  const queryClient = useQueryClient();

  const {
    register,
    reset,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<AppointmentType>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      date: new Date(appointment.date)
        .toISOString()
        .split(":")
        .slice(0, 2)
        .join(":"),
      official: appointment.official,
      isClosed: appointment.isClosed === true ? "true" : "false",
      patientId: appointment.patientId,
    },
    mode: "all",
  });

  const date = watch("date");

  const {
    mutateAsync,
    isPending: pending,
    isError,
    error,
  } = useMutateData({
    mutationFn: async (data: AppointmentType) =>
      createOrEditAppointment(data, appointment.patientId, appointment._id),
    config: {
      queryKey: ["appointments"],
    },
  });

  const handleFormSubmit: SubmitHandler<AppointmentType> = async (data) => {
    await mutateAsync(
      {
        ...data,
        isClosed: "false",
      },
      {
        onSuccess: () => {
          toast.success("Appointment rescheduled successfully");
          queryClient.invalidateQueries({
            queryKey: ["appointments"],
          });
          refetchAppointments();
          reset();
          setOpen(false);
        },
      }
    );
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild onClick={() => setOpen(true)}>
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
                  setOpen(false);
                }}
              >
                <X
                  className="border border-red-500 text-red-500 rounded-full"
                  size={25}
                />
              </DialogClose>
            </DialogTitle>

            <div className="flex flex-col gap-5 w-full">
              <RenderCustomError isError={isError} error={error} />

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
                        labelName="Date & Time"
                        inputName="date"
                        register={register}
                        errors={errors}
                        inputType="datetime-local"
                        value={new Date(date)
                          .toISOString()
                          .split(":")
                          .slice(0, 2)
                          .join(":")}
                      />

                      <CustomInputForm
                        labelName="Assigned H.O"
                        inputName="official"
                        register={register}
                        errors={errors}
                        inputType="hidden"
                        value={appointment.official}
                      />

                      <CustomInputForm
                        labelName="Mark as Completed"
                        inputName="isClosed"
                        register={register}
                        errors={errors}
                        inputType="hidden"
                        value={"false"}
                      />

                      <CustomInputForm
                        labelName="Patient ID"
                        inputName="patientId"
                        register={register}
                        errors={errors}
                        inputType="hidden"
                        value={appointment.patientId}
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
