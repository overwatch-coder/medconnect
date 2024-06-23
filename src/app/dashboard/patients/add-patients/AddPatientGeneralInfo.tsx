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
import { FileDrop } from "@instructure/ui-file-drop";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import ClipLoader from "react-spinners/ClipLoader";
import ImagePreview from "@/components/ImagePreview";
import { FormSectionHeader } from "@/app/dashboard/compounds/add-new/AddCompoundForm";
import { patientGeneralInformationSchema } from "@/schema/patient.schema";
import CustomInputForm from "@/components/CustomInputForm";
import AddPatientAdditionalInfo from "@/app/dashboard/patients/add-patients/AddPatientAdditionalInfo";
import { toast } from "react-toastify";
import { PatientGeneralInformationType } from "@/types/index";

type AddPatientGeneralInfoProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddPatientGeneralInfo = ({
  open,
  setOpen,
}: AddPatientGeneralInfoProps) => {
  const [openAddPatientAdditionalInfo, setOpenAddPatientAdditionalInfo] =
    useState(false);

  const {
    register,
    reset,
    formState: { errors, isSubmitting: pending },
    setValue,
    watch,
    handleSubmit,
  } = useForm<PatientGeneralInformationType>({
    resolver: zodResolver(patientGeneralInformationSchema),
    mode: "all",
  });

  const profilePicture = watch("profilePicture");

  const handleFormSubmit: SubmitHandler<PatientGeneralInformationType> = async (
    data
  ) => {
    console.log({ data });
    setOpen(false);
    setOpenAddPatientAdditionalInfo(true);
    toast.success("Patient General Information added successfully");
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

            <DialogDescription className="flex flex-col gap-5 w-full">
              <form
                onSubmit={handleSubmit(handleFormSubmit)}
                className="flex flex-col gap-4 w-full"
                method="POST"
                encType="multipart/form-data"
              >
                <div className="flex flex-col gap-5 px-3 pt-5 pb-10 bg-white h-full">
                  {/* General Information */}
                  <div className="flex flex-col gap-5 p-4 rounded-md border border-secondary-gray/50 w-full">
                    <FormSectionHeader title="General Information" />

                    <div className="flex flex-col gap-5 px-2 md:px-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                        <CustomInputForm
                          labelName="First Name"
                          inputName="firstName"
                          register={register}
                          errors={errors}
                          inputType="text"
                          placeholderText="Enter first name"
                        />

                        <CustomInputForm
                          labelName="Last Name"
                          inputName="lastName"
                          register={register}
                          errors={errors}
                          inputType="text"
                          placeholderText="Enter last name"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                        <CustomInputForm
                          labelName="Patient ID"
                          inputName="patientId"
                          register={register}
                          errors={errors}
                          inputType="text"
                          placeholderText="Enter patient ID"
                        />

                        <CustomInputForm
                          labelName="Gender"
                          inputName="gender"
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
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                        <CustomInputForm
                          labelName="National ID"
                          inputName="nationalId"
                          register={register}
                          errors={errors}
                          inputType="text"
                          placeholderText="Enter national ID"
                        />

                        <CustomInputForm
                          labelName="Contact Number"
                          inputName="phoneNumber"
                          register={register}
                          errors={errors}
                          inputType="text"
                          placeholderText="Enter contact number"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                        <CustomInputForm
                          labelName="Email Address"
                          inputName="email"
                          register={register}
                          errors={errors}
                          inputType="text"
                          placeholderText="Enter email address"
                        />

                        <CustomInputForm
                          labelName="Location"
                          inputName="location"
                          register={register}
                          errors={errors}
                          inputType="text"
                          placeholderText="Enter location"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                        <CustomInputForm
                          labelName="Address"
                          inputName="address"
                          register={register}
                          errors={errors}
                          inputType="text"
                          placeholderText="Enter address"
                        />

                        <CustomInputForm
                          labelName="Date of Birth"
                          inputName="dateOfBirth"
                          register={register}
                          errors={errors}
                          inputType="date"
                          placeholderText="eg. 1980-10-25"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                        <CustomInputForm
                          labelName="District"
                          inputName="district"
                          register={register}
                          errors={errors}
                          inputType="text"
                          placeholderText="Enter district"
                        />

                        <CustomInputForm
                          labelName="Marital Status"
                          inputName="maritalStatus"
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

                  {/* Upload Profile Picture */}
                  <div className="flex flex-col gap-5 p-4 rounded-md border border-secondary-gray/50 w-full">
                    <FormSectionHeader title="Upload Profile Picture" />

                    {/* Attachment */}
                    <div className="flex flex-col gap-4 p-2 w-full rounded-md border border-secondary-gray bg-transparent">
                      <FileDrop
                        id="profilePicture"
                        name="profilePicture"
                        onDropAccepted={(file) => {
                          setValue("profilePicture", file);
                        }}
                        shouldEnablePreview={true}
                        shouldAllowMultiple={false}
                        renderLabel={() => (
                          <div className="flex gap-3 p-2 items-center justify-center">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-secondary-gray">
                              <Upload
                                size={30}
                                className="text-secondary-gray/50"
                              />
                            </div>
                            <p className="text-sm text-black font-semibold flex items-center gap-1">
                              Drag and drop files here or{" "}
                              <span className="text-red-500">Browse File</span>
                            </p>
                          </div>
                        )}
                      />

                      {profilePicture && profilePicture.length > 0 && (
                        <div className="flex items-center gap-3 flex-wrap overflow-x-scroll scrollbar-hide">
                          {Array.from(profilePicture).map(
                            (image, idx: number) => (
                              <ImagePreview
                                image={URL.createObjectURL(image as File)}
                                key={idx}
                              />
                            )
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Submit form button */}
                  <AddPatientGeneralInfoButton
                    pending={pending}
                    reset={reset}
                  />
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <AddPatientAdditionalInfo
        open={openAddPatientAdditionalInfo}
        setOpen={setOpenAddPatientAdditionalInfo}
      />
    </>
  );
};

export default AddPatientGeneralInfo;

// Submit form button
const AddPatientGeneralInfoButton = ({
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
          "Next"
        )}
      </Button>
    </div>
  );
};
