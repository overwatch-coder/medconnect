import CompoundDetails from "@/app/dashboard/compounds/[id]/CompoundDetails";
import { Metadata } from "next";
import React from "react";
import { MEDCONNECT_SUPER_ADMIN_DASHBOARD_COMPOUNDS_WITH_ACTIONS as compoundsData } from "@/constants";

type CompoundInfoProps = {
  params: {
    id: string;
  };
};

export const generateMetadata = ({
  params: { id },
}: CompoundInfoProps): Metadata => {
  const compoundData = compoundsData.find(
    (compound) => compound.compoundId === id
  );

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
    title: `${compoundData.compoundName} | MedConnect`,
    description: `${compoundData.compoundName} | MedConnect`,
    openGraph: {
      title: `${compoundData.compoundName} | MedConnect`,
      description: `${compoundData.compoundName} | MedConnect`,
    },
  };
};

const CompoundInfo = ({ params: { id } }: CompoundInfoProps) => {
  return (
    <div className="flex flex-col gap-5 w-full">
      <CompoundDetails id={id} />
    </div>
  );
};

export default CompoundInfo;
