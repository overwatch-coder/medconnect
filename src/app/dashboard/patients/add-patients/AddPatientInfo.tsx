"use client";

import React, { useState } from "react";
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
import { patientSchema } from "@/schema/patient.schema";
import CustomInputForm from "@/components/CustomInputForm";
import { toast } from "react-toastify";
import { PatientType } from "@/types/index";
import { useQueryClient } from "@tanstack/react-query";
import { createOrEditPatient } from "@/actions/patients.action";
import { useMutateData } from "@/hooks/useFetch";
import RenderCustomError from "@/components/RenderCustomError";
import { Patient } from "@/types/backend";

type AddPatientInfoProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddPatientInfo = ({ open, setOpen }: AddPatientInfoProps) => {
  const [step, setStep] = useState(1);
  const queryClient = useQueryClient();

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
    trigger,
  } = useForm<PatientType>({
    resolver: zodResolver(patientSchema),
    mode: "all",
  });

  const handleNextStep = async () => {
    const valid = await trigger(
      step === 1 ? "general" : step === 2 ? "additional" : "emergency"
    );
    if (valid) {
      if (step !== 3) {
        setStep(step + 1);
      }
    }
  };

  const handleBackStep = async () => {
    setStep(step - 1);
  };

  const {
    mutateAsync,
    isPending: pending,
    error,
    isError,
  } = useMutateData<PatientType, Patient>({
    mutationFn: async (data) => createOrEditPatient(data),
    config: {
      queryKey: ["patients"],
      reset: reset,
    },
  });

  const handleFormSubmit: SubmitHandler<PatientType> = async (data) => {
    if (step !== 3) {
      setStep((prev) => prev + 1);
    } else {
      await mutateAsync(data, {
        onSuccess: (result) => {
          setOpen(false);

          console.log({ result });

          toast.success("Patient Information added successfully");

          reset();

          setStep(1);

          queryClient.invalidateQueries({ queryKey: ["patients"] });
        },
        onError: (error) => {
          // toast.error(error?.message);
          console.log({ error, in: "on error - add patient info" });
          setOpen(true);
        },
      });
    }
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
                Add Patient
              </span>
              <DialogClose
                onClick={() => {
                  reset();
                  setStep(1);
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
                  {/* General Information */}
                  {step === 1 && (
                    <div className="flex flex-col gap-5 p-4 rounded-md border border-secondary-gray/50 w-full">
                      <FormSectionHeader title="General Information" />

                      <div className="flex flex-col gap-5 px-2 md:px-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                          <CustomInputForm
                            labelName="First Name"
                            inputName="general.firstName"
                            register={register}
                            errors={errors}
                            inputType="text"
                            placeholderText="Enter first name"
                          />

                          <CustomInputForm
                            labelName="Last Name"
                            inputName="general.lastName"
                            register={register}
                            errors={errors}
                            inputType="text"
                            placeholderText="Enter last name"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                          <CustomInputForm
                            labelName="Gender"
                            inputName="general.gender"
                            register={register}
                            errors={errors}
                            inputType="select"
                            selectOptions={[
                              { value: "Male", label: "Male" },
                              { value: "Female", label: "Female" },
                              { value: "Other", label: "Other" },
                            ]}
                            placeholderText="Enter gender"
                          />

                          <CustomInputForm
                            labelName="Date of Birth"
                            inputName="general.dateOfBirth"
                            register={register}
                            errors={errors}
                            inputType="date"
                            placeholderText="Enter date of birth"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                          <CustomInputForm
                            labelName="Contact Number"
                            inputName="general.contact"
                            register={register}
                            errors={errors}
                            inputType="text"
                            placeholderText="Enter contact number"
                          />

                          <CustomInputForm
                            labelName="Email Address"
                            inputName="general.email"
                            register={register}
                            errors={errors}
                            inputType="text"
                            placeholderText="Enter email address"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                          <CustomInputForm
                            labelName="Location"
                            inputName="general.location"
                            register={register}
                            errors={errors}
                            inputType="text"
                            placeholderText="Enter location"
                          />

                          <CustomInputForm
                            labelName="District"
                            inputName="general.district"
                            register={register}
                            errors={errors}
                            inputType="text"
                            placeholderText="Enter district"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                          <CustomInputForm
                            labelName="National ID"
                            inputName="general.nationalId"
                            register={register}
                            errors={errors}
                            inputType="text"
                            placeholderText="Enter national ID"
                          />

                          <CustomInputForm
                            labelName="Marital Status"
                            inputName="general.maritalStatus"
                            register={register}
                            errors={errors}
                            inputType="select"
                            selectOptions={[
                              { value: "Married", label: "Married" },
                              { value: "Single", label: "Single" },
                              { value: "Divorced", label: "Divorced" },
                              { value: "Widowed", label: "Widowed" },
                              { value: "Other", label: "Other" },
                            ]}
                            placeholderText="Enter marital status"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Additional Information */}
                  {step === 2 && (
                    <div className="flex flex-col gap-5 p-4 rounded-md border border-secondary-gray/50 w-full">
                      <FormSectionHeader title="Additional Information" />

                      <div className="flex flex-col gap-5 px-2 md:px-5">
                        <div className="grid grid-cols-1 gap-5 w-full">
                          <CustomInputForm
                            labelName="Bloog Group"
                            inputName="additional.bloodGroup"
                            register={register}
                            errors={errors}
                            inputType="text"
                            placeholderText="eg. B+"
                          />

                          <CustomInputForm
                            labelName="Allergies"
                            inputName="additional.allergies"
                            register={register}
                            errors={errors}
                            inputType="text"
                            placeholderText="Enter allergies"
                          />

                          <CustomInputForm
                            labelName="Known Conditions"
                            inputName="additional.knownCondition"
                            register={register}
                            errors={errors}
                            inputType="text"
                            placeholderText="Enter known conditions"
                          />
                        </div>

                        <div className="grid grid-cols-1 gap-5 w-full">
                          <CustomInputForm
                            labelName="Primary Care Physician"
                            inputName="additional.primaryPhysician"
                            register={register}
                            errors={errors}
                            inputType="text"
                            placeholderText="Enter primary care physician"
                          />

                          <CustomInputForm
                            labelName="Insurance Provider"
                            inputName="additional.insuranceProvider"
                            register={register}
                            errors={errors}
                            inputType="text"
                            placeholderText="Enter insurance provider"
                          />
                        </div>

                        <div className="grid grid-cols-1 gap-5 w-full">
                          <CustomInputForm
                            labelName="Insurance Policy Number"
                            inputName="additional.insurancePolicyNumber"
                            register={register}
                            errors={errors}
                            inputType="text"
                            placeholderText="Enter insurance policy number"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Emergency Contact Information */}
                  {step === 3 && (
                    <div className="flex flex-col gap-5 p-4 rounded-md border border-secondary-gray/50 w-full">
                      <FormSectionHeader title="Emergency Contact Information" />

                      <div className="flex flex-col gap-5">
                        <h2 className="text-black font-normal text-start text-base -mb-3">
                          Contact Person 1
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full px-2 md:px-5">
                          <CustomInputForm
                            labelName="Contact Name"
                            inputName="emergency.emergencyContactNameOne"
                            register={register}
                            errors={errors}
                            inputType="text"
                            placeholderText="Enter contact name"
                          />

                          <CustomInputForm
                            labelName="Contact Relationship"
                            inputName="emergency.emergencyContactRelationshipOne"
                            register={register}
                            errors={errors}
                            inputType="text"
                            placeholderText="Enter contact relationship"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full px-2 md:px-5">
                          <CustomInputForm
                            labelName="Contact Address"
                            inputName="emergency.emergencyContactAddressOne"
                            register={register}
                            errors={errors}
                            inputType="text"
                            placeholderText="Enter contact address"
                          />

                          <CustomInputForm
                            labelName="Contact Phone Number"
                            inputName="emergency.emergencyContactPhoneNumberOne"
                            register={register}
                            errors={errors}
                            inputType="text"
                            placeholderText="Enter contact phone number"
                          />
                        </div>

                        <h2 className="text-black font-normal text-start text-base -mb-3">
                          Contact Person 2
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full px-2 md:px-5">
                          <CustomInputForm
                            labelName="Contact Name"
                            inputName="emergency.emergencyContactNameTwo"
                            register={register}
                            errors={errors}
                            inputType="text"
                            placeholderText="Enter contact name"
                          />

                          <CustomInputForm
                            labelName="Contact Relationship"
                            inputName="emergency.emergencyContactRelationshipTwo"
                            register={register}
                            errors={errors}
                            inputType="text"
                            placeholderText="Enter contact relationship"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full px-2 md:px-5">
                          <CustomInputForm
                            labelName="Contact Address"
                            inputName="emergency.emergencyContactAddressTwo"
                            register={register}
                            errors={errors}
                            inputType="text"
                            placeholderText="Enter contact address"
                          />

                          <CustomInputForm
                            labelName="Contact Phone Number"
                            inputName="emergency.emergencyContactPhoneNumberTwo"
                            register={register}
                            errors={errors}
                            inputType="text"
                            placeholderText="Enter contact phone number"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Submit form button */}
                  <SubmtitFormButton
                    pending={pending}
                    reset={reset}
                    handleNextStep={handleNextStep}
                    handleBackStep={handleBackStep}
                    step={step}
                    setOpen={setOpen}
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

export default AddPatientInfo;

type SubmtitFormButtonProps = {
  pending: boolean;
  reset: () => void;
  handleNextStep: () => void;
  handleBackStep: () => void;
  step: number;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

// Submit form button
const SubmtitFormButton = ({
  pending,
  reset,
  handleNextStep,
  handleBackStep,
  step,
  setOpen,
}: SubmtitFormButtonProps) => {
  return (
    <div className="flex gap-5 flex-row items-center justify-end w-1/2 ms-auto">
      <Button
        type="button"
        disabled={pending}
        onClick={() => {
          if (step !== 1) {
            handleBackStep();
          } else {
            reset();
            setOpen(false);
          }
        }}
        className="text-center text-primary-gray rounded-none border border-primary-gray/50 bg-transparent hover:bg-transparent w-full"
      >
        {step === 1 ? "Cancel" : "Back"}
      </Button>

      <Button
        onClick={handleNextStep}
        disabled={pending}
        className="text-white text-center bg-primary-green hover:bg-primary-green rounded-none w-full"
        type={step === 3 ? "submit" : "button"}
      >
        {pending ? (
          <ClipLoader size={28} loading={pending} color="white" />
        ) : step === 3 ? (
          "Add Patient"
        ) : (
          "Next"
        )}
      </Button>
    </div>
  );
};
