import DashboardSidebar from "@/app/dashboard/DashboardSidebar";
import { Metadata } from "next";
import React from "react";
import Header from "@/components/Header";

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
      {/* Show only on desktop and tablets */}
      <DashboardSidebar />

      <main className="flex flex-col w-full flex-grow ml-[70px] sm:ml-[250px] mb-auto md:mb-0">
        {children}
      </main>
    </section>
  );
};

export default DashboardLayout;
