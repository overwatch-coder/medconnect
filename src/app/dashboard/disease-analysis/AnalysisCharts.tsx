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

// const lineChartDataSets = [
//   {
//     label: "Malaria",
//     backgroundColor: "#FF0000",
//     borderColor: "#FF6347",
//     pointBackgroundColor: "#FF4500",
//     pointBorderColor: "#FF6347",
//     data: [95, 98, 99, 97, 96, 94, 95],
//   },
//   {
//     label: "Respiratory Infections",
//     backgroundColor: "#FFFF00",
//     borderColor: "#FFD700",
//     pointBackgroundColor: "#FFA500",
//     pointBorderColor: "#FFD700",
//     data: [50, 33, 52, 94, 135, 120, 100],
//   },
//   {
//     label: "Gastrointestinal Diseases",
//     backgroundColor: "#40E0D0",
//     borderColor: "#20B2AA",
//     pointBackgroundColor: "#48D1CC",
//     pointBorderColor: "#20B2AA",
//     data: [120, 130, 110, 115, 125, 135, 140],
//   },
// ];

const lineChartLabels = [
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

  const [chartType, setChartType] = useState<"line" | "pie">("line");

  // diagnosis reports line chart data
  const lineChartDataSets = diagnosisReports.map((item) => {
    return {
      label:
        item.finalDiagnosis.toLowerCase().charAt(0).toUpperCase() +
        item.finalDiagnosis.toLowerCase().slice(1),
      backgroundColor: seedColor(item.doctorName).toHex(),
      borderColor: seedColor(item.diagnosisReportId).toHex(),
      pointBackgroundColor: seedColor(item.date).toHex(),
      pointBorderColor: seedColor(item._id).toHex(),
      data: Array.from({ length: diagnosisReports.length }).map(
        (_, i) =>
          diagnosisReports.filter(
            (report) =>
              report.finalDiagnosis.toLowerCase() ===
              item.finalDiagnosis.toLowerCase()
          ).length
      ),
    };
  });

  // diagnosis reports data and labels
  const diseaseAnalysisGraphLabel = Array.from(
    new Set(diagnosisReports.map((item) => item.finalDiagnosis.toLowerCase()))
  )
    .sort()
    .map((item) => item.charAt(0).toUpperCase() + item.slice(1));

  const diseaseAnalysisGraphData = Array.from(
    new Set(diagnosisReports.map((item) => item.finalDiagnosis.toLowerCase()))
  )
    .sort()
    .map(
      (item) =>
        diagnosisReports.filter(
          (report) => report.finalDiagnosis.toLowerCase() === item
        ).length
    );

  const visitLogsByMonth = visitLogs.map((item) => ({
    label: getMonthLabel(item.date).slice(0, 3),
    data: Array.from({ length: visitLogs.length }).map(
      (_, i) =>
        visitLogs.filter(
          (log) => getMonthLabel(log.date) === getMonthLabel(item.date)
        ).length
    ),
    backgroundColor: seedColor(new Date(item.date).toDateString()).toHex(),
    borderWidth: 1,
  }));

  // Convert the object to an array
  const visitLogsGraphData = Object.values(visitLogsByMonth);

  // Get the labels for the graph
  const visitLogsGraphLabel = visitLogsByMonth.map((item) => item.label);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 w-full">
      {/* Charts and Graphs */}
      <section className="flex flex-col gap-5 col-span-1 lg:col-span-2 w-full h-full">
        {/* Disease Outbreak */}
        <div className="bg-white rounded-xl p-5 col-span-1 flex flex-col gap-3  w-full">
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
                labels={Array.from(
                  new Set(lineChartDataSets.map((item) => item.label))
                )
                  .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
                  .map((item) => item.slice(0, 3))}
                datasets={lineChartDataSets}
                position="top"
              />
            ) : (
              <DoughnutChart
                labels={diseaseAnalysisGraphLabel}
                data={diseaseAnalysisGraphData}
                bgColors={Array.from({
                  length: diseaseAnalysisGraphData.length,
                }).map((_, i) => seedColor((i + 1).toString()).toHex())}
              />
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
                labels={visitLogsGraphLabel.map((item) => item.slice(0, 3))}
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
                labels={["q1", "q2", "q3", "q4"]}
                datasets={[
                  {
                    label: "Excellent",
                    data: [65, 59, 80],
                    backgroundColor: "#40E0D0",
                    borderWidth: 1,
                  },
                  {
                    label: "Good",
                    data: [65, 59, 80],
                    backgroundColor: "#FFFF00",
                    borderWidth: 1,
                  },
                  {
                    label: "Bad",
                    data: [65, 59, 80],
                    backgroundColor: "#FF0000",
                    borderWidth: 1,
                  },
                ]}
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
          Quisque efficitur ligula et risus tristique, non volutpat leo posuere.
          Cras et auctor quam. Sed nisl libero, porttitor at accumsan at,
          condimentum at elit. Aliquam erat volutpat. Nunc in lectus quis ipsum
          hendrerit interdum. Suspendisse sed purus sem. Sed ut consectetur
          justo. Quisque id sagittis ligula, quis vehicula metus. Nullam est
          nulla, viverra vitae vehicula eget, molestie ut ligula.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-primary-gray font-bold">
          {type === "line"
            ? "Line Chart Interpretation"
            : "Pie Chart Interpretation"}
        </h2>

        <p className="text-primary-gray font-normal text-sm leading-relaxed">
          Quisque efficitur ligula et risus tristique, non volutpat leo posuere.
          Cras et auctor quam. Sed nisl libero, porttitor at accumsan at,
          condimentum at elit. Aliquam erat volutpat. Nunc in lectus quis ipsum
          hendrerit interdum. Suspendisse sed purus sem. Sed ut consectetur
          justo. Quisque id sagittis ligula, quis vehicula metus. Nullam est
          nulla, viverra vitae vehicula eget, molestie ut ligula.
        </p>
      </div>
    </div>
  );
};
