import DashboardContentHeader from "@/app/dashboard/DashboardContentHeader";
import HelpTable from "@/app/dashboard/help/HelpTable";
import { MEDCONNECT_DASHBOARD_HELP_TICKETS as ticketsData } from "@/constants";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Help & Support - MedConnect",
  description: "Get all kinds of help and support with ease",
  icons: {
    icon: "/favicon.ico",
  },
};

const HelpAndSupport = () => {
  return (
    <div className="flex flex-col gap-5 w-full h-full">
      {/* Header */}
      <DashboardContentHeader headerTitle="Help & Support" showDate={false} />

      <div className="flex flex-row flex-nowrap w-full h-full">
        <HelpTable tickets={ticketsData} />
      </div>
    </div>
  );
};

export default HelpAndSupport;
