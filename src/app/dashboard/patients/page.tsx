import PatientsTable from "@/app/dashboard/patients/PatientsTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
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
    <div className="flex flex-col gap-5 w-full my-5">
      <section className="bg-white rounded-md shadow">
        <div className="border-b border-b-secondary-gray w-full flex flex-col items-center">
          <div className="flex items-center justify-between w-full p-3">
            <h2 className="text-secondary-gray text-xl font-medium">
              Patients
            </h2>

            <Link href={"/patients/new"}>
              <Button className="bg-primary-green hover:bg-primary-green hover:scale-105 transition py-2 px-5 flex items-center gap-3 rounded-md text-white">
                <Plus className="text-white" size={20} />
                <span className="font-semibold">Add Patient</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Patients Table */}
        <PatientsTable />
      </section>
    </div>
  );
};

export default Patients;
