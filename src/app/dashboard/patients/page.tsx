import DashboardContentHeader from "@/app/dashboard/DashboardContentHeader";
import AddPatient from "@/app/dashboard/patients/add-patients/AddPatient";
import PatientDataOverview from "@/app/dashboard/patients/PatientDataOverview";
import PatientsTable from "@/app/dashboard/patients/PatientsTable";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Patients - MedConnect",
  description: "Manage your patients",
  icons: {
    icon: "/favicon.ico",
  },
};

const Patients = async () => {
  return (
    <div className="flex flex-col gap-5 w-full my-5 relative">
      <DashboardContentHeader
        headerTitle={"Patients Overview"}
        showDate={false}
      >
        <AddPatient />
      </DashboardContentHeader>

      {/* Patients Data Overview */}
      <PatientDataOverview />

      <section className="bg-white rounded-md shadow w-full">
        <div className="border-b border-b-secondary-gray w-full flex flex-col items-center">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between w-full p-3">
            <h2 className="text-secondary-gray text-xl font-medium">
              Patients Information
            </h2>

            <Button className="bg-transparent hover:bg-transparent border-2 border-primary-green hover:scale-105 transition py-2 px-5 flex items-center gap-3 rounded-md text-white">
              <Upload className="text-primary-green" size={20} />
              <span className="font-bold text-primary-green">Upload</span>
            </Button>
          </div>
        </div>

        {/* Patients Table */}
        <PatientsTable />
      </section>
    </div>
  );
};

export default Patients;
