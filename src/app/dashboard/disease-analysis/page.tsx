import DashboardContentHeader from "@/app/dashboard/DashboardContentHeader";
import AnalysisPeriodDropdown from "@/app/dashboard/disease-analysis/AnalysisPeriodDropdown";
import { Metadata } from "next";
import React from "react";
import AnalysisCharts from "@/app/dashboard/disease-analysis/AnalysisCharts";

export const metadata: Metadata = {
  title: "Disease Analysis - MedConnect",
  description: "Get a detailed analysis of your patients",
  icons: {
    icon: "/favicon.ico",
  },
};

const DiseaseAnalysis = () => {
  return (
    <div className="flex flex-col gap-5 w-full my-5 relative">
      <DashboardContentHeader
        headerTitle={"Disease Outbreak Analysis"}
        showDate={false}
      >
        <AnalysisPeriodDropdown />
      </DashboardContentHeader>

      <AnalysisCharts />
    </div>
  );
};

export default DiseaseAnalysis;
