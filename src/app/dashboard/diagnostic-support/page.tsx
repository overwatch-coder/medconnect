import { getChatsWithMessages } from "@/actions/ai-chat.action";
import DashboardContentHeader from "@/app/dashboard/DashboardContentHeader";
import ConversationSidebar from "@/app/dashboard/diagnostic-support/ConversationSidebar";
import DiagnosticConversation from "@/app/dashboard/diagnostic-support/DiagnosticConversation";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Diagnostic Support - MedConnect",
  description: "Your diagnostic support",
  icons: {
    icon: "/favicon.ico",
  },
};

const DiagnosticSupport = async () => {
  const results = await getChatsWithMessages();

  return (
    <div className="flex flex-col gap-5 w-full my-5">
      <DashboardContentHeader
        headerTitle="Diagnostic Support"
        showDate={true}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full h-full md:h-[95vh]">
        <ConversationSidebar
          conversations={results.status ? results.conversations : []}
        />

        <DiagnosticConversation
          conversations={results.status ? results.conversations : []}
        />
      </div>
    </div>
  );
};

export default DiagnosticSupport;
