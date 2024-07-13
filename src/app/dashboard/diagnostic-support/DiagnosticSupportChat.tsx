"use client";

import React, { useState } from "react";
import { MessageCirclePlus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import DiagnosticConversation from "@/app/dashboard/diagnostic-support/DiagnosticConversation";
import { usePatients } from "@/hooks";
import { Conversation } from "@/types/backend";
import moment from "moment-timezone";

const DiagnosticSupportChat = () => {
  const [patients] = usePatients();
  const patientConversations: Conversation[] = patients.map((patient) => ({
    id: crypto.randomUUID(),
    name: patient.firstName + " " + patient.lastName,
    shortPatientId: patient.patientId,
    patientId: patient._id,
    time: patient.createdAt.split("T")[1].split(".")[0],
    date: patient.createdAt,
    compoundId: patient.chpsCompoundId,
    chats: [],
  }));

  const [convos, setConvos] = useState<Conversation[]>(patientConversations);

  const [selectedConvo, setSelectedConvo] = useState<Conversation>(convos[0]);

  const [searchConvo, setSearchConvo] = useState("");

  // search for a diagnostic support conversation
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchConvo(value);

    if (!value) {
      setConvos(patientConversations);
      return;
    }

    const filteredConvos = patientConversations.filter((convo) => {
      return (
        convo.name.toLowerCase().includes(value) ||
        convo.shortPatientId.toLowerCase().includes(value) ||
        convo.chats.some((chat) =>
          chat.role === "ai"
            ? chat.answer.toLowerCase().includes(value)
            : chat.message.toLowerCase().includes(value)
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

          {convos?.map((convo, index) => {
            const isSelected = selectedConvo?.id === convo?.id;
            const lastChat = convo?.chats[convo?.chats.length - 1];
            const lastMessage =
              lastChat?.role === "user" ? lastChat?.message : lastChat?.answer;
            const chatLength = convo?.chats.length as number;

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
                    {convo?.shortPatientId}: {convo?.name}
                  </h2>
                  <p className="text-primary-gray/50 text-xs">
                    {chatLength === 0
                      ? "Send your first message to start a conversation."
                      : lastMessage?.slice(0, 60)}
                  </p>
                </div>
                <p className="text-primary-gray/50 font-light text-xs flex items-center gap-1">
                  {moment(new Date(`${convo?.date}`)).format("h:mm A")}
                </p>
              </div>
            );
          })}
        </div>

        <div className="w-full flex items-center justify-end pb-5">
          <Button className="bg-transparent hover:bg-transparent">
            <MessageCirclePlus size={30} className="text-primary-green" />
          </Button>
        </div>
      </section>

      {/* Converstions */}
      <DiagnosticConversation
        selectedConvo={selectedConvo}
        convos={convos}
        setConvos={setConvos}
      />
    </div>
  );
};

export default DiagnosticSupportChat;
