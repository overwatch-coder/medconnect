"use client";

import { Paperclip } from "lucide-react";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { IoMdSend } from "react-icons/io";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatPatient, getChatDiagnosis } from "@/actions/ai-chat.action";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import moment from "moment-timezone";
import { PulseLoader } from "react-spinners";
import { useAuth, useChats } from "@/hooks";
import { useSearchParams, useRouter } from "next/navigation";
import NewChatModal from "@/app/dashboard/diagnostic-support/NewChatModal";
import { Conversation, QuestionPayload } from "@/types/backend";
import { useConvos } from "@/hooks/useConvos";
import { SmallLoading } from "@/app/loading";

type DiagnosticConversationProps = {
  conversations: Conversation[];
};

const DiagnosticConversation = ({
  conversations,
}: DiagnosticConversationProps) => {
  const queryClient = useQueryClient();
  // const [{ chats, selectedChat, newChat, selectedPatient }, setConvos] =
  //   useChats();
  const { messages, isLoadedMessages, handleSendMessage, isSubmitting } =
    useConvos(true);
  const [user] = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const chatId = searchParams.get("chatId");

  // useEffect(() => {
  //   if (conversations && conversations.length > 0) {
  //     setConvos((prev) => ({
  //       ...prev,
  //       chats: conversations,
  //     }));
  //   }
  // }, [conversations, setConvos]);

  // useEffect(() => {
  //   if (chatId) {
  //     const chat = conversations?.find((chat) => chat.id === chatId);

  //     if (chat) {
  //       setConvos((prev) => ({
  //         ...prev,
  //         selectedChat: chat,
  //         selectedPatient: null,
  //       }));
  //     } else {
  //       router.push("/dashboard/diagnostic-support");
  //     }
  //   }
  // }, [chatId, conversations, router, setConvos]);

  useLayoutEffect(() => {
    const element = document.getElementById("viewport-bottom");
    element?.scrollIntoView({ behavior: "smooth" });
  }, [messages?.length]);

  const [message, setMessage] = useState("");

  // const { mutateAsync, isPending: pending } = useMutation({
  //   mutationKey: ["ai-chat"],
  //   mutationFn: (data: {
  //     patient: ChatPatient;
  //     question: string;
  //     chatId?: string;
  //   }) => getChatDiagnosis(data.patient, data.question, data.chatId),
  //   onMutate: (data) => {
  //     if (!newChat && chatId) {
  //       const selectedConvoIndex = chats.findIndex(
  //         (convo) => convo.id === selectedChat?.id
  //       );

  //       chats[selectedConvoIndex].chats.push({
  //         message: message,
  //         role: "user",
  //         chatId: chats[selectedConvoIndex].id,
  //         messageId: crypto.randomUUID(),
  //       });

  //       setConvos((prev) => ({
  //         ...prev,
  //         chats: [...chats],
  //       }));

  //       setMessage("");
  //     }

  //     setMessage("");
  //   },
  //   onSettled: (result, error, data) => {
  //     if (!result) {
  //       return;
  //     }

  //     if (!result.status) {
  //       throw new Error(result.errors.join(", "));
  //     }

  //     if (newChat || !chatId) {
  //       // add the new chat to the end of the chats array
  //       setConvos((prev) => ({
  //         ...prev,
  //         chats: [
  //           ...prev.chats,
  //           {
  //             ...result.conversation,
  //             patient: data.patient,
  //             title: data.question.substring(0, 60),
  //             chatId: `MDCK${Math.floor(Math.random() * 1000)}`,
  //             chats: result.conversation.chats,
  //           },
  //         ],
  //         newChat: false,
  //         selectedPatient: null,
  //       }));

  //       return router.push(
  //         `/dashboard/diagnostic-support?chatId=${result.conversation.id}`
  //       );
  //     }

  //     const selectedChatIndex = chats.findIndex(
  //       (chat) => chat.id === selectedChat?.id
  //     );

  //     const mutatedChats = [...chats];

  //     mutatedChats[selectedChatIndex].chats?.push(...result.conversation.chats);

  //     setConvos((prev) => ({
  //       ...prev,
  //       chats: mutatedChats,
  //       newChat: false,
  //       selectedChat: result.conversation,
  //       selectedPatient: null,
  //     }));

  //     queryClient.invalidateQueries({
  //       queryKey: ["ai-chat"],
  //     });
  //   },
  //   onError: (error) => {
  //     console.log({ error });
  //   },
  // });

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
      {!isLoadedMessages ? (
        <div className="flex flex-col items-center justify-center gap-5 w-full h-full mx-auto">
          <SmallLoading />
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="flex items-center text-white justify-between w-full px-5 py-2 bg-primary-green rounded-t-xl">
            {/* {!newChat ? (
              <div className="flex flex-col gap-1">
                <h2 className="text-sm font-medium">
                  {selectedChat?.chatId}: {selectedChat?.title}
                </h2>
                <p className="text-xs">
                  {moment(new Date(Date.now())).format("h:mm A")}
                </p>
              </div>
            ) : (
              <p className="text-sm font-medium">
                {selectedPatient
                  ? `Start A New Conversation for ${selectedPatient?.firstName} ${selectedPatient?.lastName}`
                  : "Start A New Conversation"}
              </p>
            )} */}
            <PiDotsThreeVerticalBold size={20} className="text-white" />
          </div>

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
