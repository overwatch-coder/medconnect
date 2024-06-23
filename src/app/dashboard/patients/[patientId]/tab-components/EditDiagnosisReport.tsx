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
import { DiagnosisReportType } from "@/types/index";
import CustomFileUpload from "@/components/CustomFileUpload";
import { diagnosisReportSchema } from "@/schema/diagnosis-report.schema";

type EditDiagnosisReportProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditDiagnosisReportForm = ({
  open,
  setOpen,
}: EditDiagnosisReportProps) => {
  const {
    register,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting: pending },
    handleSubmit,
  } = useForm<Partial<DiagnosisReportType>>({
    resolver: zodResolver(diagnosisReportSchema.partial()),
    mode: "all",
  });

  const handleFormSubmit: SubmitHandler<Partial<DiagnosisReportType>> = async (
    data
  ) => {
    console.log({ data });
    setOpen(false);
    toast.success("Diagnosis Report modified successfully");
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
                Modify Diagnosis Report
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
                          labelName="Report ID"
                          inputName="reportID"
                          register={register}
                          errors={errors}
                          inputType="text"
                          placeholderText="eg. DR13456"
                          value={`DR${Math.floor(Math.random() * 1000)}`}
                        />

                        <CustomInputForm
                          labelName="Doctor Name"
                          inputName="doctorName"
                          register={register}
                          errors={errors}
                          inputType="text"
                          placeholderText="eg. TP1"
                          value={
                            ["Dr. John Doe", "Dr. Jane Doe", "Dr. Bob Doe"][
                              Math.floor(Math.random() * 2)
                            ]
                          }
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full px-2 md:px-5">
                        <CustomInputForm
                          labelName="Date of Diagnosis"
                          inputName="diagnosisDate"
                          register={register}
                          errors={errors}
                          inputType="date"
                          value={new Date().toISOString().split("T")[0]}
                        />

                        <CustomInputForm
                          labelName="Follow Up Date"
                          inputName="followUpDate"
                          register={register}
                          errors={errors}
                          inputType="date"
                          value={new Date().toISOString().split("T")[0]}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full px-2 md:px-5">
                        <CustomInputForm
                          labelName="Symptoms"
                          inputName="symptoms"
                          register={register}
                          errors={errors}
                          inputType="text"
                          placeholderText="eg. Fever, Cough, Headache"
                          value={"Fever, Cough, Headache"}
                        />

                        <CustomInputForm
                          labelName="Recommended Test"
                          inputName="recommendedTests"
                          register={register}
                          errors={errors}
                          inputType="text"
                          placeholderText="eg. Blood Test"
                          value={"None"}
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
                          value={
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas pharetra erat vel tellus tristique rutrum. Integer vulputate efficitur nibh. Morbi iaculis orci id eros fermentum vulputate. Curabitur cursus vel ante sed consectetur. Proin ut varius orci. Phasellus interdum ligula tempus, blandit risus sit amet, dapibus sem."
                          }
                        />
                      </div>
                    </div>
                  </div>

                  {/* Upload Medical History Form */}
                  <CustomFileUpload
                    setValue={setValue}
                    watch={watch}
                    itemName="diagnoisReportAttachments"
                    title="Upload Patient Diagnosis Report"
                    allowMultiple={true}
                  />

                  {/* Submit form button */}
                  <EditDiagnosisReportButton pending={pending} reset={reset} />
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditDiagnosisReportForm;

// Submit form button
const EditDiagnosisReportButton = ({
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
