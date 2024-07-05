import { Metadata } from "next";
import React from "react";
import { MEDCONNECT_DASHBOARD_PATIENTS_HEALTH_OFFICIALS as healthOfficials } from "@/constants";
import { redirect } from "next/navigation";
import HealthOfficialDetails from "@/app/dashboard/health-officials/[staffId]/HealthOfficialDetails";

type PatientInfoProps = {
  params: {
    staffId: string;
  };
};

export const generateMetadata = ({
  params: { staffId },
}: PatientInfoProps): Metadata => {
  const healthOfficial = healthOfficials.find(
    (data) => data.staffID.toLowerCase() === staffId.toLowerCase()
  );

  if (!healthOfficial) {
    return {
      title: "Health Official | Not Found",
      description: "Health Official | Not Found",
      openGraph: {
        title: "Health Official | Not Found",
        description: "Health Official | Not Found",
      },
    };
  }

  const fullName = `${healthOfficial.firstName} ${healthOfficial.lastName}`;

  return {
    title: `${fullName} | Health Officials`,
    description: `${fullName} | Health Officials`,
    openGraph: {
      title: `${fullName} | Health Officials`,
      description: `${fullName} | Health Officials`,
    },
  };
};

const HealthOfficialInfo = ({ params: { staffId } }: PatientInfoProps) => {
  const healthOfficial = healthOfficials.find(
    (data) => data.staffID.toLowerCase() === staffId.toLowerCase()
  );

  if (!healthOfficial) {
    return redirect("/dashboard/health-officials");
  }

  return (
    <div className="flex flex-col gap-5 w-full pt-5">
      <HealthOfficialDetails healthOfficial={healthOfficial} />
    </div>
  );
};

export default HealthOfficialInfo;
