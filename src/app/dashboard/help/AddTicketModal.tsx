"use client";

import React, { useState } from "react";
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
import { ticketSchema, TicketType } from "@/schema/ticket.schema";
import { FileDrop } from "@instructure/ui-file-drop";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import ClipLoader from "react-spinners/ClipLoader";
import ImagePreview from "@/components/ImagePreview";

type AddTicketModalProps = {
  openModal: boolean;
  setShowAddTicketModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddTicketModal = ({
  openModal,
  setShowAddTicketModal,
}: AddTicketModalProps) => {
  const [attachements, setAttachements] =
    useState<ArrayLike<File | DataTransferItem>>();

  const {
    register,
    reset,
    formState: { errors, isSubmitting: pending },
    handleSubmit,
  } = useForm<TicketType>({
    resolver: zodResolver(ticketSchema),
    mode: "all",
  });

  const submitListingHandler: SubmitHandler<TicketType> = async (data) => {
    console.log({ data, attachements });
  };

  return (
    <Dialog open={openModal}>
      <DialogContent id="hide" className="flex flex-col gap-4">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span className="text-xl md:text-2xl text-secondary-gray font-bold">
              Create Ticket
            </span>
            <DialogClose onClick={() => setShowAddTicketModal(false)}>
              <X
                className="border border-red-500 text-red-500 rounded-full"
                size={25}
              />
            </DialogClose>
          </DialogTitle>

          <DialogDescription className="flex flex-col gap-5 w-full">
            <form
              onSubmit={handleSubmit(submitListingHandler)}
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
                    setAttachements(file);
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
                setAttachements={setAttachements}
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
  setAttachements,
}: {
  pending: boolean;
  reset: () => void;
  setShowAddTicketModal: React.Dispatch<React.SetStateAction<boolean>>;
  setAttachements: React.Dispatch<
    React.SetStateAction<ArrayLike<File | DataTransferItem> | undefined>
  >;
}) => {
  return (
    <div className="flex gap-5 flex-row items-center justify-end">
      <Button
        disabled={pending}
        onClick={() => {
          setShowAddTicketModal(false);
          reset();
          setAttachements(undefined);
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
