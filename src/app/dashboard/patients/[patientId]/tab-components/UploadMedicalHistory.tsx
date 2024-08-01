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
import { useMutateData } from "@/hooks/useFetch";
import { createOrEditMedicalHistory } from "@/actions/single-patient.action";
import { useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/utils";
import { useAuth } from "@/hooks";
import RenderCustomError from "@/components/RenderCustomError";

type UploadMedicalHistoryProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  patientId: string;
  refetchMedicalHistory: () => void;
};

const UploadMedicalHistory = ({
  open,
  setOpen,
  patientId,
  refetchMedicalHistory,
}: UploadMedicalHistoryProps) => {
  const [user] = useAuth();
  const queryClient = useQueryClient();

  const {
    register,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting: pending },
    handleSubmit,
  } = useForm<MedicalHistoryType>({
    resolver: zodResolver(medicalHistorySchema),
    mode: "all",
  });

  const {
    mutateAsync,
    // isPending: pending,
    isError,
    error,
  } = useMutateData({
    mutationFn: async (data: MedicalHistoryType) =>
      createOrEditMedicalHistory(data, patientId, undefined),
    config: {
      queryKey: ["patients", "medical-history", patientId],
    },
    notificationData: {
      type: "New Medical History",
      title: "New medical history has been added",
      description: `A new medical history has been added successfully`,
    },
  });

  const handleFormSubmit: SubmitHandler<MedicalHistoryType> = async (data) => {
    if (!data.formUrl?.length) {
      toast.info("Please upload a file");
      return;
    }

    const formData = new FormData();
    formData.append("image", data.formUrl[0]);

    const res = await axiosInstance.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${user?.auth.token}`,
      },
    });

    const resData = await res.data;

    const fileUrl = resData?.fileUrl
      ? (resData?.fileUrl as string)
      : "https://d140uiq1keqywy.cloudfront.net/7916dd5f895d05c14a41e04727da4332-images.png";

    // console.log({ data, in: "UploadMedicalHistory handleFormSubmit" });

    await mutateAsync(
      { ...data, formUrl: fileUrl },
      {
        onSuccess: () => {
          setOpen(false);
          toast.success("New medical history added successfully");
          queryClient.invalidateQueries({
            queryKey: ["patients", "medical-history", patientId],
          });
          if (refetchMedicalHistory) {
            refetchMedicalHistory();
          }
          reset();
        },
      }
    );
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
                Upload Medical History
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

            <DialogDescription></DialogDescription>
            <div className="flex flex-col gap-5 w-full">
              <RenderCustomError isError={isError} error={error} />

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
                          inputName="date"
                          register={register}
                          errors={errors}
                          inputType="date"
                          placeholderText="eg. 1980-10-25"
                        />

                        <CustomInputForm
                          labelName="Problem Description"
                          inputName="description"
                          register={register}
                          errors={errors}
                          inputType="text"
                          placeholderText="Enter problem description"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full px-2 md:px-5">
                        <CustomInputForm
                          labelName="Cause of current problem"
                          inputName="cause"
                          register={register}
                          errors={errors}
                          inputType="text"
                          placeholderText="eg. unprotected sex"
                        />

                        <CustomInputForm
                          labelName="Surgery Requirement"
                          inputName="wasSurgeryRequired"
                          register={register}
                          errors={errors}
                          inputType="select"
                          selectOptions={[
                            { value: "true", label: "Yes" },
                            { value: "false", label: "No" },
                          ]}
                        />
                      </div>

                      <h2 className="text-primary-gray text-sm font-medium">
                        Past Medical History
                      </h2>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full px-2 md:px-5">
                        <CustomInputForm
                          labelName="Breathing Problems"
                          inputName="hasBreathingProblem"
                          register={register}
                          errors={errors}
                          inputType="select"
                          selectOptions={[
                            { value: "true", label: "Yes" },
                            { value: "false", label: "No" },
                          ]}
                        />

                        <CustomInputForm
                          labelName="Current Wound/Skin Problems"
                          inputName="hasSkinProblem"
                          register={register}
                          errors={errors}
                          inputType="select"
                          selectOptions={[
                            { value: "true", label: "Yes" },
                            { value: "false", label: "No" },
                          ]}
                        />
                      </div>

                      <h2 className="text-primary-gray text-sm font-medium">
                        Surgeries and hospitalization
                      </h2>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full px-2 md:px-5">
                        <CustomInputForm
                          labelName="Surgery or Hospitalization Date"
                          inputName="hospitalizationDate"
                          register={register}
                          errors={errors}
                          inputType="date"
                        />

                        <CustomInputForm
                          labelName="Complications"
                          inputName="hadSurgeryComplication"
                          register={register}
                          errors={errors}
                          inputType="select"
                          selectOptions={[
                            { value: "true", label: "True" },
                            { value: "false", label: "False" },
                          ]}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Upload Medical History Form */}
                  <CustomFileUpload
                    setValue={setValue}
                    watch={watch}
                    itemName="formUrl"
                    title="Upload medical history form (required)"
                    allowMultiple={false}
                  />

                  {/* Submit form button */}
                  <UploadMedicalHistoryButton pending={pending} reset={reset} />
                </div>
              </form>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UploadMedicalHistory;

// Submit form button
const UploadMedicalHistoryButton = ({
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
