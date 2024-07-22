import AddAppointment from "@/app/dashboard/appointments/AddAppointment";
import AppointmentAnalytics from "@/app/dashboard/appointments/AppointmentAnalytics";
import AppointmentsTable from "@/app/dashboard/appointments/AppointmentsTable";
import DashboardContentHeader from "@/app/dashboard/DashboardContentHeader";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Appointments - MedConnect",
  description: "Manage your appointments",
  icons: {
    icon: "/favicon.ico",
  },
};

const Appointments = async () => {
  return (
    <div className="flex flex-col gap-5 w-full my-5 relative">
      <DashboardContentHeader
        headerTitle={"Appointments Overview"}
        showDate={false}
      >
        <AddAppointment />
      </DashboardContentHeader>

      {/* Patients Data Overview */}
      <AppointmentAnalytics />

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
