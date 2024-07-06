import DashboardContentHeader from "@/app/dashboard/DashboardContentHeader";
import { Metadata } from "next";
import React from "react";
import {
  MEDCONNECT_DASHBOARD_REPORT_TYPES_ADMIN,
  MEDCONNECT_DASHBOARD_REPORT_TYPES_SUPER_ADMIN,
} from "@/constants";
import { currentServerUser } from "@/actions/user.action";
import GenerateReports from "@/app/dashboard/reports/GenerateReports";

export const dynamic = "force-dynamic";

export type ReportType =
  (typeof MEDCONNECT_DASHBOARD_REPORT_TYPES_ADMIN)[number];

export const metadata: Metadata = {
  title: "Reports - MedConnect",
  description: "Manage your reports",
  icons: {
    icon: "/favicon.ico",
  },
};

const Reports = async () => {
  const user = await currentServerUser();
  const isAdmin = user?.compoundName.toLowerCase() === "admin";

  const reportTypes = isAdmin
    ? MEDCONNECT_DASHBOARD_REPORT_TYPES_SUPER_ADMIN
    : MEDCONNECT_DASHBOARD_REPORT_TYPES_ADMIN;

  return (
    <div className="flex flex-col gap-5 w-full my-5 relative">
      <DashboardContentHeader headerTitle={"Reports"} showDate={false} />

      <GenerateReports reports={reportTypes} user={user!} isAdmin={isAdmin} />
    </div>
  );
};

export default Reports;
