"use client";

import { Plus, X } from "lucide-react";
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
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks";
import { outreachProgramSchema } from "@/schema/outreach-programs.schema";
import { useFetch, useMutateData } from "@/hooks/useFetch";
import {
  createOrEditOutreachProgram,
  getAllOutreachPrograms,
} from "@/actions/outreach-programs.actions";
import { useState } from "react";
import RenderCustomError from "@/components/RenderCustomError";

const AddProgram = () => {
  const { refetch: refetchOutreachPrograms } = useFetch({
    queryFn: async () => await getAllOutreachPrograms(),
    queryKey: ["outreach-programs"],
  });

  const [user] = useAuth();
  const isSuperAdmin = user?.isSuperAdmin;
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<OutreachProgramType>({
    resolver: zodResolver(outreachProgramSchema),
    mode: "all",
  });

  const {
    mutateAsync,
    isPending: pending,
    error,
    isError,
  } = useMutateData({
    mutationFn: async (data: OutreachProgramType) =>
      createOrEditOutreachProgram(data),
    config: {
      queryKey: ["outreach-programs"],
    },
  });

  const handleFormSubmit: SubmitHandler<OutreachProgramType> = async (data) => {
    const dataToSubmit: OutreachProgramType = {
      ...data,
      organization: data.organizerName ? data.organizerName : "N/A",
      organizerName: data.organizerName ? data.organizerName : "N/A",
      programStartTime: new Date(
        `${data.programDate}T${data.programStartTime}`
      ).toLocaleTimeString("en-US", {
        timeZone: "UTC",
        timeStyle: "short",
      }),
    };
    await mutateAsync(dataToSubmit, {
      onSuccess: (data) => {
        if (data && data._id) {
          toast.success("Outreach Program added successfully");
          queryClient.invalidateQueries({
            queryKey: ["outreach-programs"],
          });
          refetchOutreachPrograms();
          reset();
          setOpen(false);
        } else {
          toast.error("Something went wrong");
        }
      },
    });
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild onClick={() => setOpen(true)}>
          <Button className="bg-primary-green hover:bg-primary-green hover:scale-105 transition py-2 px-5 flex items-center gap-3 rounded-md text-white">
            <Plus className="text-white" size={20} />
            <span className="font-bold">
              {isSuperAdmin ? "Add Program" : "Suggest a Program"}
            </span>
          </Button>
        </DialogTrigger>

        <DialogContent
          id="hide"
          className="flex flex-col gap-4 w-full max-w-[90vw] md:max-w-[50vw] max-h-[95vh] h-full overflow-hidden"
        >
          <DialogHeader className="overflow-y-scroll scrollbar-hide">
            <DialogTitle className="flex items-center justify-between">
              <span className="text-xl md:text-2xl text-secondary-gray font-bold">
                {isSuperAdmin
                  ? "Add an Outreach Program"
                  : "Suggest an Outreach Program"}
              </span>
              <DialogClose
                onClick={() => {
                  reset();
                  setOpen(false);
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
              <RenderCustomError error={error} isError={isError} />

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
                  <AddProgramButton pending={pending} reset={reset} />
                </div>
              </form>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddProgram;

// Submit form button
const AddProgramButton = ({
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
          "Submit"
        )}
      </Button>
    </div>
  );
};
