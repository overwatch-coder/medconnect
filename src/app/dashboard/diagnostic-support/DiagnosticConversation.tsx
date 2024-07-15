"use client";

import { Paperclip } from "lucide-react";
import React, { useLayoutEffect, useState } from "react";
import { IoMdSend } from "react-icons/io";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/hooks";
import { useSearchParams } from "next/navigation";
import { QuestionPayload } from "@/types/backend";
import { useConvos } from "@/hooks/useConvos";
import { SmallLoading } from "@/app/loading";
import { PulseLoader } from "react-spinners";

const DiagnosticConversation = () => {
  const { messages, isLoadedMessages, handleSendMessage, isSubmitting } =
    useConvos(true);
  const [user] = useAuth();
  const searchParams = useSearchParams();
  const chatId = searchParams.get("chatId");

  useLayoutEffect(() => {
    const element = document.getElementById("viewport-bottom");
    element?.scrollIntoView({ behavior: "smooth" });
  }, [messages?.length]);

  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!message) {
      return;
    }
    const data: QuestionPayload = {
      question: {
        text: message,
      },
      userId: user?.staff?.chpsCompoundId as string,
    };
    const form = e.target as HTMLFormElement;
    form.reset();
    handleSendMessage(data, chatId as string);
  };

  return (
    <section className="col-span-1 md:col-span-2 bg-white w-full relative flex flex-col rounded-t-xl shadow-md h-full">
      {/* Header */}
      <div className="flex items-center text-white justify-between w-full px-5 py-2 bg-primary-green rounded-t-xl">
        <PiDotsThreeVerticalBold size={20} className="text-white" />
      </div>

      {!isLoadedMessages ? (
        <div className="flex flex-col items-center justify-center gap-5 w-full h-full mx-auto">
          <SmallLoading />
        </div>
      ) : (
        <>
          {/* Messages */}
          <ScrollArea className="flex h-[800px] flex-col gap-3 bg-chat-bg bg-no-repeat bg-cover bg-center w-full px-5 py-3 overflow-y-scroll scrollbar-hide pb-10">
            <p className="text-gray-700 bg-blue-100 rounded-full px-6 py-1 flex flex-col items-center text-center pt-2 w-fit text-xs mx-auto">
              Today
            </p>
            <div className="flex flex-col gap-5 w-full min-h-full h-full pt-10 pb-5">
              {messages?.length === 0 && (
                <div className="flex flex-col items-center justify-center gap-5 w-full h-full mx-auto">
                  <p className="text-sm flex flex-col gap-2">
                    Send your first message to start a conversation.
                  </p>
                </div>
              )}

              {messages?.map((chat, index) => (
                <>
                  <div
                    key={index}
                    className={`flex flex-col gap-2 w-1/2 p-5 text-sm rounded-lg shadow-md 
                        bg-secondary-gray self-end text-white items-start"
                    `}
                  >
                    <p className="text-sm text-start">{chat.question}</p>
                  </div>

                  <div
                    key={index + 1}
                    className={`flex flex-col gap-2 w-1/2 p-5 text-sm rounded-lg shadow-md 
                        bg-primary-gray/10 self-start text-secondary-gray items-start"
                    `}
                  >
                    <div>
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
                    </div>
                  </div>
                </>
              ))}

              {isSubmitting && (
                <>
                  <div
                    className={`flex flex-col gap-2 w-1/2 p-5 text-sm rounded-lg shadow-md 
                        bg-secondary-gray self-end text-white items-start"
                    `}
                  >
                    <p className="text-sm text-start">{message}</p>
                  </div>
                  <div className="flex flex-col gap-2 w-1/2 p-5 text-sm rounded-lg shadow-md bg-primary-gray/10 self-start text-secondary-gray items-start">
                    <PulseLoader
                      size={5}
                      loading={isSubmitting}
                      color="#333333"
                    />
                  </div>
                </>
              )}
            </div>

            <div className="h-4" id="viewport-bottom" />
          </ScrollArea>
        </>
      )}

      {/* Footer */}
      <form
        method="post"
        onSubmit={handleSubmit}
        className="absolute bottom-0 left-0 w-full bg-white border-t border-t-secondary-gray/20 flex items-center gap-2 px-5 py-2"
      >
        <Paperclip size={20} className="text-primary-gray/50 cursor-pointer" />
        <input
          disabled={isSubmitting}
          type="text"
          placeholder="Type a message..."
          className="w-full px-5 py-3 text-sm text-primary-gray bg-transparent border-0 rounded-md outline-none flex-1"
          onChange={(e) => setMessage(e.target.value)}
        />
        {isSubmitting ? (
          <button type="submit" disabled>
            <PulseLoader size={5} loading={isSubmitting} color="#333333" />
          </button>
        ) : (
          <button type="submit">
            <IoMdSend size={20} className="text-primary-blue" />
          </button>
        )}
      </form>
    </section>
  );
};

export default DiagnosticConversation;
