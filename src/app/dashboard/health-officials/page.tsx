import DashboardContentHeader from "@/app/dashboard/DashboardContentHeader";
import AddOfficial from "@/app/dashboard/health-officials/add-official/AddOfficial";
import HealthOfficialsTable from "@/app/dashboard/health-officials/HealthOfficialsTable";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { Metadata } from "next";
import React from "react";
import { IoIosArrowRoundUp } from "react-icons/io";

export const metadata: Metadata = {
  title: "Health Officials - MedConnect",
  description: "Manage your health Officials",
  icons: {
    icon: "/favicon.ico",
  },
};

const HealthOfficials = () => {
  return (
    <div className="flex flex-col gap-5 w-full my-5 relative">
      <DashboardContentHeader
        headerTitle={"Health Officials Overview"}
        showDate={false}
      >
        <AddOfficial />
      </DashboardContentHeader>

      {/* Data Overview */}
      <div className="flex flex-col gap-2 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {/* Total Number of Health Workers */}
          <div className="bg-white rounded-md p-4 col-span-1 flex flex-col gap-3  w-full">
            <h2 className="font-semibold text-secondary-gray md:text-lg">
              Total Number of Health Workers
            </h2>

            <p className="font-bold text-2xl relative text-primary-green">
              <span>60</span>
              <span className="text-red-500 text-xs absolute bottom-0 left-10 flex items-center">
                <IoIosArrowRoundUp size={10} className="text-red-500" />{" "}
                <span>10%</span>
              </span>
            </p>
          </div>

          {/* Nurses */}
          <div className="bg-white rounded-md p-4 col-span-1 flex flex-col gap-3  w-full">
            <h2 className="font-semibold text-secondary-gray md:text-lg">
              Nurses
            </h2>

            <p className="font-bold text-2xl relative text-primary-green">
              <span>30</span>
            </p>
          </div>

          {/* Physician Assistants */}
          <div className="bg-white rounded-md p-4 col-span-1 flex flex-col gap-3  w-full">
            <h2 className="font-semibold text-secondary-gray md:text-lg">
              Physician Assistants
            </h2>

            <p className="font-bold text-2xl relative text-primary-green">
              <span>15</span>
            </p>
          </div>

          {/* Community Health Workers */}
          <div className="bg-white rounded-md p-4 col-span-1 flex flex-col gap-3  w-full">
            <h2 className="font-semibold text-secondary-gray md:text-lg">
              Community Health Workers
            </h2>

            <p className="font-bold text-2xl relative text-primary-green">
              <span>7</span>
            </p>
          </div>
        </div>
      </div>

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
