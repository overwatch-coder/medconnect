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
import { MedicalHistoryType } from "@/types/index";
import CustomFileUpload from "@/components/CustomFileUpload";
import { medicalHistorySchema } from "@/schema/medical-history.schema";

type EditMedicalHistoryFormProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditMedicalHistoryForm = ({
  open,
  setOpen,
}: EditMedicalHistoryFormProps) => {
  const {
    register,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting: pending },
    handleSubmit,
  } = useForm<Partial<MedicalHistoryType>>({
    resolver: zodResolver(medicalHistorySchema.partial()),
    mode: "all",
  });

  const handleFormSubmit: SubmitHandler<Partial<MedicalHistoryType>> = async (
    data
  ) => {
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
                Modify Medical History
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
                  {/* Medical History */}
                  <div className="flex flex-col gap-5 p-4 rounded-md border border-secondary-gray/50 w-full">
                    <FormSectionHeader title="Medical History" />

                    <div className="flex flex-col gap-5">
                      <h2 className="text-primary-gray text-sm font-medium">
                        Problem Details
                      </h2>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full px-2 md:px-5">
                        <CustomInputForm
                          labelName="Problem Start Date"
                          inputName="problemStartDate"
                          register={register}
                          errors={errors}
                          inputType="date"
                          value={new Date().toISOString().split("T")[0]}
                          placeholderText="eg. 1980-10-25"
                        />

                        <CustomInputForm
                          labelName="Problem Description"
                          inputName="problemDescription"
                          register={register}
                          errors={errors}
                          inputType="text"
                          value="Problem with the heart"
                          placeholderText="Enter problem description"
                        />
                      </div>

                      <h2 className="text-primary-gray text-sm font-medium">
                        Past Medical History
                      </h2>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full px-2 md:px-5">
                        <CustomInputForm
                          labelName="Breathing Problems"
                          inputName="breathingProblems"
                          register={register}
                          errors={errors}
                          inputType="select"
                          selectOptions={[
                            { value: "Yes", label: "Yes" },
                            { value: "No", label: "No" },
                          ]}
                          value="yes"
                        />

                        <CustomInputForm
                          labelName="Current Wound/Skin Problems"
                          inputName="currentWoundOrSkinProblems"
                          register={register}
                          errors={errors}
                          inputType="select"
                          selectOptions={[
                            { value: "Yes", label: "Yes" },
                            { value: "No", label: "No" },
                          ]}
                          value="yes"
                        />
                      </div>

                      <h2 className="text-primary-gray text-sm font-medium">
                        Surgeries and hospitalization
                      </h2>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full px-2 md:px-5">
                        <CustomInputForm
                          labelName="Year"
                          inputName="surgeryYear"
                          register={register}
                          errors={errors}
                          inputType="text"
                          placeholderText="eg. 2024"
                          value="2023"
                        />

                        <CustomInputForm
                          labelName="Complications"
                          inputName="complications"
                          register={register}
                          errors={errors}
                          inputType="select"
                          selectOptions={[
                            { value: "True", label: "True" },
                            { value: "False", label: "False" },
                          ]}
                          value="true"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Upload Medical History Form */}
                  <CustomFileUpload
                    setValue={setValue}
                    watch={watch}
                    itemName="medicalHistoryAttachment"
                    title="Upload medical history form"
                    allowMultiple={true}
                  />

                  {/* Submit form button */}
                  <EditMedicalHistoryFormButton
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

export default EditMedicalHistoryForm;

// Submit form button
const EditMedicalHistoryFormButton = ({
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
