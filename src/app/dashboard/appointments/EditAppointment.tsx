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
import { useQueryClient } from "@tanstack/react-query";
import { TbEdit } from "react-icons/tb";
import { IAppointment } from "@/types/backend";
import { useMutateData } from "@/hooks/useFetch";
import { createOrEditAppointment } from "@/actions/single-patient.action";
import RenderCustomError from "@/components/RenderCustomError";

type EditAppointmentProps = {
  appointment: IAppointment;
  refetchAppointments: () => void;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditAppointment = ({
  appointment,
  refetchAppointments,
  open,
  setOpen,
}: EditAppointmentProps) => {
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
      isClosed: appointment.isClosed === true ? "true" : "false",
      official: appointment.official,
      date: new Date(appointment.date)
        .toISOString()
        .split(":")
        .slice(0, 2)
        .join(":"),
      patientId: appointment.patientId,
    },
    mode: "all",
  });

  const isClosed = watch("isClosed");
  const date = watch("date");
  const official = watch("official");

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
    notificationData: {
      type: "Appointment Scheduled",
      title: "Appointment schedule has been updated",
      description: `An appointment has been scheduled for ${appointment.patient.firstName + " " + appointment.patient.lastName} with ${official} on ${new Date(
        date
      ).toLocaleDateString("en-US", {
        dateStyle: "full",
      })}`,
    },
  });

  const handleFormSubmit: SubmitHandler<AppointmentType> = async (data) => {
    console.log({ data });
    await mutateAsync(
      { ...data, isClosed: isClosed },
      {
        onSuccess: (data) => {
          console.log({ data, in: "onSuccess" });
          toast.success("Appointment updated successfully");
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
                        labelName="Assigned Health official"
                        inputName="official"
                        register={register}
                        errors={errors}
                        inputType="text"
                        placeholderText="Enter assigned health official"
                        value={official}
                      />

                      <CustomInputForm
                        labelName="Mark as Completed"
                        inputName="isClosed"
                        register={register}
                        errors={errors}
                        inputType="select"
                        selectOptions={[
                          { value: "true", label: "Completed" },
                          {
                            value: "false",
                            label: "Not Completed",
                          },
                        ]}
                        value={isClosed}
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
