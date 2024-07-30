"use client";

import { PlusCircle, X } from "lucide-react";
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
import CustomInputForm from "@/components/CustomInputForm";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks";
import { ticketSchema } from "@/schema/ticket.schema";
import { TicketType } from "@/types/index";
import { useFetch, useMutateData } from "@/hooks/useFetch";
import { createTicket, getAllTickets } from "@/actions/tickets.action";
import CustomFileUpload from "@/components/CustomFileUpload";
import { axiosInstance } from "@/lib/utils";
import { useState } from "react";
import { useRouter } from "next/navigation";
import RenderCustomError from "@/components/RenderCustomError";

const AddTicket = () => {
  const { refetch: refetchTickets } = useFetch({
    queryKey: ["tickets"],
    queryFn: async () => await getAllTickets(),
    enabled: true,
  });

  const [user] = useAuth();
  const queryClient = useQueryClient();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const {
    register,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting: pending },
    handleSubmit,
  } = useForm<TicketType>({
    resolver: zodResolver(ticketSchema),
    mode: "all",
  });

  const { mutateAsync, isError, error } = useMutateData({
    mutationFn: async (data: TicketType) => createTicket(data),
    config: {
      queryKey: ["tickets"],
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
          setOpen(false);
          refetchTickets();
          reset();
          router.refresh();
        },
      }
    );
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild onClick={() => setOpen(true)}>
          <Button className="bg-primary-green hover:bg-primary-green hover:scale-105 transition py-2 px-5 items-center gap-3 rounded-md text-white hidden">
            <PlusCircle className="text-white" size={20} />
            <span className="font-bold">Add Ticket</span>
          </Button>
        </DialogTrigger>

        <DialogContent
          id="hide"
          className="flex flex-col gap-4 w-full max-w-[90vw] md:max-w-[50vw] max-h-[95vh] h-full overflow-hidden bg-white rounded-none"
        >
          <DialogHeader className="overflow-y-scroll scrollbar-hide">
            <DialogTitle className="flex items-center justify-between">
              <span className="text-xl md:text-2xl text-secondary-gray font-bold">
                New Ticket
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
              <RenderCustomError isError={isError} error={error} />

              <form
                onSubmit={handleSubmit(submitForm)}
                className="flex flex-col gap-4 w-full"
                method="POST"
              >
                <div className="flex flex-col gap-5 pt-5 pb-10 h-full">
                  <div className="grid grid-cols-1 gap-5 w-full">
                    <CustomInputForm
                      labelName="Subject"
                      inputName="subject"
                      register={register}
                      errors={errors}
                      inputType="text"
                      placeholderText="Enter subject"
                    />

                    <CustomInputForm
                      labelName="Description"
                      inputName="description"
                      register={register}
                      errors={errors}
                      inputType="text"
                      placeholderText="Enter description"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-5 w-full">
                    <CustomFileUpload
                      itemName="attachment"
                      title="Attachment"
                      setValue={setValue}
                      watch={watch}
                      allowMultiple={false}
                    />
                  </div>
                </div>

                {/* Submit form button */}
                <AddTicketButton pending={pending} reset={reset} />
              </form>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddTicket;

// Submit form button
const AddTicketButton = ({
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
          "Save"
        )}
      </Button>
    </div>
  );
};
