import React from "react";
import { Metadata } from "next";
import CompoundsTable from "@/app/dashboard/compounds/CompoundsTable";
import DashboardContentHeader from "@/app/dashboard/DashboardContentHeader";

export const metadata: Metadata = {
  title: "Compounds - MedConnect",
  description: "Manage your compounds with ease",
};

const Compounds = () => {
  return (
    <div className="flex flex-col gap-5 w-full">
      {/* Header */}
      <DashboardContentHeader
        headerTitle="Compounds"
        showButton={true}
        buttonLink="/dashboard/compounds/add-new"
        buttonName="Add Compound"
      />

      <CompoundsTable />
    </div>
  );
};

export default Compounds;
