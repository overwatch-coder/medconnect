import React from "react";
import DashboardContentHeader from "@/app/dashboard/DashboardContentHeader";
import { MEDCONNECT_DASHBOARD_NOTIFICATIONS } from "@/constants";
import NotificationTable from "@/app/dashboard/notifications/NotificationTable";
import { Metadata } from "next";

const metadata: Metadata = {
  title: "Notifications - MedConnect",
  description: "View all your notifications with ease",
  icons: {
    icon: "/favicon.ico",
  },
};

const Notification = () => {
  return (
    <div className="flex flex-col gap-5 w-full pb-10">
      {/* Header */}
      <DashboardContentHeader headerTitle={"Notifications"} showDate={false} />

      {/* Notifications */}
      <NotificationTable notifications={MEDCONNECT_DASHBOARD_NOTIFICATIONS} />
    </div>
  );
};

export default Notification;
