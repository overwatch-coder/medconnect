"use client";

import React, { useEffect, useState } from "react";
import { Plus, X } from "lucide-react";
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
import { useFetch, useMutateData } from "@/hooks/useFetch";
import { IAppointment, Patient } from "@/types/backend";
import {
  createOrEditAppointment,
  getAllAppointments,
} from "@/actions/single-patient.action";
import { getChpsPatients } from "@/actions/patients.action";
import RenderCustomError from "@/components/RenderCustomError";
import { useAuth } from "@/hooks";

const AddAppointment = () => {
  const [user] = useAuth();
  const { refetch: refetchAppointments } = useFetch<IAppointment[]>({
    queryFn: async () => getAllAppointments(),
    queryKey: ["appointments"],
    enabled: true,
  });
  const [open, setOpen] = useState(false);

  const { data: patientsData } = useFetch<Patient[]>({
    queryFn: async () => getChpsPatients(),
    queryKey: ["patients"],
    enabled: true,
  });

  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    if (patientsData) {
      setPatients(patientsData);
    }
  }, [patientsData]);

  const queryClient = useQueryClient();

  const {
    register,
    reset,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<AppointmentType>({
    resolver: zodResolver(appointmentSchema),
    mode: "all",
  });

  const patientId = watch("patientId");
  const patient = patients.filter((patient) => patient._id === patientId)[0];
  const official = watch("official");
  const date = watch("date");

  const {
    mutateAsync,
    isPending: pending,
    isError,
    error,
  } = useMutateData({
    mutationFn: async (data: AppointmentType) =>
      createOrEditAppointment(data, patientId, undefined),
    config: {
      queryKey: ["appointments"],
    },
    notificationData: {
      type: "Appointment Scheduled",
      title: "Appointment has been scheduled",
      description: `An appointment has been scheduled for ${patient?.firstName + " " + patient?.lastName} with ${official} on ${new Date(
        date
      ).toLocaleDateString("en-US", {
        dateStyle: "full",
      })}`,
    },
  });

  const handleFormSubmit: SubmitHandler<AppointmentType> = async (data) => {
    await mutateAsync(data, {
      onSuccess: () => {
        toast.success("Appointment added successfully");
        queryClient.invalidateQueries({
          queryKey: ["appointments"],
        });
        refetchAppointments();
        reset();
        setOpen(false);
      },
    });
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild onClick={() => setOpen(true)}>
          <Button className="bg-primary-green hover:bg-primary-green hover:scale-105 transition py-2 px-5 flex items-center gap-3 rounded-md text-white">
            <Plus className="text-white" size={20} />
            <span className="font-semibold">Add Appointment</span>
          </Button>
        </DialogTrigger>

        <DialogContent
          id="hide"
          className="flex flex-col gap-4 w-full max-w-[90vw] md:max-w-[40vw] overflow-hidden"
        >
          <DialogHeader className="overflow-y-scroll scrollbar-hide">
            <DialogTitle className="flex items-center justify-between">
              <span className="text-xl md:text-2xl text-secondary-gray font-bold">
                Add Appointment
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
                        labelName="Select a Patient"
                        inputName="patientId"
                        register={register}
                        errors={errors}
                        inputType="select"
                        selectOptions={patients.map((patient) => ({
                          value: patient._id,
                          label: `${patient.firstName} ${patient.lastName}`,
                        }))}
                      />

                      <CustomInputForm
                        labelName="Date & Time"
                        inputName="date"
                        register={register}
                        errors={errors}
                        inputType="datetime-local"
                      />

                      <CustomInputForm
                        labelName="Assigned Health official"
                        inputName="official"
                        register={register}
                        errors={errors}
                        inputType="text"
                        placeholderText="Enter assigned health official"
                      />

                      <CustomInputForm
                        labelName="Mark as Completed"
                        inputName="isClosed"
                        register={register}
                        errors={errors}
                        inputType="hidden"
                        value={"false"}
                      />
                    </div>
                  </div>

                  {/* Submit form button */}
                  <AddAppointmentButton pending={pending} reset={reset} />
                </div>
              </form>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddAppointment;

const AddAppointmentButton = ({
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
          "Add Appointment"
        )}
      </Button>
    </div>
  );
};
