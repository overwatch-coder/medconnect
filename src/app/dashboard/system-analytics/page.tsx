import DashboardContentHeader from "@/app/dashboard/DashboardContentHeader";
import AnalyticsSummary from "@/app/dashboard/system-analytics/AnalyticsSummary";
import SystemAnalyticsCharts from "@/app/dashboard/system-analytics/SystemAnalyticsCharts";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "System Performance and Analytics - MedConnect",
  description: "View system Performance and Analytics",
  icons: {
    icon: "/favicon.ico",
  },
};

const SystemAnalytics = async () => {
  return (
    <div className="flex flex-col gap-5 w-full my-5 relative">
      <DashboardContentHeader
        headerTitle={"System Performance and Analytics"}
        showDate={false}
      />

      <AnalyticsSummary />

      <SystemAnalyticsCharts />
    </div>
  );
};

export default SystemAnalytics;
