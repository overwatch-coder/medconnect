import AddAppointment from "@/app/dashboard/appointments/AddAppointment";
import AppointmentsTable from "@/app/dashboard/appointments/AppointmentsTable";
import DashboardContentHeader from "@/app/dashboard/DashboardContentHeader";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { IoIosArrowRoundUp } from "react-icons/io";

export const metadata: Metadata = {
  title: "Appointments - MedConnect",
  description: "Manage your appointments",
  icons: {
    icon: "/favicon.ico",
  },
};

const Appointments = () => {
  return (
    <div className="flex flex-col gap-5 w-full my-5 relative">
      <DashboardContentHeader
        headerTitle={"Appointments Overview"}
        showDate={false}
      >
        <AddAppointment />
      </DashboardContentHeader>

      {/* Patients Data Overview */}
      <div className="flex flex-col gap-2 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {/* Total Appointments */}
          <div className="bg-white rounded-md p-4 col-span-1 flex flex-col gap-3  w-full">
            <h2 className="font-semibold text-secondary-gray md:text-lg">
              Total Appointments
            </h2>

            <p className="font-bold text-2xl relative text-primary-green">
              <span>60</span>
              <span className="text-red-500 text-xs absolute bottom-0 left-10 flex items-center">
                <IoIosArrowRoundUp size={10} className="text-red-500" />{" "}
                <span>10%</span>
              </span>
            </p>

            {/* Type of Appointment */}
            <div className="flex flex-col gap-4">
              <h3 className="font-semibold text-secondary-gray">
                Type of Appointment
              </h3>

              <div className="flex items-center gap-2">
                <p className="flex flex-col gap-1 text-secondary-gray">
                  <span className="font-bold text-sm">145</span>
                  <span className="font-light text-xs">
                    General Consultation
                  </span>
                </p>

                <p className="flex flex-col gap-1 text-secondary-gray">
                  <span className="font-bold text-sm">145</span>
                  <span className="font-light text-xs">Follow Up</span>
                </p>
              </div>
            </div>
          </div>

          {/* Upcoming Appointments */}
          <div className="bg-white rounded-md p-4 col-span-1 flex flex-col gap-3  w-full">
            <h2 className="font-semibold text-secondary-gray md:text-lg">
              Upcoming Appointments
            </h2>

            <p className="font-bold text-2xl relative text-primary-green">
              <span>30</span>
            </p>
          </div>

          {/* Completed Appointments */}
          <div className="bg-white rounded-md p-4 col-span-1 flex flex-col gap-3  w-full">
            <h2 className="font-semibold text-secondary-gray md:text-lg">
              Completed Appointments
            </h2>

            <p className="font-bold text-2xl relative text-primary-green">
              <span>15</span>
            </p>
          </div>

          {/* Cancelled Appointments */}
          <div className="bg-white rounded-md p-4 col-span-1 flex flex-col gap-3  w-full">
            <h2 className="font-semibold text-secondary-gray md:text-lg">
              Cancelled Appointments
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
              Appointments
            </h2>
          </div>
        </div>

        {/* Appointments Table */}
        <AppointmentsTable />
      </section>
    </div>
  );
};

export default Appointments;
