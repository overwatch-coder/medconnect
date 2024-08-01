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
import { z } from "zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import CustomInputForm from "@/components/CustomInputForm";
import ClipLoader from "react-spinners/ClipLoader";
import { IOutreachProgram } from "@/types/backend";
import { useMutateData } from "@/hooks/useFetch";
import { submitOutreachProgramParticipation } from "@/actions/outreach-programs.actions";
import RenderCustomError from "@/components/RenderCustomError";
import { useAuth } from "@/hooks";

// Register Program
export const RegisterProgramSchema = z.object({
  status: z.string().trim().min(1, "Answer is required"),
  choice: z.string().trim().min(1, "Choice is required"),
  outreachProgramId: z.string().trim().min(1, "Program ID is required"),
  supportType: z.string().optional(),
});

export type RegisterProgramSchemaType = z.infer<typeof RegisterProgramSchema>;

const RegisterProgram = ({ program }: { program: IOutreachProgram }) => {
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
      choice: "Participate",
      outreachProgramId: program._id,
      supportType: undefined,
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
      title: "Someone has registered to participate in the program",
      description: `${userName} has registered to participate in the program ${program.title}`,
    },
  });

  const handleSubmitForm = async (data: RegisterProgramSchemaType) => {
    await mutateAsync(data, {
      onSuccess: () => {
        toast.success("Request to become a participant sent successfully");
        setOpen(false);
        reset();
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild onClick={() => setOpen(true)}>
        <Button className="bg-secondary-gray hover:bg-secondary-gray w-full text-center text-white rounded">
          Register to Participate
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
              Participation
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
              labelName="Do you want to participate?"
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

            <CustomInputForm
              labelName="Support Type"
              inputName="supportType"
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
                    "Register"
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

export default RegisterProgram;
