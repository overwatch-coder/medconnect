import DashboardContentHeader from "@/app/dashboard/DashboardContentHeader";
import AccountSettings from "@/app/dashboard/settings/AccountSettings";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Settings - MedConnect",
  description: "Manage your account with ease",
  icons: {
    icon: "/favicon.ico",
  },
};

const Settings = () => {
  return (
    <div className="flex flex-col gap-5 w-full">
      {/* Header */}
      <DashboardContentHeader headerTitle="Settings" showDate={false} />

      {/* Account Settings */}
      <AccountSettings />
    </div>
  );
};

export default Settings;
