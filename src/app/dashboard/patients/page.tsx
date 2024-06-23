import AddPatient from "@/app/dashboard/patients/add-patients/AddPatient";
import PatientsTable from "@/app/dashboard/patients/PatientsTable";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Patients - MedConnect",
  description: "Manage your patients",
  icons: {
    icon: "/favicon.ico",
  },
};

const Patients = () => {
  return (
    <div className="flex flex-col gap-5 w-full my-5 relative">
      <section className="bg-white rounded-md shadow w-full">
        <div className="border-b border-b-secondary-gray w-full flex flex-col items-center">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between w-full p-3">
            <h2 className="text-secondary-gray text-xl font-medium">
              Patients
            </h2>

            <AddPatient />
          </div>
        </div>

        {/* Patients Table */}
        <PatientsTable />
      </section>
    </div>
  );
};

export default Patients;
