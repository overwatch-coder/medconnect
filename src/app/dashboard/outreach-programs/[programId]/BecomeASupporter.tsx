"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import CustomInputForm from "@/components/CustomInputForm";
import ClipLoader from "react-spinners/ClipLoader";
import { IOutreachProgram } from "@/types/backend";
import {
  RegisterProgramSchema,
  RegisterProgramSchemaType,
} from "@/app/dashboard/outreach-programs/[programId]/RegisterProgram";
import { useMutateData } from "@/hooks/useFetch";
import { submitOutreachProgramParticipation } from "@/actions/outreach-programs.actions";
import RenderCustomError from "@/components/RenderCustomError";
import { useAuth } from "@/hooks";

const BecomeASupporter = ({ program }: { program: IOutreachProgram }) => {
  const [open, setOpen] = useState(false);
  const [user] = useAuth();
  const userName = user?.isSuperAdmin
    ? user?.admin?.name
    : user?.staff?.fullName;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<RegisterProgramSchemaType>({
    resolver: zodResolver(RegisterProgramSchema),
    defaultValues: {
      choice: "Volunteer",
      outreachProgramId: program._id,
    },
    mode: "all",
  });

  const choice = watch("choice");

  const { mutateAsync, isPending, error, isError } = useMutateData({
    mutationFn: async (data: RegisterProgramSchemaType) =>
      submitOutreachProgramParticipation(data),
    config: {
      queryKey: ["outreach-programs", program._id],
    },
    notificationData: {
      type: "Support/Participate",
      title: "Someone has volunteered to support the program",
      description: `${userName} has volunteered to support the program ${program.title}`,
    },
  });

  const handleSubmitForm = async (data: RegisterProgramSchemaType) => {
    await mutateAsync(data, {
      onSuccess: () => {
        toast.success("Request to volunteer has been sent successfully");
        setOpen(false);
        reset();
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild onClick={() => setOpen(true)}>
        <Button className="bg-primary-green hover:bg-primary-green w-full text-center text-white rounded">
          Become a Supporter
        </Button>
      </DialogTrigger>

      <DialogContent
        id="hide"
        className="flex flex-col w-full max-w-xl gap-5 bg-white"
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <DialogTitle className="flex flex-col gap-3">
            <span className="text-xl md:text-2xl text-secondary-gray font-bold">
              Volunteer/Supporter
            </span>
          </DialogTitle>

          <DialogClose
            onClick={() => {
              reset();
              setOpen(false);
            }}
            className="flex items-center justify-center w-6 h-6 border border-red-500 rounded-full"
          >
            <X size={20} className="text-red-500" />
          </DialogClose>
        </div>

        {/* form */}
        <form
          method="post"
          onSubmit={handleSubmit(handleSubmitForm)}
          className="flex flex-col gap-5"
        >
          <RenderCustomError isError={isError} error={error} />

          <div className="flex flex-col w-full gap-5">
            <CustomInputForm
              labelName="Volunteer"
              inputName="status"
              register={register}
              errors={errors}
              inputType="select"
              selectOptions={[
                {
                  value: "true",
                  label: "Yes",
                },
                {
                  value: "false",
                  label: "No",
                },
              ]}
            />

            <CustomInputForm
              labelName="Type of Support"
              inputName="supportType"
              register={register}
              errors={errors}
              inputType="select"
              selectOptions={[
                {
                  value: "venue provision",
                  label: "Venue Provision",
                },
                {
                  value: "food",
                  label: "Food",
                },
                {
                  value: "transportation",
                  label: "Transportation",
                },
                {
                  value: "other",
                  label: "Other",
                },
                {
                  value: "sponsorship",
                  label: "Sponsorship",
                },
              ]}
            />

            <CustomInputForm
              labelName="Choice"
              inputName="choice"
              errors={errors}
              register={register}
              inputType="hidden"
            />

            <CustomInputForm
              labelName="Program ID"
              inputName="outreachProgramId"
              errors={errors}
              register={register}
              inputType="hidden"
            />

            {/* Submit Button */}
            <div className="flex items-center justify-end w-full">
              <div className="flex items-center gap-4">
                <DialogClose
                  onClick={() => {
                    reset();
                  }}
                  disabled={isPending}
                  className="hover:bg-transparent text-secondary-gray px-7 border-secondary-gray w-full py-2 bg-transparent border rounded-none"
                  type="reset"
                >
                  Cancel
                </DialogClose>

                <Button
                  disabled={isPending}
                  className="bg-primary-green hover:bg-primary-green px-7 w-full py-2 text-white rounded-none"
                >
                  {isPending ? (
                    <ClipLoader size={28} loading={isPending} color="white" />
                  ) : (
                    "Volunteer"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BecomeASupporter;
