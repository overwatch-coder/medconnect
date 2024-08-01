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
import { ticketSchema } from "@/schema/ticket.schema";
import { FileDrop } from "@instructure/ui-file-drop";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import ClipLoader from "react-spinners/ClipLoader";
import ImagePreview from "@/components/ImagePreview";
import { TicketType } from "@/types/index";
import RenderCustomError from "@/components/RenderCustomError";
import { useMutateData } from "@/hooks/useFetch";
import { createTicket } from "@/actions/tickets.action";
import { toast } from "react-toastify";
import { axiosInstance } from "@/lib/utils";
import { useAuth } from "@/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

type AddTicketModalProps = {
  openModal: boolean;
  setShowAddTicketModal: React.Dispatch<React.SetStateAction<boolean>>;
  refetchTickets: () => void;
};

const AddTicketModal = ({
  openModal,
  setShowAddTicketModal,
  refetchTickets,
}: AddTicketModalProps) => {
  const [user] = useAuth();
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    register,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting: pending },
    handleSubmit,
  } = useForm<TicketType>({
    resolver: zodResolver(ticketSchema),
    mode: "all",
  });

  const attachements = watch("attachment");
  const subject = watch("subject");

  const { mutateAsync, isError, error } = useMutateData({
    mutationFn: async (data: TicketType) => createTicket(data),
    config: {
      queryKey: ["tickets"],
    },
    notificationData: {
      type: "New Ticket",
      title: "New ticket has been created",
      description: `The ticket ${subject} has been created successfully`,
    },
  });

  const submitForm: SubmitHandler<TicketType> = async (data) => {
    if (!data.attachment?.length) {
      toast.info("Please attach an image of the issue");
      return;
    }

    const formData = new FormData();
    formData.append("image", data.attachment[0]);

    const res = await axiosInstance.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${user?.auth.token}`,
      },
    });

    const resData = await res.data;

    const fileUrl = resData?.fileUrl
      ? (resData?.fileUrl as string)
      : "https://d140uiq1keqywy.cloudfront.net/06744b93015fd3083d32b863359723ab-large.png";

    await mutateAsync(
      { ...data, attachment: fileUrl },
      {
        onSuccess: () => {
          toast.success("Ticket created successfully");
          queryClient.invalidateQueries({
            queryKey: ["tickets"],
          });
          setShowAddTicketModal(false);
          refetchTickets();
          reset();
          router.refresh();
        },
      }
    );
  };

  return (
    <Dialog open={openModal} onOpenChange={setShowAddTicketModal}>
      <DialogContent
        id="hide"
        className="flex flex-col gap-4 overflow-y-scroll scrollbar-hide h-screen"
      >
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span className="text-xl md:text-2xl text-secondary-gray font-bold">
              Create Ticket
            </span>
            <DialogClose
              onClick={() => {
                setShowAddTicketModal(false);
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
              onSubmit={handleSubmit(submitForm)}
              className="flex flex-col gap-4"
              method="POST"
              encType="multipart/form-data"
            >
              {/* Subject */}
              <div className="flex flex-col space-y-4 w-full text-start">
                <label className="text-primary-gray/50" htmlFor="name">
                  Subject
                </label>
                <input
                  type="text"
                  className="px-3 py-2 rounded w-full focus:border-2 ring-0 outline-none border border-secondary-gray placeholder:text-secondary-gray/60"
                  {...register("subject")}
                  placeholder="Enter ticket subject"
                />
                {errors?.subject?.message && (
                  <p className="text-red-500 text-xs py-2">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              {/* Description */}
              <div className="flex flex-col space-y-4 w-full text-start">
                <label className="text-primary-gray/50" htmlFor="name">
                  Description
                </label>
                <input
                  type="text"
                  className="px-3 py-2 rounded w-full focus:border-2 ring-0 outline-none border border-secondary-gray placeholder:text-secondary-gray/60"
                  {...register("description")}
                  placeholder="Enter ticket description"
                />
                {errors?.description?.message && (
                  <p className="text-red-500 text-xs py-2">
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* Attachment */}
              <label
                htmlFor="attachement"
                className="text-start text-lg text-secondary-gray font-semibold"
              >
                Add Attachment
              </label>
              <div className="flex flex-col gap-4 p-5 w-full rounded-md border border-secondary-gray bg-primary-gray/50">
                <FileDrop
                  id="attachements"
                  name="attachements"
                  onDropAccepted={(file) => {
                    setValue("attachment", file);
                  }}
                  shouldEnablePreview={true}
                  shouldAllowMultiple={true}
                  renderLabel={() => (
                    <div className="flex flex-col gap-5 p-5 items-center justify-center">
                      <Upload size={40} className="text-white" />
                      <p className="text-sm flex flex-col text-center items-center gap-1 font-medium w-full">
                        <span className="text-black">Drag and Drop here</span>
                        <span className="text-primary-gray/50">or</span>
                        <span className="text-red-500 p-2 text-center rounded bg-white w-full">
                          Browse Files
                        </span>
                      </p>
                    </div>
                  )}
                />

                {attachements && attachements.length > 0 && (
                  <div className="flex items-center gap-3 flex-wrap overflow-x-scroll scrollbar-hide">
                    {Array.from(attachements).map((image, idx: number) => (
                      <ImagePreview
                        image={URL.createObjectURL(image as File)}
                        key={idx}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Submit form button */}
              <AddTicketButton
                pending={pending}
                reset={reset}
                setShowAddTicketModal={setShowAddTicketModal}
              />
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddTicketModal;

const AddTicketButton = ({
  pending,
  reset,
  setShowAddTicketModal,
}: {
  pending: boolean;
  reset: () => void;
  setShowAddTicketModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="flex gap-5 flex-row items-center justify-end">
      <Button
        disabled={pending}
        onClick={() => {
          setShowAddTicketModal(false);
          reset();
        }}
        type="reset"
        variant={"destructive"}
        className="text-center text-white rounded-md"
      >
        Cancel
      </Button>

      <Button
        variant={"default"}
        disabled={pending}
        className="text-white rounded-md text-center"
      >
        {pending ? (
          <ClipLoader size={28} loading={pending} color="white" />
        ) : (
          "Add Listing"
        )}
      </Button>
    </div>
  );
};
