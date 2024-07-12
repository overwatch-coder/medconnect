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
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks";
import { SuperAdminTicketType as TicketType } from "@/types/index";
import { superAdminTicketSchema as ticketSchema } from "@/schema/ticket.schema";

type AddTicketProps = {
  tickets: TicketType[];
};

const AddTicket = ({ tickets }: AddTicketProps) => {
  const [user] = useAuth();

  const newTicketNumber =
    parseInt(tickets[tickets.length - 1].ticketID.split("T")[1]) + 1;

  const newTicketNumberString =
    newTicketNumber > 99
      ? newTicketNumber.toString()
      : newTicketNumber > 9
        ? "0" + newTicketNumber
        : "00" + newTicketNumber;

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<TicketType>({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      userId: user?.auth.id,
      ticketID: `T${newTicketNumberString}`,
    },
    mode: "all",
  });

  const { mutateAsync, isPending: pending } = useMutation({
    mutationFn: async (data: TicketType) => {
      console.log({ data });
      return data;
    },

    onSuccess: (data) => {
      toast.success("Ticket added successfully");
      reset();
    },
  });

  const handleFormSubmit: SubmitHandler<TicketType> = async (data) => {
    console.log({ data });
    await mutateAsync(data);
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-primary-green hover:bg-primary-green hover:scale-105 transition py-2 px-5 flex items-center gap-3 rounded-md text-white">
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
                Ticket {newTicketNumberString}
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
                <div className="flex flex-col gap-5 pt-5 pb-10 h-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                    <CustomInputForm
                      labelName="Requested By"
                      inputName="requestedBy"
                      register={register}
                      errors={errors}
                      inputType="text"
                      placeholderText="e.g John Doe"
                    />

                    <CustomInputForm
                      labelName="Ticket ID"
                      inputName="ticketID"
                      register={register}
                      errors={errors}
                      inputType="text"
                      value={newTicketNumberString}
                      placeholderText="Enter ticket ID"
                      disableField={true}
                    />
                  </div>

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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                    <CustomInputForm
                      labelName="Priority"
                      inputName="priority"
                      register={register}
                      errors={errors}
                      inputType="select"
                      selectOptions={[
                        { label: "Low", value: "low" },
                        { label: "Medium", value: "medium" },
                        { label: "High", value: "high" },
                        { label: "Urgent", value: "urgent" },
                      ]}
                    />

                    <CustomInputForm
                      labelName="Created At"
                      inputName="createdAt"
                      register={register}
                      errors={errors}
                      inputType="date"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-5 w-full">
                    <CustomInputForm
                      labelName="Status"
                      inputName="status"
                      register={register}
                      errors={errors}
                      inputType="select"
                      selectOptions={[
                        { label: "Open", value: "open" },
                        { label: "Closed", value: "closed" },
                        { label: "Pending", value: "pending" },
                        { label: "In Progress", value: "in progress" },
                        { label: "Critical", value: "critical" },
                      ]}
                    />

                    <CustomInputForm
                      labelName="User ID"
                      inputName="userId"
                      register={register}
                      errors={errors}
                      inputType="hidden"
                    />
                  </div>
                </div>

                {/* Submit form button */}
                <AddTicketButton pending={pending} reset={reset} />
              </form>
            </DialogDescription>
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
