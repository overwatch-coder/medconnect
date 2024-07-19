import React from "react";
import { redirect } from "next/navigation";
import HealthOfficialDetails from "@/app/dashboard/health-officials/[staffId]/HealthOfficialDetails";
import { getStaffByCompoundId } from "@/actions/staff.action";
import { currentUser } from "@/actions/user.action";

type PatientInfoProps = {
  params: {
    staffId: string;
  };
};

const getStaff = async (staffId: string, chpsId: string) => {
  const healthOfficials = await getStaffByCompoundId(chpsId);
  const healthOfficial = healthOfficials.find((data) => data._id === staffId);

  return healthOfficial;
};

export const generateMetadata = async ({
  params: { staffId },
}: PatientInfoProps) => {
  const user = await currentUser();

  const healthOfficial = await getStaff(staffId, user?.staff?.chpsCompoundId!);

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

  return {
    title: `${healthOfficial.fullName} | Health Officials`,
    description: `${healthOfficial.fullName} | Health Officials`,
    openGraph: {
      title: `${healthOfficial.fullName} | Health Officials`,
      description: `${healthOfficial.fullName} | Health Officials`,
    },
  };
};

const HealthOfficialInfo = async ({
  params: { staffId },
}: PatientInfoProps) => {
  const user = await currentUser();

  const healthOfficial = await getStaff(staffId, user?.staff?.chpsCompoundId!);

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
