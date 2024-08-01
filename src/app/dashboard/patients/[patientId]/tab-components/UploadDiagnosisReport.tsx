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
import { diagnosisReportSchema } from "@/schema/diagnosis-report.schema";
import { useQueryClient } from "@tanstack/react-query";
import { useMutateData } from "@/hooks/useFetch";
import { createOrEditDiagnosisReport } from "@/actions/single-patient.action";
import RenderCustomError from "@/components/RenderCustomError";

type UploadDiagnosisReportProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  patientId: string;
  refetchDiagnosisReports?: () => void;
};

const UploadDiagnosisReport = ({
  open,
  setOpen,
  patientId,
  refetchDiagnosisReports,
}: UploadDiagnosisReportProps) => {
  const queryClient = useQueryClient();
  const {
    register,
    reset,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<DiagnosisReportType>({
    resolver: zodResolver(diagnosisReportSchema),
    mode: "all",
  });

  const date = watch("date");
  const doctorName = watch("doctorName");

  const {
    mutateAsync,
    isPending: pending,
    isError,
    error,
  } = useMutateData({
    mutationFn: async (data: DiagnosisReportType) =>
      createOrEditDiagnosisReport(data, patientId, undefined),
    config: {
      queryKey: ["patients", "diagnosis-reports", patientId],
    },
    notificationData: {
      type: "New Diagnosis Report",
      title: "New diagnosis report has been added",
      description: `A new diagnosis report for ${doctorName} has been added successfully and is scheduled for ${new Date(
        date
      ).toLocaleDateString("en-US", {
        dateStyle: "full",
      })}`,
    },
  });

  const handleFormSubmit: SubmitHandler<DiagnosisReportType> = async (data) => {
    await mutateAsync(data, {
      onSuccess: () => {
        setOpen(false);
        toast.success("New report added successfully!");
        queryClient.invalidateQueries({
          queryKey: ["patients", "diagnosis-reports", patientId],
        });
        if (refetchDiagnosisReports) {
          refetchDiagnosisReports();
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
                Upload Patient Diagnosis Report
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
              <RenderCustomError isError={isError} error={error} />

              <form
                onSubmit={handleSubmit(handleFormSubmit)}
                className="flex flex-col gap-4 w-full"
                method="POST"
                encType="multipart/form-data"
              >
                <div className="flex flex-col gap-5 px-3 pt-5 pb-10 bg-white h-full">
                  {/* Diagnosis Report */}
                  <div className="flex flex-col gap-5 p-4 rounded-md border border-secondary-gray/50 w-full">
                    <FormSectionHeader title="Diagnosis Report" />

                    <div className="flex flex-col gap-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full px-2 md:px-5">
                        <CustomInputForm
                          labelName="Doctor Name"
                          inputName="doctorName"
                          register={register}
                          errors={errors}
                          inputType="text"
                          placeholderText="eg. Dr. John Doe"
                        />

                        <CustomInputForm
                          labelName="Recommended Test"
                          inputName="recommendedTest"
                          register={register}
                          errors={errors}
                          inputType="text"
                          placeholderText="eg. Blood Test"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full px-2 md:px-5">
                        <CustomInputForm
                          labelName="Date of Diagnosis"
                          inputName="date"
                          register={register}
                          errors={errors}
                          inputType="date"
                        />

                        <CustomInputForm
                          labelName="Follow Up Date"
                          inputName="followUpDate"
                          register={register}
                          errors={errors}
                          inputType="date"
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
                        />

                        <CustomInputForm
                          labelName="Final Diagnosis"
                          inputName="finalDiagnosis"
                          register={register}
                          errors={errors}
                          inputType="text"
                          placeholderText="eg. Malaria"
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
                  <UploadDiagnosisReportButton
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

export default UploadDiagnosisReport;

// Submit form button
const UploadDiagnosisReportButton = ({
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
