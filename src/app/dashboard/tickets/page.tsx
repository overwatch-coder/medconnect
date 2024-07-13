import DashboardContentHeader from "@/app/dashboard/DashboardContentHeader";
import { Metadata } from "next";
import React from "react";
import { MEDCONNECT_DASHBOARD_SUPER_ADMIN_TICKETS as tickets } from "@/constants";
import { currentUser } from "@/actions/user.action";
import AddTicket from "@/app/dashboard/tickets/AddTicket";
import TicketsWithSearch from "@/app/dashboard/tickets/TicketsWithSearch";
import TicketsAnalyticsSummary from "@/app/dashboard/tickets/TicketsAnalyticsSummary";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Help & Support - MedConnect",
  description: "Manage your help & support tickets",
  icons: {
    icon: "/favicon.ico",
  },
};

const Tickets = async () => {
  const user = await currentUser();

  return (
    <div className="flex flex-col gap-5 w-full my-5 relative">
      <DashboardContentHeader headerTitle={"Help & Support"} showDate={false}>
        <AddTicket
          tickets={tickets.map((ticket) => ({
            ...ticket,
            userId: user?.auth.id,
          }))}
        />
      </DashboardContentHeader>

      <TicketsAnalyticsSummary tickets={tickets} />

      <section className="bg-white rounded-md shadow w-full flex flex-col gap-5 p-5">
        <h2 className="text-secondary-gray text-xl font-medium">
          {"All Tickets"}
        </h2>

        <TicketsWithSearch tickets={tickets} />
      </section>
    </div>
  );
};

export default Tickets;
