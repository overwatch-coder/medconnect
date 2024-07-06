import { Metadata } from "next";
import React from "react";
import { MEDCONNECT_DASHBOARD_OUTREACH_PROGRAMS as outreachPrograms } from "@/constants";
import { redirect } from "next/navigation";
import { OutreachProgramType } from "@/types/index";
import OutreachProgramDetails from "@/app/dashboard/outreach-programs/[programId]/OutreachProgramDetails";

type PatientInfoProps = {
  params: {
    programId: string;
  };
};

export const generateMetadata = ({
  params: { programId },
}: PatientInfoProps): Metadata => {
  const program = outreachPrograms.find(
    (data) => data.id.toLowerCase() === programId.toLowerCase()
  );

  if (!program) {
    return {
      title: "Outreach Program | Not Found",
      description: "Outreach Program | Not Found",
      openGraph: {
        title: "Outreach Program | Not Found",
        description: "Outreach Program | Not Found",
      },
    };
  }

  return {
    title: `${program.title} | Outreach Programs`,
    description: `${program.title} | Outreach Programs`,
    openGraph: {
      title: `${program.title} | Outreach Programs`,
      description: `${program.title} | Outreach Programs`,
    },
  };
};

const ProgramDetails = ({ params: { programId } }: PatientInfoProps) => {
  const program: OutreachProgramType | undefined = outreachPrograms.find(
    (data) => data.id.toLowerCase() === programId.toLowerCase()
  );

  if (!program) {
    return redirect("/dashboard/outreach-programs");
  }

  return (
    <div className="flex flex-col gap-5 w-full pt-5">
      <OutreachProgramDetails program={program} />
    </div>
  );
};

export default ProgramDetails;
