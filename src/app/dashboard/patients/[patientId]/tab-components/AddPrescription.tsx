"use client";

import React from "react";
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
import { PrescriptionType } from "@/types/index";
import { prescriptionSchema } from "@/schema/prescription.schema";
import { useQueryClient } from "@tanstack/react-query";
import { useMutateData } from "@/hooks/useFetch";
import RenderCustomError from "@/components/RenderCustomError";
import { createOrEditPrescription } from "@/actions/single-patient.action";

type AddPrescriptionProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetchPrescriptions?: () => void;
  patientId: string;
};

const AddPrescription = ({
  open,
  setOpen,
  refetchPrescriptions,
  patientId,
}: AddPrescriptionProps) => {
  const queryClient = useQueryClient();

  const {
    register,
    reset,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<PrescriptionType>({
    resolver: zodResolver(prescriptionSchema),
    mode: "all",
  });

  const medicationName = watch("medicationName");

  const {
    mutateAsync,
    isPending: pending,
    isError,
    error,
  } = useMutateData({
    mutationFn: async (data: PrescriptionType) =>
      createOrEditPrescription(data, patientId, undefined),
    config: {
      queryKey: ["patients", "prescriptions", patientId],
    },
    notificationData: {
      type: "New Prescription",
      title: "New prescription has been added",
      description: `The prescription ${medicationName} has been added successfully`,
    },
  });

  const handleFormSubmit: SubmitHandler<PrescriptionType> = async (data) => {
    await mutateAsync(data, {
      onSuccess: () => {
        setOpen(false);
        toast.success("New prescription added successfully!");
        queryClient.invalidateQueries({
          queryKey: ["patients", "prescriptions", patientId],
        });
        if (refetchPrescriptions) {
          refetchPrescriptions();
        }
        reset();
      },
    });
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
                Add Prescription
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
                <RenderCustomError isError={isError} error={error} />

                <div className="flex flex-col gap-5 px-3 pt-5 pb-10 bg-white h-full">
                  {/* Medical History */}
                  <div className="flex flex-col gap-5 p-4 rounded-md border border-secondary-gray/50 w-full">
                    <FormSectionHeader title="Medical History" />

                    <div className="flex flex-col gap-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full px-2 md:px-5">
                        <CustomInputForm
                          labelName="Health Official Name"
                          inputName="healthOfficialName"
                          register={register}
                          errors={errors}
                          inputType="text"
                          placeholderText="eg. Dr. John Doe"
                        />

                        <CustomInputForm
                          labelName="Date Issued"
                          inputName="date"
                          register={register}
                          errors={errors}
                          inputType="date"
                        />
                      </div>

                      <span className="text-primary-gray text-start text-sm font-medium">
                        Medication
                      </span>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full px-2 md:px-5">
                        <CustomInputForm
                          labelName="Medication Name"
                          inputName="medicationName"
                          register={register}
                          errors={errors}
                          inputType="text"
                          placeholderText="eg. Paracetamol"
                        />

                        <CustomInputForm
                          labelName="Dosage"
                          inputName="dosage"
                          register={register}
                          errors={errors}
                          inputType="text"
                          placeholderText="eg. 500mg"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full px-2 md:px-5">
                        <CustomInputForm
                          labelName="Frequency"
                          inputName="frequency"
                          register={register}
                          errors={errors}
                          inputType="text"
                          placeholderText="eg. 3 times daily"
                        />

                        <CustomInputForm
                          labelName="Duration"
                          inputName="duration"
                          register={register}
                          errors={errors}
                          inputType="text"
                          placeholderText="eg. 1 week"
                        />
                      </div>

                      <div className="grid grid-cols-1 gap-5 w-full px-2 md:px-5">
                        <CustomInputForm
                          labelName="Notes"
                          inputName="notes"
                          register={register}
                          errors={errors}
                          inputType="textarea"
                          placeholderText="Enter notes here"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit form button */}
                  <AddPrescriptionButton pending={pending} reset={reset} />
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddPrescription;

// Submit form button
const AddPrescriptionButton = ({
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
          "Upload"
        )}
      </Button>
    </div>
  );
};
