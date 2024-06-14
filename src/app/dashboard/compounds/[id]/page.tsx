import CompoundDetails from "@/app/dashboard/compounds/[id]/CompoundDetails";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Compound Info - MedConnect",
  description: "All information about your compound",
};

type CompoundInfoProps = {
  params: {
    id: string;
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
