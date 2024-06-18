import DashboardSidebar from "@/app/dashboard/DashboardSidebar";
import { Metadata } from "next";
import React from "react";
import DashboardHeader from "@/app/dashboard/DashboardHeader";
import { getUserFromCookies } from "@/actions/user.action";
import { redirect } from "next/navigation";

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
  const user = await getUserFromCookies();

  if (!user || user === null) {
    return redirect("/login?redirect=/dashboard");
  }

  return (
    <section className="flex min-h-screen relative w-full">
      <DashboardSidebar />

      <main className="lg:ml-60 flex flex-col flex-grow min-h-screen ml-16 relative w-full">
        {/* Header */}
        <DashboardHeader />

        {/* Content */}
        <div className="px-3 mb-auto w-full">{children}</div>

        {/* Footer */}
        <div className="py-2 px-3">
          <p className="text-secondary-gray text-sm font-semibold">
            &copy; Copyright CampusGuardian {new Date().getFullYear()} . All
            rights reserved
          </p>
        </div>
      </main>
    </section>
  );
};

export default DashboardLayout;
