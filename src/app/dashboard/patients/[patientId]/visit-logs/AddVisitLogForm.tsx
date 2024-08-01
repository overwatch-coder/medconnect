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
import CustomInputForm from "@/components/CustomInputForm";
import { toast } from "react-toastify";
import { VisitLogsType } from "@/types/index";
import { visitLogsSchema } from "@/schema/visit-logs.schema";
import { Patient } from "@/types/backend";
import { useQueryClient } from "@tanstack/react-query";
import { useMutateData } from "@/hooks/useFetch";
import { createOrEditVisitLog } from "@/actions/single-patient.action";
import RenderCustomError from "@/components/RenderCustomError";

type AddVisitLogFormProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  patient: Patient;
  refetchLogs?: () => void;
};

const AddVisitLogForm = ({
  open,
  setOpen,
  patient,
  refetchLogs,
}: AddVisitLogFormProps) => {
  const queryClient = useQueryClient();
  const {
    register,
    reset,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<VisitLogsType>({
    resolver: zodResolver(visitLogsSchema),
    mode: "all",
  });

  const date = watch("date");
  const purpose = watch("purpose");

  const {
    mutateAsync,
    isPending: pending,
    isError,
    error,
  } = useMutateData({
    mutationFn: async (data: VisitLogsType) =>
      createOrEditVisitLog(data, patient._id, undefined),
    config: {
      queryKey: ["patients", "visit-logs", patient._id],
    },
    notificationData: {
      type: "New Visit Log",
      title: "New visit log has been added",
      description: `A new entry has been added to the visit log for ${purpose} on ${new Date(
        date
      ).toLocaleDateString("en-US", {
        dateStyle: "full",
      })}`,
    },
  });

  const handleFormSubmit: SubmitHandler<VisitLogsType> = async (data) => {
    await mutateAsync(data, {
      onSuccess: () => {
        setOpen(false);
        toast.success("Added new visitor to the logs successfully!");
        queryClient.invalidateQueries({
          queryKey: ["patients", "visit-logs", patient._id],
        });
        if (refetchLogs) {
          refetchLogs();
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
          className="flex flex-col gap-4 w-full max-w-[90vw] md:max-w-[40vw] max-h-[95vh] h-full overflow-hidden"
        >
          <DialogHeader className="overflow-y-scroll scrollbar-hide">
            <DialogTitle className="flex items-center justify-between">
              <span className="text-xl md:text-2xl text-secondary-gray font-bold">
                Add Visit Log
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
              <RenderCustomError isError={isError} error={error} />

              <form
                onSubmit={handleSubmit(handleFormSubmit)}
                className="flex flex-col gap-4 w-full"
                method="POST"
              >
                <div className="flex flex-col gap-5 px-3 pt-5 pb-10 bg-white h-full">
                  {/* Patient visiting log */}
                  <div className="flex flex-col gap-5 p-4 rounded-md border border-secondary-gray/50 w-full">
                    <FormSectionHeader title="Patient visiting log" />

                    <div className="flex flex-col gap-5 px-2 md:px-5">
                      <div className="grid grid-cols-1 gap-5 w-full">
                        <CustomInputForm
                          labelName="Date and Time of Visit"
                          inputName="date"
                          register={register}
                          errors={errors}
                          inputType="datetime-local"
                        />
                      </div>

                      <div className="grid grid-cols-1 gap-5 w-full">
                        <CustomInputForm
                          labelName="Purpose of Visit"
                          inputName="purpose"
                          register={register}
                          errors={errors}
                          inputType="text"
                          placeholderText="Enter purpose of visit"
                        />
                      </div>

                      <div className="grid grid-cols-1 gap-5 w-full">
                        <CustomInputForm
                          labelName="Attending Health Officials"
                          inputName="official"
                          register={register}
                          errors={errors}
                          inputType="text"
                          placeholderText="Enter attending health officials"
                        />
                      </div>

                      <div className="grid grid-cols-1 gap-5 w-full">
                        <CustomInputForm
                          labelName="Notes"
                          inputName="notes"
                          register={register}
                          errors={errors}
                          inputType="text"
                          placeholderText="Enter notes"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit form button */}
                  <AddVisitLogFormButton pending={pending} reset={reset} />
                </div>
              </form>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddVisitLogForm;

const AddVisitLogFormButton = ({
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
          "Add Log"
        )}
      </Button>
    </div>
  );
};
