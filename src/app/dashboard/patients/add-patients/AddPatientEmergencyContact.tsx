"use client";

import React from "react";
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
import { patientEmergencyContactSchema } from "@/schema/patient.schema";
import CustomInputForm from "@/components/CustomInputForm";
import { toast } from "react-toastify";
import { PatientEmergencyContactType } from "@/types/index";

type AddPatientEmergencyContactProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddPatientEmergencyContact = ({
  open,
  setOpen,
}: AddPatientEmergencyContactProps) => {
  const {
    register,
    reset,
    formState: { errors, isSubmitting: pending },
    handleSubmit,
  } = useForm<PatientEmergencyContactType>({
    resolver: zodResolver(patientEmergencyContactSchema),
    mode: "all",
  });

  const handleFormSubmit: SubmitHandler<PatientEmergencyContactType> = async (
    data
  ) => {
    console.log({ data });
    setOpen(false);
    toast.success("Emergency Contact added successfully");
    reset();
  };

  return (
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

                  <div className="flex flex-col gap-5">
                    <h2 className="text-black font-normal text-base -mb-3">
                      Contact Person 1
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full px-2 md:px-5">
                      <CustomInputForm
                        labelName="Contact Name"
                        inputName="emergencyContactNameOne"
                        register={register}
                        errors={errors}
                        inputType="text"
                        placeholderText="Enter contact name"
                      />

                      <CustomInputForm
                        labelName="Contact Relationship"
                        inputName="emergencyContactRelationshipOne"
                        register={register}
                        errors={errors}
                        inputType="text"
                        placeholderText="Enter contact relationship"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full px-2 md:px-5">
                      <CustomInputForm
                        labelName="Contact Address"
                        inputName="emergencyContactAddressOne"
                        register={register}
                        errors={errors}
                        inputType="text"
                        placeholderText="Enter contact address"
                      />

                      <CustomInputForm
                        labelName="Contact Phone Number"
                        inputName="emergencyContactPhoneNumberOne"
                        register={register}
                        errors={errors}
                        inputType="text"
                        placeholderText="Enter contact phone number"
                      />
                    </div>

                    <h2 className="text-black font-normal text-base -mb-3">
                      Contact Person 2
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full px-2 md:px-5">
                      <CustomInputForm
                        labelName="Contact Name"
                        inputName="emergencyContactNameTwo"
                        register={register}
                        errors={errors}
                        inputType="text"
                        placeholderText="Enter contact name"
                      />

                      <CustomInputForm
                        labelName="Contact Relationship"
                        inputName="emergencyContactRelationshipTwo"
                        register={register}
                        errors={errors}
                        inputType="text"
                        placeholderText="Enter contact relationship"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full px-2 md:px-5">
                      <CustomInputForm
                        labelName="Contact Address"
                        inputName="emergencyContactAddressTwo"
                        register={register}
                        errors={errors}
                        inputType="text"
                        placeholderText="Enter contact address"
                      />

                      <CustomInputForm
                        labelName="Contact Phone Number"
                        inputName="emergencyContactPhoneNumberTwo"
                        register={register}
                        errors={errors}
                        inputType="text"
                        placeholderText="Enter contact phone number"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit form button */}
                <AddPatientEmergencyContactButton
                  pending={pending}
                  reset={reset}
                />
              </div>
            </form>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddPatientEmergencyContact;

const AddPatientEmergencyContactButton = ({
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
          "Add Patient"
        )}
      </Button>
    </div>
  );
};
