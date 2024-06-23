"use client";

import React, { useState } from "react";
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
import { patientAdditionalInformationSchema } from "@/schema/patient.schema";
import CustomInputForm from "@/components/CustomInputForm";
import { toast } from "react-toastify";
import AddPatientEmergencyContact from "@/app/dashboard/patients/add-patients/AddPatientEmergencyContact";
import { PatientAdditionalInformationType } from "@/types/index";

type AddPatientAdditionalInfoProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddPatientAdditionalInfo = ({
  open,
  setOpen,
}: AddPatientAdditionalInfoProps) => {
  const [openEmergencyContact, setOpenEmergencyContact] = useState(false);

  const {
    register,
    reset,
    formState: { errors, isSubmitting: pending },
    handleSubmit,
  } = useForm<PatientAdditionalInformationType>({
    resolver: zodResolver(patientAdditionalInformationSchema.optional()),
    mode: "all",
  });

  const handleFormSubmit: SubmitHandler<
    PatientAdditionalInformationType
  > = async (data) => {
    console.log({ data });
    setOpen(false);
    toast.success("Additional Information added successfully");
    setOpenEmergencyContact(true);
    reset();
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          id="hide"
          className="flex flex-col gap-4 w-full max-w-[90vw] md:max-w-[35vw] max-h-[95vh] h-full overflow-hidden"
        >
          <DialogHeader className="overflow-y-scroll scrollbar-hide">
            <DialogTitle className="flex items-center justify-between">
              <span className="text-xl md:text-2xl text-secondary-gray font-bold">
                Add Patient
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
                  {/* Additional Information */}
                  <div className="flex flex-col gap-5 p-4 rounded-md border border-secondary-gray/50 w-full">
                    <FormSectionHeader title="Additional Information" />

                    <div className="flex flex-col gap-5 px-2 md:px-5">
                      <div className="grid grid-cols-1 gap-5 w-full">
                        <CustomInputForm
                          labelName="Allergies"
                          inputName="allergies"
                          register={register}
                          errors={errors}
                          inputType="text"
                          placeholderText="Enter allergies"
                        />

                        <CustomInputForm
                          labelName="Known Conditions"
                          inputName="knownConditions"
                          register={register}
                          errors={errors}
                          inputType="text"
                          placeholderText="Enter known conditions"
                        />
                      </div>

                      <div className="grid grid-cols-1 gap-5 w-full">
                        <CustomInputForm
                          labelName="Primary Care Physician"
                          inputName="primaryCarePhysician"
                          register={register}
                          errors={errors}
                          inputType="text"
                          placeholderText="Enter primary care physician"
                        />

                        <CustomInputForm
                          labelName="Insurance Provider"
                          inputName="insuranceProvider"
                          register={register}
                          errors={errors}
                          inputType="text"
                          placeholderText="Enter insurance provider"
                        />
                      </div>

                      <div className="grid grid-cols-1 gap-5 w-full">
                        <CustomInputForm
                          labelName="Insurance Policy Number"
                          inputName="insurancePolicyNumber"
                          register={register}
                          errors={errors}
                          inputType="text"
                          placeholderText="Enter insurance policy number"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit form button */}
                  <AddPatientAdditionalInfoButton
                    pending={pending}
                    reset={reset}
                  />
                </div>
              </form>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <AddPatientEmergencyContact
        open={openEmergencyContact}
        setOpen={setOpenEmergencyContact}
      />
    </>
  );
};

export default AddPatientAdditionalInfo;

const AddPatientAdditionalInfoButton = ({
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
          "Next"
        )}
      </Button>
    </div>
  );
};
