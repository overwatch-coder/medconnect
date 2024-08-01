"use client";
import BarChart from "@/app/dashboard/graphs/BarChart";
import LineChart from "@/app/dashboard/graphs/LineChart";
import React, { useEffect, useState } from "react";
import { PieChart } from "lucide-react";
import { AiOutlineLineChart } from "react-icons/ai";
import DoughnutChart from "@/app/dashboard/graphs/DoughnutChart";
import { IDiagnosisReport, IVisitLogs } from "@/types/backend";
import { useFetch } from "@/hooks/useFetch";
import {
  getAllDiagnosisReports,
  getAllVisitLogs,
} from "@/actions/single-patient.action";
import seedColor from "seed-color";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const getMonthLabel = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    timeZone: "UTC",
    month: "long",
  });

const AnalysisCharts = () => {
  // diagnosis reports data
  const { data: diagnosisReportsData } = useFetch<IDiagnosisReport[]>({
    queryKey: ["diagnosis-reports"],
    queryFn: async () => await getAllDiagnosisReports(),
    enabled: true,
  });

  // visit logs data
  const { data: visitLogsData } = useFetch<IVisitLogs[]>({
    queryKey: ["visit-logs"],
    queryFn: async () => await getAllVisitLogs(),
    enabled: true,
  });

  const [diagnosisReports, setDiagnosisReports] = useState<IDiagnosisReport[]>(
    []
  );
  const [visitLogs, setVisitLogs] = useState<IVisitLogs[]>([]);

  useEffect(() => {
    if (diagnosisReportsData) {
      setDiagnosisReports(diagnosisReportsData);
    }

    if (visitLogsData) {
      setVisitLogs(visitLogsData);
    }
  }, [diagnosisReportsData, visitLogsData]);

  const [chartType, setChartType] = useState<"line" | "pie">("pie");

  // Generate random data
  const generateRandomData = (length: number, max: number) => {
    return Array.from({ length }, () => Math.floor(Math.random() * max));
  };

  // Generate data with actual first value and random subsequent values
  const generateChartData = (
    actualData: number,
    length: number,
    max: number
  ) => {
    return [actualData, ...generateRandomData(length - 1, max)];
  };

  // diagnosis reports line chart data
  const lineChartDataSets = Array.from(
    new Set(diagnosisReports.map((item) => item.finalDiagnosis.toLowerCase()))
  )
    .sort()
    .map((item) => {
      const itemName = item.charAt(0).toUpperCase() + item.slice(1);
      const actualData = diagnosisReports.filter(
        (report) => report.finalDiagnosis.toLowerCase() === item
      ).length;

      return {
        label: itemName,
        data: generateChartData(actualData, 6, 100),
        backgroundColor: seedColor(itemName).toHex(),
        borderColor: seedColor(itemName).toHex(),
        pointBackgroundColor: seedColor(itemName).toHex(),
        pointBorderColor: seedColor(itemName).toHex(),
      };
    });

  // diagnosis reports data and labels
  const diseaseAnalysisGraphLabel = Array.from(
    new Set(diagnosisReports.map((item) => item.finalDiagnosis.toLowerCase()))
  )
    .sort()
    .map((item) => item.charAt(0).toUpperCase() + item.slice(1));

  const diseaseAnalysisGraphData = diseaseAnalysisGraphLabel.map(
    (label) =>
      diagnosisReports.filter(
        (report) => report.finalDiagnosis.toLowerCase() === label.toLowerCase()
      ).length
  );

  // Aggregate visit logs by month
  const visitLogsByMonth = visitLogs.reduce(
    (acc, log) => {
      const month = getMonthLabel(log.date).slice(0, 3);
      if (!acc[month]) {
        acc[month] = 0;
      }
      acc[month]++;
      return acc;
    },
    {} as Record<string, number>
  );

  // Convert the object to an array suitable for chart.js
  const visitLogsGraphLabel = Object.keys(visitLogsByMonth);
  const visitLogsGraphData = [
    {
      label: "Visits",
      data: visitLogsGraphLabel.map((month) => visitLogsByMonth[month]),
      backgroundColor: visitLogsGraphLabel.map((month) =>
        seedColor(month).toHex()
      ),
      borderWidth: 1,
    },
  ];

  // Patient's Health Index Data
  const healthIndexLabels = ["Excellent", "Good", "Bad", "Average"];
  const healthIndexActualData: Record<string, number> = {
    Excellent: Math.floor((65 + 59 + 80) / 3),
    Good: Math.floor((65 + 59 + 80) / 3),
    Bad: Math.floor((65 + 59 + 80) / 3),
    Average: Math.floor((65 + 59 + 80) / 3),
  };

  const healthIndexGraphData = healthIndexLabels.map((label) => ({
    label,
    data: generateChartData(healthIndexActualData[label], 5, 100),
    backgroundColor: seedColor(label).toHex(),
    borderWidth: 1,
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 w-full">
      {/* Charts and Graphs */}
      <section className="flex flex-col gap-5 col-span-1 lg:col-span-2 w-full h-full">
        {/* Disease Outbreak */}
        <div className="bg-white rounded-xl p-5 col-span-1 flex flex-col gap-3 w-full">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-secondary-gray text-xl font-semibold">
              Disease Analysis
            </h2>

            {chartType === "line" ? (
              <span
                onClick={() => setChartType("pie")}
                className="flex cursor-pointer items-center justify-center gap-2 bg-primary-green text-white rounded-md p-2"
              >
                <PieChart size={20} className="text-white" />
              </span>
            ) : (
              <span
                onClick={() => setChartType("line")}
                className="flex cursor-pointer items-center justify-center gap-2 bg-primary-green text-white rounded-md p-2"
              >
                <AiOutlineLineChart size={20} className="text-white" />
              </span>
            )}
          </div>

          {/* Chart */}
          <div className="flex flex-col items-center w-full h-full pt-3">
            {chartType === "line" ? (
              <LineChart
                labels={months.slice(0, lineChartDataSets.length)}
                datasets={lineChartDataSets}
                position="top"
              />
            ) : (
              <div className="flex flex-col items-center md:w-1/2 h-full">
                <DoughnutChart
                  labels={diseaseAnalysisGraphLabel}
                  data={diseaseAnalysisGraphData}
                  bgColors={Array.from({
                    length: diseaseAnalysisGraphData.length,
                  }).map((_, i) => seedColor((i + 1).toString()).toHex())}
                />
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 h-full w-full">
          <section className="flex flex-col gap-4 items-center w-full h-full bg-white rounded-xl shadow p-5 col-span-1">
            {/* Chart 1 */}
            <h2 className="text-secondary-gray text-xl font-semibold">
              Patient&apos;s Visitation
            </h2>

            {/* Chart */}
            <div className="flex flex-col items-center w-full h-full pt-3">
              <BarChart
                labels={visitLogsGraphLabel}
                datasets={visitLogsGraphData}
                showLegend={false}
              />
            </div>
          </section>

          {/* Chart 2 */}
          <section className="flex flex-col gap-4 items-center w-full h-full p-5 bg-secondary-gray shadow rounded-xl col-span-1">
            <h2 className="text-white text-xl font-semibold">
              Patient&apos;s Health Index
            </h2>

            {/* Chart */}
            <div className="flex flex-col items-center w-full h-full pt-3">
              <BarChart
                labels={healthIndexLabels}
                datasets={healthIndexGraphData}
                position="bottom"
                stacked={true}
              />
            </div>
          </section>
        </div>
      </section>

      {/* Data Interpretation */}
      <section className="flex p-5 rounded-xl shadow flex-col gap-5 col-span-1 w-full bg-white h-full">
        {chartType === "line" ? (
          <DataInterpretation type="line" />
        ) : (
          <DataInterpretation type="pie" />
        )}
      </section>
    </div>
  );
};

export default AnalysisCharts;

const DataInterpretation = ({ type }: { type: "line" | "pie" }) => {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-primary-gray font-bold">Data Interpretation</h2>

      <div className="flex flex-col gap-3">
        <h2 className="text-primary-gray font-bold">Introduction</h2>
        <p className="text-primary-gray font-normal text-sm leading-relaxed">
          The data presented in these charts offer a comprehensive overview of
          patient health trends and visitation patterns over time. Understanding
          these trends can help in identifying potential health issues and
          improving patient care.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-primary-gray font-bold">
          {type === "line"
            ? "Line Chart Interpretation"
            : "Pie Chart Interpretation"}
        </h2>
        <p className="text-primary-gray font-normal text-sm leading-relaxed">
          {type === "line"
            ? "The line chart illustrates the variation in diagnoses over time. Each line represents a different diagnosis, showing the frequency and changes in patient conditions. This helps in tracking disease trends and understanding the progression of certain health conditions."
            : "The pie chart provides a proportional representation of various diagnoses. It helps in understanding the distribution and prevalence of different health issues among patients. This visual representation aids in quickly identifying the most common diagnoses."}
        </p>
      </div>

      <div className="flex-col gap-3 hidden">
        <h2 className="text-primary-gray font-bold">Visitation Trends</h2>
        <p className="text-primary-gray font-normal text-sm leading-relaxed">
          The bar chart showcasing patient visitation trends highlights the
          number of visits per month. This data is crucial for resource planning
          and managing patient flow. By identifying peak visitation periods,
          healthcare facilities can better allocate staff and resources to meet
          patient needs.
        </p>
      </div>

      <div className="flex-col gap-3 hidden">
        <h2 className="text-primary-gray font-bold">Health Index Analysis</h2>
        <p className="text-primary-gray font-normal text-sm leading-relaxed">
          The health index bar chart categorizes patients&apos; health status
          into Excellent, Good, and Bad. This analysis helps in understanding
          the overall health distribution of the patient population. By tracking
          these indices, healthcare providers can focus on improving the health
          status of patients in the lower categories.
        </p>
      </div>
    </div>
  );
};
