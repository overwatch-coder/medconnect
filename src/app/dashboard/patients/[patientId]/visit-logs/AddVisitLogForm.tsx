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

type AddVisitLogFormProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddVisitLogForm = ({ open, setOpen }: AddVisitLogFormProps) => {
  const {
    register,
    reset,
    formState: { errors, isSubmitting: pending },
    handleSubmit,
  } = useForm<VisitLogsType>({
    resolver: zodResolver(visitLogsSchema),
    mode: "all",
  });

  const handleFormSubmit: SubmitHandler<VisitLogsType> = async (data) => {
    console.log({ data });
    setOpen(false);
    toast.success("Visit Log added successfully");
    reset();
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
                          labelName="Log ID"
                          inputName="logID"
                          register={register}
                          errors={errors}
                          inputType="text"
                          placeholderText="Enter log ID"
                        />

                        <CustomInputForm
                          labelName="Date of Visit"
                          inputName="visitDate"
                          register={register}
                          errors={errors}
                          inputType="date"
                        />
                      </div>

                      <div className="grid grid-cols-1 gap-5 w-full">
                        <CustomInputForm
                          labelName="Time of Visit"
                          inputName="visitTime"
                          register={register}
                          errors={errors}
                          inputType="time"
                        />

                        <CustomInputForm
                          labelName="Purpose of Visit"
                          inputName="visitPurpose"
                          register={register}
                          errors={errors}
                          inputType="text"
                          placeholderText="Enter purpose of visit"
                        />
                      </div>

                      <div className="grid grid-cols-1 gap-5 w-full">
                        <CustomInputForm
                          labelName="Attending Health Officials"
                          inputName="attendingHO"
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
