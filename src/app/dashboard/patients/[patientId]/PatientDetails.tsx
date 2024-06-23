"use client";
import { PatientsDataType } from "@/app/dashboard/patients/PatientsTable";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GeneralInformation from "@/app/dashboard/patients/[patientId]/GeneralInformation";
import MedicalHistory from "@/app/dashboard/patients/[patientId]/MedicalHistory";
import Prescription from "@/app/dashboard/patients/[patientId]/Prescription";
import TreatmentPlan from "@/app/dashboard/patients/[patientId]/TreatmentPlan";
import DiagnosisReport from "@/app/dashboard/patients/[patientId]/DiagnosisReport";
import VisitLogs from "@/app/dashboard/patients/[patientId]/VisitLogs";

type PatientDetailsProps = {
  patient: PatientsDataType;
};

const tabsMenu = [
  {
    name: "General Information",
    value: "general-information",
  },
  {
    name: "Medical History",
    value: "medical-history",
  },
  {
    name: "Prescription",
    value: "prescription",
  },
  {
    name: "Treatment Plan",
    value: "treatment-plan",
  },
  {
    name: "Diagnosis Report",
    value: "diagnosis-report",
  },
  {
    name: "Visit Logs",
    value: "visit-logs",
  },
];

const PatientDetails = ({ patient }: PatientDetailsProps) => {
  const router = useRouter();
  return (
    <div className="flex flex-col rounded w-full scrollbar-hide">
      <section className="flex items-center justify-between w-full gap-4 bg-primary-green">
        {/* Patient Details Header */}
        <div className="flex items-center gap-2 px-5 py-3">
          <ArrowLeft
            onClick={() => router.push("/dashboard/patients")}
            strokeWidth={2}
            size={20}
            className="text-white cursor-pointer"
          />

          <p className="text-white text-center font-medium">
            {patient.patientName} ({patient.patientID.toUpperCase()})
          </p>
        </div>
      </section>

      <section>
        <Tabs defaultValue={tabsMenu[0].value} className="w-full">
          <TabsList className="flex flex-row items-center w-full justify-between bg-transparent text-primary-gray/50 py-2 flex-wrap px-3">
            {tabsMenu.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="data-[state=active]:text-secondary-gray data-[state=active]:font-bold data-[state=active]:border-b-2 data-[state=active]:border-primary-green data-[state=active]:bg-transparent hover:bg-transparent hover:text-secondary-gray hover:font-bold data-[state=active]:rounded-none hover:border-b-2 hover:border-primary-green hover:rounded-none"
              >
                {tab.name}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent
            value={tabsMenu[0].value}
            className="mt-20 sm:mt-10 md:mt-5"
          >
            <GeneralInformation patient={patient} />
          </TabsContent>
          <TabsContent
            value={tabsMenu[1].value}
            className="mt-20 sm:mt-10 md:mt-5"
          >
            <MedicalHistory />
          </TabsContent>
          <TabsContent
            value={tabsMenu[2].value}
            className="mt-20 sm:mt-10 md:mt-5"
          >
            <Prescription />
          </TabsContent>
          <TabsContent
            value={tabsMenu[3].value}
            className="mt-20 sm:mt-10 md:mt-5"
          >
            <TreatmentPlan />
          </TabsContent>
          <TabsContent
            value={tabsMenu[4].value}
            className="mt-20 sm:mt-10 md:mt-5"
          >
            <DiagnosisReport />
          </TabsContent>
          <TabsContent
            value={tabsMenu[5].value}
            className="mt-20 sm:mt-10 md:mt-5"
          >
            <VisitLogs />
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};

export default PatientDetails;
