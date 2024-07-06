"use client";

import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { useUserAtom } from "@/hooks";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import CustomInputForm from "@/components/CustomInputForm";
import ClipLoader from "react-spinners/ClipLoader";
import { OutreachProgramType } from "@/types/index";

// Register Program
const BecomeASupporterSchema = z.object({
  volunteer: z.string().trim().min(1, "volunteer response is required"),
  userId: z.string().trim().min(1, "User ID is required"),
  supportType: z.string().trim().min(1, "Support Type is required"),
  programId: z.string().trim().min(1, "Program ID is required"),
});

type BecomeASupporterType = z.infer<typeof BecomeASupporterSchema>;

const BecomeASupporter = ({ program }: { program: OutreachProgramType }) => {
  const [user] = useUserAtom();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BecomeASupporterType>({
    resolver: zodResolver(BecomeASupporterSchema),
    defaultValues: {
      userId: user.user?._id,
      programId: program?.id,
    },
    mode: "all",
  });

  const { mutateAsync, isPending, error, isError } = useMutation({
    mutationFn: async (data: BecomeASupporterType) => {
      console.log({ data });
      return data;
    },
    onSuccess: (data) => {
      toast.success("Volunteer request sent successfully");
      reset();
    },
  });

  const handleSubmitForm = async (data: BecomeASupporterType) => {
    console.log(data);
    await mutateAsync({ ...data });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
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
          {isError && (
            <div className="flex items-center justify-center p-4 text-center bg-red-200 rounded-md">
              <p className="text-xs text-red-500">{error.message}</p>
            </div>
          )}

          <div className="flex flex-col w-full gap-5">
            <CustomInputForm
              labelName="Volunteer"
              inputName="volunteer"
              register={register}
              errors={errors}
              inputType="select"
              selectOptions={[
                {
                  value: "yes",
                  label: "Yes",
                },
                {
                  value: "no",
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
              labelName="User ID"
              inputName="userId"
              errors={errors}
              register={register}
              inputType="hidden"
              value={user.user?._id}
            />

            <CustomInputForm
              labelName="Program ID"
              inputName="programId"
              errors={errors}
              register={register}
              inputType="hidden"
              value={program?.id}
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
