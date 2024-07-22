import CompoundDetails from "@/app/dashboard/compounds/[id]/CompoundDetails";
import { Metadata } from "next";
import React from "react";
import { MEDCONNECT_SUPER_ADMIN_DASHBOARD_COMPOUNDS_WITH_ACTIONS as compoundsData } from "@/constants";
import { getChpsById, getChpsCompound } from "@/actions/chps-compound.action";
import { RenderEmptyComponent } from "@/app/dashboard/health-officials/HealthOfficialsTable";
import Link from "next/link";

type CompoundInfoProps = {
  params: {
    id: string;
  };
};

export const generateMetadata = async ({
  params: { id },
}: CompoundInfoProps) => {
  const compoundData = await getChpsById(id);

  if (!compoundData) {
    return {
      title: "Compound Info - Not Found | MedConnect",
      description: "Compound Info - Not Found | MedConnect",
      openGraph: {
        title: "Compound Info - Not Found | MedConnect",
        description: "Compound Info | Not Found",
      },
    };
  }

  return {
    title: `${compoundData.name} | MedConnect`,
    description: `${compoundData.name} | MedConnect`,
    openGraph: {
      title: `${compoundData.name} | MedConnect`,
      description: `${compoundData.name} | MedConnect`,
    },
  };
};

const CompoundInfo = async ({ params: { id } }: CompoundInfoProps) => {
  const compoundData = await getChpsById(id);

  if (!compoundData) {
    return (
      <RenderEmptyComponent>
        <div className="flex max-w-sm flex-col gap-5 w-full items-center justify-center">
          <p className="text-secondary-gray text-lg font-bold text-center">
            No compound found
          </p>

          <Link href="/dashboard/compounds">
            <button className="bg-primary-green hover:bg-primary-green w-full text-white rounded">
              Go Back
            </button>
          </Link>
        </div>
      </RenderEmptyComponent>
    );
  }

  return (
    <div className="flex flex-col gap-5 w-full">
      <CompoundDetails id={id} compoundData={compoundData} />
    </div>
  );
};

export default CompoundInfo;
