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
    <section className="flex flex-col lg:flex-row justify-between gap-5 w-full">
      <DashboardSidebar />

      <main className="flex flex-col w-full min-h-screen flex-grow ml-[70px] lg:ml-[250px] overflow-y-scroll scrollbar-hide relative">
        {/* Header */}
        <DashboardHeader />

        {/* Content */}
        <div className="px-3 mb-auto">{children}</div>

        {/* Footer */}
        <div className="py-2 px-3">
          <p className="text-secondary-gray font-semibold">
            &copy; Copyright CampusGuardian {new Date().getFullYear()} . All
            rights reserved
          </p>
        </div>
      </main>
    </section>
  );
};

export default DashboardLayout;
