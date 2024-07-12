import React from "react";
import { redirect } from "next/navigation";
import PatientDetails from "@/app/dashboard/patients/[patientId]/PatientDetails";
import { getPatient } from "@/actions/patients.action";

type PatientInfoProps = {
  params: {
    patientId: string;
  };
};

export const generateMetadata = async ({
  params: { patientId },
}: PatientInfoProps) => {
  const patient = await getPatient(patientId);

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
    title: `${patient.firstName} ${patient.lastName} | Patient Details`,
    description: `${patient.firstName} ${patient.lastName} | Patient Details`,
    openGraph: {
      title: `${patient.firstName} ${patient.lastName} | Patient Details`,
      description: `${patient.firstName} ${patient.lastName} | Patient Details`,
      images: [
        {
          url: patient.profilePictureUrl,
          width: 1200,
          height: 630,
          alt: `${patient.firstName} ${patient.lastName} | Patient Details`,
        },
      ],
    },
  };
};

const PatientInfo = async ({ params: { patientId } }: PatientInfoProps) => {
  const patient = await getPatient(patientId);

  if (!patient) {
    return redirect("/dashboard/patients");
  }

  return (
    <div className="flex flex-col gap-5 w-full pt-5">
      <PatientDetails patient={patient} />
    </div>
  );
};

export default PatientInfo;
