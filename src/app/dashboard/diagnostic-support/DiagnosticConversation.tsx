"use client";

import { Paperclip } from "lucide-react";
import React, { useLayoutEffect, useState } from "react";
import { IoMdSend } from "react-icons/io";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getChatDiagnosis } from "@/actions/ai-chat.action";
import { Conversation } from "@/types/backend";
import { useMutation } from "@tanstack/react-query";
import moment from "moment-timezone";

type DiagnosticConversationProps = {
  selectedConvo: Conversation;
  convos: Conversation[];
  setConvos: React.Dispatch<React.SetStateAction<Conversation[]>>;
};

const DiagnosticConversation = ({
  selectedConvo,
  convos,
  setConvos,
}: DiagnosticConversationProps) => {
  useLayoutEffect(() => {
    const element = document.getElementById("viewport-bottom");
    element?.scrollIntoView({ behavior: "smooth" });
  }, [selectedConvo]);

  const [message, setMessage] = useState("");
  const [streamingResponse, setStreamingResponse] = useState("");

  const { mutateAsync } = useMutation({
    mutationKey: ["ai-chat"],
    mutationFn: (data: { patientId: string; question: string }) =>
      getChatDiagnosis(data.patientId, data.question),
    onMutate: () => {
      const selectedConvoIndex = convos.findIndex(
        (convo) => convo.id === selectedConvo?.id
      );

      convos[selectedConvoIndex].chats.push({
        message: message,
        role: "user",
      });

      setConvos([...convos]);
      setMessage("");
    },
    onSettled: (result) => {
      if (!result) {
        return;
      }

      if (!result.status) {
        console.log({ result });
        throw new Error(result.errors.join(", "));
      }

      console.log({ result });

      const selectedConvoIndex = convos.findIndex(
        (convo) => convo.id === selectedConvo?.id
      );

      const newChat = {
        observation: result.observation,
        answer: result.answer,
        role: "ai" as const,
      };

      convos[selectedConvoIndex].chats.push(newChat);
      setConvos([...convos]);
      setStreamingResponse("");
    },
    onError: (error) => {
      console.log(error);
      setStreamingResponse(error.message);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!message) {
      return;
    }
    const question = `Based on the patient's information provided as well as the previous conversation given below, what is the diagnosis for this new question which may or may not be related to the previous one?
    
    previous conversation: ${JSON.stringify(selectedConvo?.chats)}
    new question: ${message}
    `;

    await mutateAsync({
      patientId: selectedConvo?.patientId,
      question: question,
    });
  };

  return (
    <section className="col-span-1 md:col-span-2 bg-white w-full relative flex flex-col rounded-t-xl shadow-md h-full">
      {/* Header */}
      <div className="flex items-center text-white justify-between w-full px-5 py-2 bg-primary-green rounded-t-xl">
        <div className="flex flex-col gap-1">
          <h2 className="text-sm font-medium">
            {selectedConvo?.shortPatientId}: {selectedConvo?.name}
          </h2>

          <p className="text-xs">
            {moment(new Date(selectedConvo?.date)).format("h:mm A")}
          </p>
        </div>
        <PiDotsThreeVerticalBold size={20} className="text-white" />
      </div>

      {/* Messages */}
      <ScrollArea className="overflow-y-hidden h-[500px]">
        <div className="flex flex-col gap-3 bg-chat-bg bg-no-repeat bg-cover bg-center w-full px-5 py-3 overflow-y-scroll scrollbar-hide pb-10">
          <p className="text-gray-700 bg-blue-100 rounded-full px-6 py-1 flex flex-col items-center text-center pt-2 w-fit text-xs mx-auto">
            {new Date().toISOString().split("T")[0] ===
            selectedConvo?.date.split("T")[0]
              ? "Today"
              : moment(new Date(selectedConvo?.date))
                  .fromNow()
                  .charAt(0)
                  .toUpperCase() +
                moment(new Date(selectedConvo?.date)).fromNow().slice(1)}
          </p>

          {selectedConvo?.chats.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-5 w-full h-full mx-auto">
              <p className="text-sm flex flex-col gap-2">
                Send your first message to start a conversation.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-5 w-full min-h-full pt-10 pb-5">
              {selectedConvo?.chats.map((chat, index) => (
                <div
                  key={index}
                  className={`flex flex-col gap-2 w-1/2 p-5 text-sm rounded-lg shadow-md ${
                    chat.role === "ai"
                      ? "bg-primary-gray/10 self-start text-secondary-gray items-start"
                      : "bg-secondary-gray self-end text-white items-end"
                  }`}
                >
                  {chat.role === "ai"
                    ? selectedConvo?.chats.length > 0 && (
                        <>
                          <p className="flex flex-col gap-2">
                            {chat.observation.length > 0 && (
                              <span>{chat.observation[0]}</span>
                            )}
                            {chat.answer && (
                              <span>
                                {chat.answer.includes("Rate limit exceeded.")
                                  ? chat.answer
                                  : `Suggested Diagnosis: ${chat.answer}`}
                              </span>
                            )}
                          </p>
                        </>
                      )
                    : selectedConvo?.chats.length > 0 && (
                        <p className="text-sm text-start">{chat.message}</p>
                      )}

                  {streamingResponse && (
                    <div className="flex flex-col gap-2 w-1/2 p-5 text-sm rounded-lg shadow-md bg-primary-gray/10 self-start text-secondary-gray items-start">
                      <p className="text-sm flex flex-col gap-2">
                        {streamingResponse}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="h-4" id="viewport-bottom" />
        </div>
      </ScrollArea>

      {/* Footer */}
      <form
        method="post"
        onSubmit={handleSubmit}
        className="absolute bottom-0 right-0 w-full bg-white border-t border-t-secondary-gray/20 flex items-center gap-2 px-5 py-2"
      >
        <Paperclip size={20} className="text-primary-gray/50 cursor-pointer" />
        <input
          type="text"
          placeholder="Type a message..."
          className="w-full px-5 py-3 text-sm text-primary-gray bg-transparent border-0 rounded-md outline-none flex-1"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">
          <IoMdSend size={20} className="text-primary-blue" />
        </button>
      </form>
    </section>
  );
};

export default DiagnosticConversation;
