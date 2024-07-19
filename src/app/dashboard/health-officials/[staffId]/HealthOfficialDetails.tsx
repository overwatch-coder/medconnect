"use client";
import GeneralInformation from "@/app/dashboard/health-officials/[staffId]/GeneralInformation";
import { IStaff } from "@/types/backend";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

type HealthOfficialDetailsProps = {
  healthOfficial: IStaff;
};

const HealthOfficialDetails = ({
  healthOfficial,
}: HealthOfficialDetailsProps) => {
  const router = useRouter();

  return (
    <div className="flex flex-col rounded w-full scrollbar-hide">
      <section className="flex items-center justify-between w-full gap-4 bg-secondary-gray">
        {/* Health Official Details Header */}
        <div className="flex items-center gap-2 px-5 py-3">
          <ArrowLeft
            onClick={() => router.push("/dashboard/health-officials")}
            strokeWidth={2}
            size={20}
            className="text-white cursor-pointer"
          />

          <p className="text-white text-center font-medium">
            {healthOfficial.fullName} ({healthOfficial.staffId.toUpperCase()})
          </p>
        </div>
      </section>

      <section>
        <GeneralInformation healthOfficial={healthOfficial} />
      </section>
    </div>
  );
};

export default HealthOfficialDetails;
