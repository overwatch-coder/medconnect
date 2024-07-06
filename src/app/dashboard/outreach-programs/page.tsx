import DashboardContentHeader from "@/app/dashboard/DashboardContentHeader";
import AddProgram from "@/app/dashboard/outreach-programs/AddProgram";
import { Metadata } from "next";
import React from "react";
import { MEDCONNECT_DASHBOARD_OUTREACH_PROGRAMS as outreachPrograms } from "@/constants";
import { currentServerUser } from "@/actions/user.action";
import { IoIosArrowRoundUp } from "react-icons/io";
import OutreachProgramsWithSearch from "@/app/dashboard/outreach-programs/OutreachProgramsWithSearch";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Outreach Programs - MedConnect",
  description: "Manage your outreach programs",
  icons: {
    icon: "/favicon.ico",
  },
};

const OutreachPrograms = async () => {
  const user = await currentServerUser();
  const isAdmin = user?.compoundName.toLowerCase() === "admin";

  return (
    <div className="flex flex-col gap-5 w-full my-5 relative">
      <DashboardContentHeader
        headerTitle={"Community Outreach Programs"}
        showDate={false}
      >
        <AddProgram />
      </DashboardContentHeader>

      {!isAdmin && (
        <p className="text-secondary-gray font-medium">
          Engaging and Supporting Our Rural Communities
        </p>
      )}

      {isAdmin && (
        <div className="flex flex-col gap-2 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
            {/* Total Programs */}
            <div className="bg-white rounded-md p-4 col-span-1 flex flex-col gap-3  w-full">
              <h2 className="font-semibold text-secondary-gray md:text-lg">
                Total Programs
              </h2>

              <p className="font-bold text-2xl relative text-primary-green">
                <span>50</span>
                <span className="text-xs text-secondary-gray absolute bottom-0 left-10 flex items-center gap-1">
                  <IoIosArrowRoundUp size={10} className="text-red-500" />{" "}
                  <span className="text-red-500">20%</span>{" "}
                  <span>from last period</span>
                </span>
              </p>
            </div>

            {/* Upcoming Programs */}
            <div className="bg-white rounded-md p-4 col-span-1 flex flex-col gap-3  w-full">
              <h2 className="font-semibold text-secondary-gray md:text-lg">
                Upcoming Programs
              </h2>

              <p className="font-bold text-2xl relative text-primary-green">
                <span>15</span>
              </p>

              <p className="flex flex-col gap-1">
                <span className="text-secondary-gray font-bold text-xs">
                  Next
                </span>
                <span className="text-xs text-primary-gray/50">12/10/2024</span>
              </p>
            </div>

            {/* Participating Compounds */}
            <div className="bg-white rounded-md p-4 col-span-1 flex flex-col gap-3  w-full">
              <h2 className="font-semibold text-secondary-gray md:text-lg">
                Participating Compounds
              </h2>

              <p className="font-bold text-2xl relative text-primary-green">
                <span>30</span>
                <span className="text-xs text-secondary-gray absolute bottom-0 left-10 flex items-center gap-1">
                  <IoIosArrowRoundUp size={10} className="text-red-500" />{" "}
                  <span className="text-red-500">10</span>{" "}
                  <span>from last program</span>
                </span>
              </p>
            </div>

            {/* Program Feedback */}
            <div className="bg-white rounded-md p-4 col-span-1 flex flex-col gap-3  w-full">
              <h2 className="font-semibold text-secondary-gray md:text-lg">
                Program Feedback
              </h2>

              <p className="font-bold text-2xl relative text-primary-green">
                <span>4.5</span>
              </p>
            </div>
          </div>
        </div>
      )}

      <section className="bg-white rounded-md shadow w-full flex flex-col gap-5 p-5">
        <h2 className="text-secondary-gray text-xl font-medium">
          {isAdmin ? "All Programs" : "Upcoming"}
        </h2>

        <OutreachProgramsWithSearch
          outreachPrograms={outreachPrograms}
          isAdmin={isAdmin}
        />
      </section>
    </div>
  );
};

export default OutreachPrograms;
