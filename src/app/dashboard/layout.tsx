import DashboardSidebar from "@/app/dashboard/DashboardSidebar";
import { Metadata } from "next";
import React from "react";
import DashboardHeader from "@/app/dashboard/DashboardHeader";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: "Dashboard - MedConnect",
  description: "Manage your account with ease",
  icons: [
    {
      rel: "icon",
      url: "/favicon.ico",
    },
  ],
};

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
  return (
    <section className="flex flex-col md:flex-row justify-between gap-5 relative">
      <DashboardSidebar />

      <main className="flex flex-col w-full min-h-screen flex-grow ml-[70px] md:ml-[250px] bg-secondary-gray/10 overflow-y-scroll scrollbar-hide">
        <DashboardHeader />
        <div className="px-3">{children}</div>
      </main>
    </section>
  );
};

export default DashboardLayout;
