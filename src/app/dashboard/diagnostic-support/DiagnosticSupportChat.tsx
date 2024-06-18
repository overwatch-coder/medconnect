"use client";
import React, { useState } from "react";
import { MEDCONNECT_DASHBOARD_DIAGNOSTIC_SUPPORT as diagnosticSupportData } from "@/constants";
import { MessageCirclePlus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import DiagnosticConversation from "@/app/dashboard/diagnostic-support/DiagnosticConversation";

export type DiagnosticSupportDataType = (typeof diagnosticSupportData)[0];
export type DiagnosticSupportChatType =
  (typeof diagnosticSupportData)[0]["chats"][number];

const DiagnosticSupportChat = () => {
  const [convos, setConvos] = useState<DiagnosticSupportDataType[]>(
    diagnosticSupportData
  );

  const [selectedConvo, setSelectedConvo] = useState<DiagnosticSupportDataType>(
    diagnosticSupportData[0]
  );

  const [searchConvo, setSearchConvo] = useState("");

  // search for a diagnostic support conversation
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchConvo(value);

    if (!value) {
      setConvos(diagnosticSupportData);
      return;
    }

    const filteredConvos = diagnosticSupportData.filter((convo) => {
      return (
        convo.title.toLowerCase().includes(value.toLowerCase()) ||
        convo.description.toLowerCase().includes(value.toLowerCase()) ||
        convo.compoundId.toLowerCase().includes(value.toLowerCase()) ||
        convo.chats.some((chat) =>
          chat.message.toLowerCase().includes(value.toLowerCase())
        )
      );
    });

    setConvos(filteredConvos);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full h-full md:h-[95vh]">
      {/* Conversation Sidebar */}
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
          <div className="px-5 py-3">
            <hr className="bg-secondary-gray/30 w-full h-[1px]" />
          </div>

          {convos.map((convo, index) => {
            const isSelected = selectedConvo.id === convo.id;
            return (
              <div
                onClick={() => setSelectedConvo(convo)}
                className={`${
                  isSelected
                    ? "bg-blue-100"
                    : "bg-transparent hover:bg-blue-100"
                } flex items-center justify-between gap-5 py-3 w-full cursor-pointer px-5`}
                key={index}
              >
                <div className="flex flex-col gap-2">
                  <h2 className="text-secondary-gray text-sm font-medium">
                    {convo.compoundId}: {convo.title}
                  </h2>
                  <p className="text-primary-gray/50 text-xs">
                    {convo.description}
                  </p>
                </div>
                <p className="text-primary-gray/50 font-light text-xs">
                  {convo.time}
                </p>
              </div>
            );
          })}
        </div>

        <div className="w-full flex items-center justify-end">
          <Button className="bg-transparent hover:bg-transparent">
            <MessageCirclePlus size={30} className="text-primary-green" />
          </Button>
        </div>
      </section>

      {/* Converstions */}
      <DiagnosticConversation selectedConvo={selectedConvo} />
    </div>
  );
};

export default DiagnosticSupportChat;
