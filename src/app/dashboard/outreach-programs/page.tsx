import DashboardContentHeader from "@/app/dashboard/DashboardContentHeader";
import AddProgram from "@/app/dashboard/outreach-programs/AddProgram";
import { Metadata } from "next";
import React from "react";
import { currentUser } from "@/actions/user.action";
import OutreachProgramsWithSearch from "@/app/dashboard/outreach-programs/OutreachProgramsWithSearch";
import OutreachProgramAnalytics from "@/app/dashboard/outreach-programs/OutreachProgramAnalytics";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Outreach Programs - MedConnect",
  description: "Manage your outreach programs",
  icons: {
    icon: "/favicon.ico",
  },
};

const OutreachPrograms = async () => {
  const user = await currentUser();
  const isSuperAdmin = user?.isSuperAdmin;

  return (
    <div className="flex flex-col gap-5 w-full my-5 relative">
      <DashboardContentHeader
        headerTitle={"Community Outreach Programs"}
        showDate={false}
      >
        <AddProgram />
      </DashboardContentHeader>

      {!isSuperAdmin && (
        <p className="text-secondary-gray font-medium">
          Engaging and Supporting Our Rural Communities
        </p>
      )}

      {isSuperAdmin && <OutreachProgramAnalytics />}

      <OutreachProgramsWithSearch isAdmin={isSuperAdmin!} />
    </div>
  );
};

export default OutreachPrograms;
