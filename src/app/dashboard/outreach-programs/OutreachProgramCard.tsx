"use client";

import EditProgram from "@/app/dashboard/outreach-programs/EditProgram";
import { useUserAtom } from "@/hooks";
import { OutreachProgramType } from "@/types/index";
import Image from "next/image";
import Link from "next/link";

type OutreachProgramCardProps = {
  program: OutreachProgramType;
  children: React.ReactNode;
};

const OutreachProgramCard = ({
  program,
  children,
}: OutreachProgramCardProps) => {
  const [user] = useUserAtom();
  const isAdmin = user.user?.compoundName === "admin";

  return (
    <>
      <div className="p-5 flex flex-col md:flex-row gap-5 rounded-md shadow-md border border-[#D9D9D9] w-full h-full">
        <Image
          src={program.image ?? "/assets/images/community-outreach.jpg"}
          alt={program.title}
          onError={(e) => {
            e.currentTarget.src = "/assets/images/community-outreach.jpg";
            e.currentTarget.onerror = null;
          }}
          width={200}
          height={200}
          className="rounded-none object-cover h-full"
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
          <p className="text-secondary-gray font-medium">
            {program.targetGroup}
          </p>

          {!isAdmin && (
            <Link
              href={`/dashboard/outreach-programs/${program.id}`}
              className="bg-[#767676]/30 p-2 rounded text-center text-black w-fit text-xs shadow"
            >
              View More
            </Link>
          )}

          {isAdmin && (
            <div className="flex items-center gap-4">
              <EditProgram program={program} />

              {children}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default OutreachProgramCard;
