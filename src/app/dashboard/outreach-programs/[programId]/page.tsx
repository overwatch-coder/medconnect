import React from "react";
import { redirect } from "next/navigation";
import OutreachProgramDetails from "@/app/dashboard/outreach-programs/[programId]/OutreachProgramDetails";
import { getOutreachProgram } from "@/actions/outreach-programs.actions";

type PatientInfoProps = {
  params: {
    programId: string;
  };
};

export const generateMetadata = async ({
  params: { programId },
}: PatientInfoProps) => {
  const program = await getOutreachProgram(programId);

  if (!program) {
    return {
      title: "Outreach Program Not Found | MedConnect",
      description: "Outreach Program Not Found | MedConnect",
    };
  }

  return {
    title: `${program.title} | Outreach Programs - MedConnect`,
    description: `${program.title} | Outreach Programs - MedConnect`,
  };
};

const ProgramDetails = async ({ params: { programId } }: PatientInfoProps) => {
  const program = await getOutreachProgram(programId);

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
