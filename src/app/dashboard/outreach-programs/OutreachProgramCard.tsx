"use client";

import EditProgram from "@/app/dashboard/outreach-programs/EditProgram";
import { useAuth } from "@/hooks";
import { IOutreachProgram } from "@/types/backend";
import Image from "next/image";
import Link from "next/link";

type OutreachProgramCardProps = {
  program: IOutreachProgram;
  children: React.ReactNode;
  setPrograms: React.Dispatch<React.SetStateAction<IOutreachProgram[]>>;
};

const OutreachProgramCard = ({
  program,
  children,
  setPrograms,
}: OutreachProgramCardProps) => {
  const [user] = useAuth();
  const isSuperAdmin = user?.isSuperAdmin;

  return (
    <>
      <div className="p-5 flex flex-col md:flex-row gap-5 rounded-md shadow-md border border-[#D9D9D9] w-full h-full">
        <Image
          src={"/assets/images/community-outreach.jpg"}
          alt={program.title}
          onError={(e) => {
            e.currentTarget.src = "/assets/images/community-outreach.jpg";
            e.currentTarget.onerror = null;
          }}
          width={300}
          height={300}
          className="rounded-none object-cover h-full"
          priority={true}
        />

        <div className="flex flex-col gap-2 flex-grow w-full">
          <h2 className="text-xl font-bold text-primary-green">
            {program.title}
          </h2>

          <p className="text-sm text-primary-gray/50">
            {program.description.length > 200
              ? program.description.slice(0, 200) + "..."
              : program.description}
          </p>
          <p className="text-secondary-gray font-medium capitalize">
            {program.targetGroup}
          </p>

          {!isSuperAdmin && (
            <Link
              href={`/dashboard/outreach-programs/${program._id}`}
              className="bg-[#767676]/30 p-2 rounded text-center text-black w-fit text-xs shadow"
            >
              View More
            </Link>
          )}

          {isSuperAdmin && (
            <div className="flex items-center gap-4">
              <EditProgram program={program} setPrograms={setPrograms} />

              {children}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default OutreachProgramCard;
