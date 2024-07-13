"use client";

import NewChatModal from "@/app/dashboard/diagnostic-support/NewChatModal";
import { Button } from "@/components/ui/button";
import { initialSelectedChat } from "@/constants/form-data";
import { useChats } from "@/hooks";
import { Conversation } from "@/types/backend";
import { MessageCirclePlus, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type ConversationSidebarProps = {
  conversations: Conversation[];
};

const ConversationSidebar = ({ conversations }: ConversationSidebarProps) => {
  const [{ chats, selectedChat }, setConvos] = useChats();
  const [searchConvo, setSearchConvo] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (conversations && conversations.length > 0) {
      setConvos((prev) => ({
        ...prev,
        chats: conversations,
      }));
    }
  }, [conversations, setConvos]);

  // search for a diagnostic support conversation
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchConvo(value);

    if (!value) {
      setConvos((prev) => ({
        ...prev,
        chats: conversations,
      }));
      return;
    }

    const filteredConvos = conversations?.filter((convo) => {
      return (
        convo.title.toLowerCase().includes(value) ||
        convo.patient.name.toLowerCase().includes(value) ||
        convo.chats.some((chat) =>
          chat.role === "ai"
            ? chat.answer.toLowerCase().includes(value)
            : chat.message.toLowerCase().includes(value)
        )
      );
    });

    setConvos((prev) => ({
      ...prev,
      chats: filteredConvos,
    }));
  };

  const handleChangeChat = (convo: Conversation) => {
    setConvos((prev) => ({
      ...prev,
      selectedPatient: null,
      newChat: false,
      selectedChat: convo,
    }));

    router.push(`/dashboard/diagnostic-support?chatId=${convo?.id}`);
  };

  const handleNewChat = () => {
    setConvos((prev) => ({
      ...prev,
      newChat: true,
      selectedPatient: null,
      selectedChat: initialSelectedChat,
    }));

    router.push("/dashboard/diagnostic-support");
  };

  return (
    <section className="col-span-1 w-full flex flex-col gap-5 min-h-full rounded-xl shadow-md bg-white relative">
      <div className="px-5 py-5">
        <div className="flex items-center gap-3 relative rounded-full bg-primary-gray/10 px-5 py-2 text-primary-gray/10">
          <Search
            className="text-secondary-gray absolute top-3 left-5"
            size={20}
          />

          <input
            type="text"
            placeholder="Search"
            value={searchConvo}
            className="w-full px-7 text-secondary-gray text-sm py-1 bg-transparent rounded-md outline-none border-0"
            onChange={handleSearch}
          />
        </div>
      </div>

      <hr className="bg-secondary-gray/50 w-full h-[1px]" />

      <div className="mb-auto h-full w-full pt-3 gap-2 flex flex-col overflow-y-scroll scrollbar-hide pb-10">
        {chats &&
          chats.length > 0 &&
          chats
            ?.filter((convo) => convo.chatId !== "Unknown")
            ?.map((convo, index) => {
              const isSelected = selectedChat?.id === convo?.id;

              return (
                <div
                  onClick={() => handleChangeChat(convo)}
                  className={`${
                    isSelected
                      ? "bg-blue-100"
                      : "bg-transparent hover:bg-blue-100"
                  } flex items-center justify-between gap-5 py-3 w-full cursor-pointer px-5`}
                  key={index}
                >
                  <div className="flex flex-col gap-2">
                    <h2 className="text-secondary-gray text-sm font-medium">
                      {convo?.chatId}: {convo?.title}
                    </h2>
                    <p className="text-primary-gray/50 text-xs">
                      {/* {chatLength === 0
                    ? "Send your first message to start a conversation."
                    : lastMessage?.slice(0, 60)} */}
                      Send your first message to start a conversation.
                    </p>
                  </div>
                </div>
              );
            })}

        {!chats?.length && (
          <div className="flex flex-col items-center justify-center gap-5 w-full h-full mx-auto">
            <p className="text-sm flex flex-col gap-2">
              No chats found. Start a new chat to get started.
            </p>
          </div>
        )}
      </div>

      <div className="w-full flex items-center justify-end pb-5">
        <Button
          onClick={handleNewChat}
          className="bg-transparent hover:bg-transparent"
        >
          <MessageCirclePlus size={30} className="text-primary-green" />
        </Button>
      </div>
    </section>
  );
};

export default ConversationSidebar;
