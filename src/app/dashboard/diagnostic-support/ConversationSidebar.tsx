"use client";

import { SmallLoading } from "@/app/loading";
import { useConvos } from "@/hooks/useConvos";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { StartChatModal } from "./StartChatModal";

const ConversationSidebar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const chatId = searchParams.get("chatId");

  const { isLoadedChats, chats, filteredChats, setFilteredChats } = useConvos();

  // search for a diagnostic support conversation
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    if (!value) setFilteredChats(chats);
    const filteredConvos = chats?.filter((convo) => {
      return (
        convo.title.toLowerCase().includes(value) ||
        convo.patient.name.toLowerCase().includes(value)
      );
    });

    setFilteredChats(filteredConvos);
  };

  const handleChangeChat = (convo: string) => {
    router.push(`/dashboard/diagnostic-support?chatId=${convo}`);
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
            className="w-full px-7 text-secondary-gray text-sm py-1 bg-transparent rounded-md outline-none border-0"
            onChange={handleSearch}
          />
        </div>
      </div>
      <hr className="bg-secondary-gray/50 w-full h-[1px]" />
      <div className="mb-auto h-full w-full pt-3 gap-2 flex flex-col overflow-y-scroll scrollbar-hide pb-10">
        {filteredChats &&
          filteredChats.length > 0 &&
          filteredChats
            ?.sort(
              (a, b) =>
                parseInt(b.chatId.slice(5)) - parseInt(a.chatId.slice(5))
            )
            .map((convo, index) => {
              const isSelected = chatId === convo?.id;

              return (
                <div
                  onClick={() => handleChangeChat(convo?.id)}
                  className={`${
                    isSelected
                      ? "bg-blue-100"
                      : "bg-transparent hover:bg-blue-100"
                  } flex items-center justify-between gap-5 py-3 w-full cursor-pointer px-5`}
                  key={index}
                >
                  <div className="flex flex-col gap-2">
                    <h2 className="text-secondary-gray text-sm font-medium">
                      {convo?.title}
                    </h2>
                    <p className="text-primary-gray/50 text-xs">
                      {convo.patient.name}
                    </p>
                  </div>
                </div>
              );
            })}

        <div>
          {!isLoadedChats ? (
            <div className="flex flex-col items-center justify-center gap-5 w-full h-full mx-auto">
              <SmallLoading />
            </div>
          ) : (
            <>
              {!filteredChats?.length && (
                <p className="text-sm flex flex-col text-center pt-10 gap-2 mx-auto">
                  No chats found
                </p>
              )}
            </>
          )}
        </div>
      </div>
      <div className="w-full flex items-center justify-end pb-5">
        <StartChatModal />
      </div>
    </section>
  );
};

export default ConversationSidebar;
