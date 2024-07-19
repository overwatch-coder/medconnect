import DashboardContentHeader from "@/app/dashboard/DashboardContentHeader";
import AddOfficial from "@/app/dashboard/health-officials/add-official/AddOfficial";
import HealthOfficialDataAnalytics from "@/app/dashboard/health-officials/HealthOfficialDataAnalytics";
import HealthOfficialsTable from "@/app/dashboard/health-officials/HealthOfficialsTable";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Health Officials - MedConnect",
  description: "Manage your health Officials",
  icons: {
    icon: "/favicon.ico",
  },
};

const HealthOfficials = async () => {
  return (
    <div className="flex flex-col gap-5 w-full my-5 relative">
      <DashboardContentHeader
        headerTitle={"Health Officials Overview"}
        showDate={false}
      >
        <AddOfficial />
      </DashboardContentHeader>

      {/* Data Overview */}
      <HealthOfficialDataAnalytics />

      <section className="bg-white rounded-md shadow w-full">
        <div className="border-b border-b-secondary-gray w-full flex flex-col items-center">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between w-full p-3">
            <h2 className="text-secondary-gray text-xl font-medium">
              Health Officials
            </h2>

            <Button className="bg-transparent hover:bg-transparent border-2 border-primary-green hover:scale-105 transition py-2 px-5 flex items-center gap-3 rounded-md text-white">
              <Upload className="text-primary-green" size={20} />
              <span className="font-bold text-primary-green">Upload</span>
            </Button>
          </div>
        </div>

        {/* Health Officials Table */}
        <HealthOfficialsTable />
      </section>
    </div>
  );
};

export default HealthOfficials;
