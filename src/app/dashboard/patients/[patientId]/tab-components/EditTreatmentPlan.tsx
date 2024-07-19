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
import { TreatmentPlanType } from "@/types/index";
import { treatmentPlanSchema } from "@/schema/treatment-plan.schema";
import RenderCustomError from "@/components/RenderCustomError";
import { createOrEditTreatmentPlan } from "@/actions/single-patient.action";
import { useMutateData } from "@/hooks/useFetch";
import { useQueryClient } from "@tanstack/react-query";
import { ITreatmentPlan } from "@/types/backend";

type EditTreatmentPlanFormProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  patientId: string;
  refetchTreatmentPlans?: () => void;
  treatmentPlan: ITreatmentPlan;
  setTreatmentPlan: React.Dispatch<React.SetStateAction<ITreatmentPlan | null>>;
};

const EditTreatmentPlanForm = ({
  open,
  setOpen,
  patientId,
  refetchTreatmentPlans,
  treatmentPlan,
  setTreatmentPlan,
}: EditTreatmentPlanFormProps) => {
  const queryClient = useQueryClient();
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<TreatmentPlanType>({
    resolver: zodResolver(treatmentPlanSchema),
    defaultValues: {
      name: treatmentPlan?.name,
      startDate: treatmentPlan?.startDate.split("T")[0],
      endDate: treatmentPlan?.endDate.split("T")[0],
      objective: treatmentPlan?.objective,
      medicationName: treatmentPlan?.medicationName,
      followUpSchedule: treatmentPlan?.followUpSchedule,
      notes: treatmentPlan?.notes,
    },
    mode: "all",
  });

  const {
    mutateAsync,
    isPending: pending,
    isError,
    error,
  } = useMutateData({
    mutationFn: async (data: TreatmentPlanType) =>
      createOrEditTreatmentPlan(data, patientId, treatmentPlan?._id),
    config: {
      queryKey: ["patients", "treatment-plans", patientId],
    },
  });

  const handleFormSubmit: SubmitHandler<TreatmentPlanType> = async (data) => {
    await mutateAsync(data, {
      onSuccess: () => {
        setOpen(false);
        toast.success("Treatment plan updated successfully!");
        queryClient.invalidateQueries({
          queryKey: ["patients", "treatment-plans", patientId],
        });
        if (refetchTreatmentPlans) {
          refetchTreatmentPlans();
        }
        reset();
        setTreatmentPlan(null);
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
                Edit Patient Treatment Plan
              </span>
              <DialogClose
                onClick={() => {
                  reset();
                  setTreatmentPlan(null);
                }}
              >
                <X
                  className="border border-red-500 text-red-500 rounded-full"
                  size={25}
                />
              </DialogClose>
            </DialogTitle>

            <DialogDescription className="flex flex-col gap-5 w-full">
              <RenderCustomError isError={isError} error={error} />

              <form
                onSubmit={handleSubmit(handleFormSubmit)}
                className="flex flex-col gap-4 w-full"
                method="POST"
                encType="multipart/form-data"
              >
                <div className="flex flex-col gap-5 px-3 pt-5 pb-10 bg-white h-full">
                  {/* Treatment Plan */}
                  <div className="flex flex-col gap-5 p-4 rounded-md border border-secondary-gray/50 w-full">
                    <FormSectionHeader title="Treatment Plan" />

                    <div className="flex flex-col gap-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full px-2 md:px-5">
                        <CustomInputForm
                          labelName="Plan Name"
                          inputName="name"
                          register={register}
                          errors={errors}
                          inputType="text"
                          placeholderText="eg. Injection Phase 1"
                          value={treatmentPlan?.name}
                        />

                        <CustomInputForm
                          labelName="Medication Name"
                          inputName="medicationName"
                          register={register}
                          errors={errors}
                          inputType="text"
                          placeholderText="eg. Ibuprofen"
                          value={treatmentPlan?.medicationName}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full px-2 md:px-5">
                        <CustomInputForm
                          labelName="Start Date"
                          inputName="startDate"
                          register={register}
                          errors={errors}
                          inputType="date"
                          value={treatmentPlan?.startDate.split("T")[0]}
                        />

                        <CustomInputForm
                          labelName="End Date"
                          inputName="endDate"
                          register={register}
                          errors={errors}
                          inputType="date"
                          value={treatmentPlan?.endDate.split("T")[0]}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full px-2 md:px-5">
                        <CustomInputForm
                          labelName="Objective"
                          inputName="objective"
                          register={register}
                          errors={errors}
                          inputType="text"
                          placeholderText="eg. Regain full mobility in the knee"
                          value={treatmentPlan?.objective}
                        />

                        <CustomInputForm
                          labelName="Follow Up Schedule"
                          inputName="followUpSchedule"
                          register={register}
                          errors={errors}
                          inputType="text"
                          placeholderText="eg. Next week at 2:30pm"
                          value={treatmentPlan?.followUpSchedule}
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
                          value={treatmentPlan?.notes}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit form button */}
                  <EditTreatmentPlanFormButton
                    pending={pending}
                    reset={reset}
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

export default EditTreatmentPlanForm;

// Submit form button
const EditTreatmentPlanFormButton = ({
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
          "Modify"
        )}
      </Button>
    </div>
  );
};
