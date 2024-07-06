"use client";

import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ClipLoader from "react-spinners/ClipLoader";
import { FormSectionHeader } from "@/app/dashboard/compounds/add-new/AddCompoundForm";
import CustomInputForm from "@/components/CustomInputForm";
import { toast } from "react-toastify";
import { OutreachProgramType } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { programSchema } from "@/schema/outreach-programs.schema";
import { TbEdit } from "react-icons/tb";

type EditProgramProps = {
  program: OutreachProgramType;
};

const EditProgram = ({ program }: EditProgramProps) => {
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<Partial<OutreachProgramType>>({
    resolver: zodResolver(programSchema.partial()),
    defaultValues: program,
    mode: "all",
  });

  const { mutateAsync, isPending: pending } = useMutation({
    mutationFn: async (data: Partial<OutreachProgramType>) => {
      console.log({ data });
      return data;
    },

    onSuccess: (data) => {
      toast.success("Outreach Program updated successfully");
      reset();
    },
  });

  const handleFormSubmit: SubmitHandler<Partial<OutreachProgramType>> = async (
    data
  ) => {
    console.log({ data });
    await mutateAsync(data);
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <TbEdit size={20} className={"text-secondary-gray cursor-pointer"} />
        </DialogTrigger>

        <DialogContent
          id="hide"
          className="flex flex-col gap-4 w-full max-w-[90vw] md:max-w-[50vw] max-h-[95vh] h-full overflow-hidden"
        >
          <DialogHeader className="overflow-y-scroll scrollbar-hide">
            <DialogTitle className="flex items-center justify-between">
              <span className="text-xl md:text-2xl text-secondary-gray font-bold">
                Edit an Outreach Program
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
              >
                <div className="flex flex-col gap-5 px-3 pt-5 pb-10 bg-white h-full">
                  {/* Program Information */}
                  <div className="flex flex-col gap-5 p-4 rounded-md border border-secondary-gray/50 w-full">
                    <FormSectionHeader title="Program Information" />

                    <div className="flex flex-col gap-5 px-2 md:px-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                        <CustomInputForm
                          labelName="Program Title"
                          inputName="title"
                          register={register}
                          errors={errors}
                          inputType="text"
                          placeholderText="Enter program title"
                        />

                        <CustomInputForm
                          labelName="Program Description"
                          inputName="description"
                          register={register}
                          errors={errors}
                          inputType="text"
                          placeholderText="Enter program Description"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Organizer Details */}
                  <div className="flex flex-col gap-5 p-4 rounded-md border border-secondary-gray/50 w-full">
                    <FormSectionHeader title="Organizer Details" />

                    <div className="flex flex-col gap-5 px-2 md:px-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                        <CustomInputForm
                          labelName="Organizer Name"
                          inputName="organizerName"
                          register={register}
                          errors={errors}
                          inputType="text"
                          placeholderText="Enter organizer name"
                        />

                        <CustomInputForm
                          labelName="Phone Number"
                          inputName="phoneNumber"
                          register={register}
                          errors={errors}
                          inputType="text"
                          placeholderText="Enter phone number"
                        />

                        <CustomInputForm
                          labelName="Organization (if applicable)"
                          inputName="organization"
                          register={register}
                          errors={errors}
                          inputType="text"
                          placeholderText="Enter organization"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Target Audience */}
                  <div className="flex flex-col gap-5 p-4 rounded-md border border-secondary-gray/50 w-full">
                    <FormSectionHeader title="Target Audience" />

                    <div className="flex flex-col gap-5 px-2 md:px-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                        <CustomInputForm
                          labelName="Target Group"
                          inputName="targetGroup"
                          register={register}
                          errors={errors}
                          inputType="text"
                          placeholderText="Enter target group"
                        />

                        <CustomInputForm
                          labelName="Estimated Number Of Participants"
                          inputName="numberOfParticipants"
                          register={register}
                          errors={errors}
                          inputType="text"
                          placeholderText="Enter number of participants"
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
                    </div>
                  </div>

                  {/* Program Logistics */}
                  <div className="flex flex-col gap-5 p-4 rounded-md border border-secondary-gray/50 w-full">
                    <FormSectionHeader title="Program Logistics" />

                    <div className="flex flex-col gap-5 px-2 md:px-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                        <CustomInputForm
                          labelName="Program Date"
                          inputName="programDate"
                          register={register}
                          errors={errors}
                          inputType="date"
                        />

                        <CustomInputForm
                          labelName="Program Start Time"
                          inputName="programStartTime"
                          register={register}
                          errors={errors}
                          inputType="time"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit form button */}
                  <EditProgramButton pending={pending} reset={reset} />
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditProgram;

// Submit form button
const EditProgramButton = ({
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
          "Update"
        )}
      </Button>
    </div>
  );
};
