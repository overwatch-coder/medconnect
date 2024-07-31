"use client";

import { Edit, X } from "lucide-react";
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
import { useFetch, useMutateData } from "@/hooks/useFetch";
import { getAllTickets, updateTicket } from "@/actions/tickets.action";
import { useState } from "react";
import { useRouter } from "next/navigation";
import RenderCustomError from "@/components/RenderCustomError";
import { ITicket } from "@/types/backend";
import { z } from "zod";

const ticketStatusSchema = z.object({
  status: z.enum(["OPEN", "CLOSED"], { message: "Invalid status" }),
  priority: z.enum(["HIGH", "MEDIUM", "LOW"], { message: "Invalid priority" }),
});

type TicketStatus = z.infer<typeof ticketStatusSchema>;

const UpdateTicket = ({ ticket }: { ticket: ITicket }) => {
  const { refetch: refetchTickets } = useFetch({
    queryKey: ["tickets"],
    queryFn: async () => await getAllTickets(),
    enabled: true,
  });

  const queryClient = useQueryClient();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const {
    register,
    reset,
    formState: { errors, isSubmitting: pending },
    handleSubmit,
  } = useForm<TicketStatus>({
    resolver: zodResolver(ticketStatusSchema),
    defaultValues: {
      status: ticket.status as TicketStatus["status"],
      priority: ticket.priority as TicketStatus["priority"],
    },
    mode: "all",
  });

  const { mutateAsync, isError, error } = useMutateData({
    mutationFn: async (data: TicketStatus) => updateTicket(data, ticket._id),
    config: {
      queryKey: ["tickets"],
    },
  });

  const submitForm: SubmitHandler<TicketStatus> = async (data) => {
    await mutateAsync(data, {
      onSuccess: () => {
        toast.success("Ticket updated successfully");
        queryClient.invalidateQueries({
          queryKey: ["tickets"],
        });
        setOpen(false);
        refetchTickets();
        reset();
        router.refresh();
      },
    });
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild onClick={() => setOpen(true)}>
          <button>
            <Edit className="text-primary-green" size={20} />
          </button>
        </DialogTrigger>

        <DialogContent
          id="hide"
          className="flex flex-col gap-4 w-full max-w-[90vw] md:max-w-[50vw] overflow-hidden bg-white rounded-none"
        >
          <DialogHeader className="overflow-y-scroll scrollbar-hide">
            <DialogTitle className="flex items-center justify-between">
              <span className="text-xl md:text-2xl text-secondary-gray font-bold">
                Update Ticket {ticket.ticketId}
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
                      labelName="Status"
                      inputName="status"
                      register={register}
                      errors={errors}
                      inputType="select"
                      selectOptions={[
                        {
                          value: "OPEN",
                          label: "Open",
                        },
                        {
                          value: "CLOSED",
                          label: "Closed",
                        },
                      ]}
                    />

                    <CustomInputForm
                      labelName="Priority"
                      inputName="priority"
                      register={register}
                      errors={errors}
                      inputType="select"
                      selectOptions={[
                        {
                          value: "HIGH",
                          label: "High",
                        },
                        {
                          value: "MEDIUM",
                          label: "Medium",
                        },
                        {
                          value: "LOW",
                          label: "Low",
                        },
                      ]}
                    />
                  </div>
                </div>

                {/* Submit form button */}
                <UpdateTicketButton pending={pending} reset={reset} />
              </form>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UpdateTicket;

// Submit form button
const UpdateTicketButton = ({
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
