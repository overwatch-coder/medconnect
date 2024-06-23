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

type AddPrescriptionProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddPrescription = ({ open, setOpen }: AddPrescriptionProps) => {
  const {
    register,
    reset,
    formState: { errors, isSubmitting: pending },
    handleSubmit,
  } = useForm<PrescriptionType>({
    resolver: zodResolver(prescriptionSchema),
    mode: "all",
  });

  const handleFormSubmit: SubmitHandler<PrescriptionType> = async (data) => {
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
                <div className="flex flex-col gap-5 px-3 pt-5 pb-10 bg-white h-full">
                  {/* Medical History */}
                  <div className="flex flex-col gap-5 p-4 rounded-md border border-secondary-gray/50 w-full">
                    <FormSectionHeader title="Medical History" />

                    <div className="flex flex-col gap-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full px-2 md:px-5">
                        <CustomInputForm
                          labelName="Prescription ID"
                          inputName="prescriptionID"
                          register={register}
                          errors={errors}
                          inputType="text"
                          placeholderText="eg. RX12345"
                        />

                        <CustomInputForm
                          labelName="Health Official Name"
                          inputName="healthOfficialName"
                          register={register}
                          errors={errors}
                          inputType="text"
                          placeholderText="eg. Dr. John Doe"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full px-2 md:px-5">
                        <CustomInputForm
                          labelName="Date"
                          inputName="date"
                          register={register}
                          errors={errors}
                          inputType="date"
                        />

                        <CustomInputForm
                          labelName="Prescription For"
                          inputName="prescriptionFor"
                          register={register}
                          errors={errors}
                          inputType="text"
                          placeholderText="eg. Malaria"
                        />
                      </div>

                      <h2 className="text-primary-gray text-sm font-medium">
                        Medication
                      </h2>

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
                          labelName="Frequency (Daily)"
                          inputName="frequency"
                          register={register}
                          errors={errors}
                          inputType="text"
                          placeholderText="eg. 3"
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
                          inputType="text"
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
