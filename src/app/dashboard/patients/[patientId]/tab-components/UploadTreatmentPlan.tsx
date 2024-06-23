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
import CustomFileUpload from "@/components/CustomFileUpload";
import { treatmentPlanSchema } from "@/schema/treatment-plan.schema";

type UploadTreatmentPlanProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const UploadTreatmentPlan = ({ open, setOpen }: UploadTreatmentPlanProps) => {
  const {
    register,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting: pending },
    handleSubmit,
  } = useForm<TreatmentPlanType>({
    resolver: zodResolver(treatmentPlanSchema),
    mode: "all",
  });

  const handleFormSubmit: SubmitHandler<TreatmentPlanType> = async (data) => {
    console.log({ data });
    setOpen(false);
    toast.success("Medical History added successfully");
    reset();
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
                Upload Patient Treatment Plan
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
                encType="multipart/form-data"
              >
                <div className="flex flex-col gap-5 px-3 pt-5 pb-10 bg-white h-full">
                  {/* Treatment Plan */}
                  <div className="flex flex-col gap-5 p-4 rounded-md border border-secondary-gray/50 w-full">
                    <FormSectionHeader title="Treatment Plan" />

                    <div className="flex flex-col gap-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full px-2 md:px-5">
                        <CustomInputForm
                          labelName="Treatment Plan Number"
                          inputName="treatmentPlanNumber"
                          register={register}
                          errors={errors}
                          inputType="text"
                          placeholderText="eg. TP1345"
                        />

                        <CustomInputForm
                          labelName="Plan Name"
                          inputName="planName"
                          register={register}
                          errors={errors}
                          inputType="text"
                          placeholderText="eg. TP1"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full px-2 md:px-5">
                        <CustomInputForm
                          labelName="Start Date"
                          inputName="startDate"
                          register={register}
                          errors={errors}
                          inputType="date"
                        />

                        <CustomInputForm
                          labelName="End Date"
                          inputName="endDate"
                          register={register}
                          errors={errors}
                          inputType="date"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full px-2 md:px-5">
                        <CustomInputForm
                          labelName="Objectives"
                          inputName="objectives"
                          register={register}
                          errors={errors}
                          inputType="text"
                          placeholderText="eg. Regain full mobility in the knee"
                        />

                        <CustomInputForm
                          labelName="Medication Name"
                          inputName="medicationName"
                          register={register}
                          errors={errors}
                          inputType="text"
                          placeholderText="eg. Ibuprofen"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full px-2 md:px-5">
                        <CustomInputForm
                          labelName="Follow Up Schedule"
                          inputName="followUpSchedule"
                          register={register}
                          errors={errors}
                          inputType="text"
                          placeholderText="eg. 2024-07-19 at 10:00 AM"
                        />
                      </div>

                      <div className="grid grid-cols-1 gap-5 w-full px-2 md:px-5">
                        <CustomInputForm
                          labelName="Notes"
                          inputName="notes"
                          register={register}
                          errors={errors}
                          inputType="text"
                          placeholderText="Enter notes here"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Upload Medical History Form */}
                  <CustomFileUpload
                    setValue={setValue}
                    watch={watch}
                    itemName="treatmentPlanAttachment"
                    title="Upload Patient Treatment Form"
                    allowMultiple={true}
                  />

                  {/* Submit form button */}
                  <UploadTreatmentPlanButton pending={pending} reset={reset} />
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UploadTreatmentPlan;

// Submit form button
const UploadTreatmentPlanButton = ({
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
