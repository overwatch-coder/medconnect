import DashboardSidebar from "@/app/dashboard/DashboardSidebar";
import { Metadata } from "next";
import React from "react";
import DashboardHeader from "@/app/dashboard/DashboardHeader";
import { redirect } from "next/navigation";
import DashboardProvider from "@/providers/DashboardProvider";
import { currentUser } from "@/actions/user.action";

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
  const user = await currentUser();

  if (!user || user === null) {
    return redirect("/login?redirect=/dashboard");
  }

  return (
    <DashboardProvider>
      <section className="flex min-h-screen relative w-full">
        <DashboardSidebar />
        <main className="lg:ml-60 flex flex-col flex-grow min-h-screen md:ml-16 relative w-full">
          {/* Header */}
          <DashboardHeader />

          {/* Content */}
          <div className="px-3 mb-auto w-full">{children}</div>

          {/* Footer */}
          <div className="py-2 px-3">
            <p className="text-secondary-gray text-sm font-semibold">
              &copy; Copyright medconnect {new Date().getFullYear()} . All
              rights reserved
            </p>
          </div>
        </main>
      </section>
    </DashboardProvider>
  );
};

export default DashboardLayout;
