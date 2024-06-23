import { Metadata } from "next";
import React from "react";
import { MEDCONNECT_DASHBOARD_PATIENTS as patientsData } from "@/constants";
import { redirect } from "next/navigation";
import PatientDetails from "@/app/dashboard/patients/[patientId]/PatientDetails";

type PatientInfoProps = {
  params: {
    patientId: string;
  };
};

export const generateMetadata = ({
  params: { patientId },
}: PatientInfoProps): Metadata => {
  const patient = patientsData.find(
    (patient) => patient.patientID === patientId
  );

  if (!patient) {
    return {
      title: "Patient Not Found",
      description: "Patient Not Found",
      openGraph: {
        title: "Patient Not Found",
        description: "Patient Not Found",
      },
    };
  }

  return {
    title: `${patient.patientName} | Patient Details`,
    description: `${patient.patientName} | Patient Details`,
    openGraph: {
      title: `${patient.patientName} | Patient Details`,
      description: `${patient.patientName} | Patient Details`,
      images: [
        {
          url: patient.image,
          width: 1200,
          height: 630,
          alt: `${patient.patientName} | Patient Details`,
        },
      ],
    },
  };
};

const PatientInfo = ({ params: { patientId } }: PatientInfoProps) => {
  const patient = patientsData.find(
    (patient) => patient.patientID === patientId
  );

  if (!patient) {
    return redirect("/");
  }

  return (
    <div className="flex flex-col gap-5 w-full pt-5">
      <PatientDetails patient={patient} />
    </div>
  );
};

export default PatientInfo;
