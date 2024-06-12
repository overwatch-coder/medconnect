import DashboardContentHeader from "@/app/dashboard/DashboardContentHeader";
import HelpTable from "@/app/dashboard/help/HelpTable";
import { MEDCONNECT_DASHBOARD_HELP_TICKETS } from "@/constants";
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
    <div className="flex flex-col gap-5 w-full">
      {/* Header */}
      <DashboardContentHeader headerTitle="Help & Support" showDate={false} />

      <HelpTable tickets={MEDCONNECT_DASHBOARD_HELP_TICKETS} />
    </div>
  );
};

export default HelpAndSupport;
