import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useAuth, usePatients } from "@/hooks";
import { ChatPayload } from "@/types/backend";
import { MessageCirclePlus } from "lucide-react";
import axios from "axios";
import { baseChatUrl } from "@/hooks/useConvos";
import { ClipLoader } from "react-spinners";
import { useRouter } from "next/navigation";

export const StartChatModal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ChatPayload>();
  const [patients] = usePatients();
  const [user] = useAuth();
  const router = useRouter();

  const getPatient = (id: string) => {
    const {
      firstName,
      lastName,
      location,
      age = 20,
      gender,
    } = patients?.find((patient) => patient?._id === id) ?? {};
    return {
      name: `${firstName} ${lastName}`,
      location,
      age,
      gender,
    };
  };

  const [open, setOpen] = useState<boolean>(false)
  const handleStartChat = async (values: ChatPayload) => {
    try {
      const data = {
        patient: getPatient(values.patient as string),
        userId: user?.staff?.chpsCompoundId,
        question: {
          text: values.question,
        },
      };
      const res = await axios.post(`${baseChatUrl}/chat`, data);
      if (res.data) {
        router.push(
          `/dashboard/diagnostic-support?chatId=${res.data.chatObjectId}`
        );
      }
    } catch (error:any) {
      if (
        error.response &&
        error.response.status === 500 &&
        error.response.data &&
        error.response.data.detail &&
        error.response.data.detail.includes("Could not parse LLM output:")
      ) {
        console.log("Encountered LLM parsing error. Reloading page...");
        // window.location.reload();
      } else {
        console.error("Error:", error);
      }
    }
    finally{
        setOpen(false)
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="bg-transparent hover:bg-transparent">
            <MessageCirclePlus size={30} className="text-primary-green" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSubmit(handleStartChat)}>
            <DialogHeader>
              <DialogTitle>Start chat</DialogTitle>
              <DialogDescription>
                Select a patient then ask us anything I can help with
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col w-full my-4">
              <label htmlFor="patient" className="flex items-center gap-2">
                <span className="text-secondary-gray">Patient</span>
              </label>

              <select id="patient" {...register("patient")} className="p-2">
                <option value="">Select Patient</option>
                {patients?.map((patient, index) => (
                  <option value={patient._id}>
                    {patient.firstName}
                    {patient.lastName}
                  </option>
                ))}
              </select>

              {errors?.patient?.message && (
                <p className="py-2 text-xs text-red-500">
                  {errors.patient.message}
                </p>
              )}
            </div>
            <div className="flex flex-col w-full my-4">
              <label htmlFor="question" className="flex items-center gap-2">
                <span className="text-secondary-gray">Question</span>
              </label>
              <textarea
                className="text-secondary-gray ring-0 border-b-secondary-gray w-full px-2 py-1 border-b-2 outline-none"
                {...register("question")}
              />

              {errors?.question?.message && (
                <p className="py-2 text-xs text-red-500">
                  {errors.question.message}
                </p>
              )}
            </div>
            <DialogFooter>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-primary-green hover:bg-secondary-gray text-center text-white"
              >
                {isSubmitting ? (
                  <ClipLoader size={28} loading={isSubmitting} color="white" />
                ) : (
                  "Start chat"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
