"use client";
import BarChart from "@/app/dashboard/graphs/BarChart";
import LineChart from "@/app/dashboard/graphs/LineChart";
import React, { useState } from "react";
import { PieChart } from "lucide-react";
import { AiOutlineLineChart } from "react-icons/ai";
import DoughnutChart from "@/app/dashboard/graphs/DoughnutChart";

const lineChartDataSets = [
  {
    label: "Malaria",
    backgroundColor: "#FF0000",
    borderColor: "#FF6347",
    pointBackgroundColor: "#FF4500",
    pointBorderColor: "#FF6347",
    data: [95, 98, 99, 97, 96, 94, 95],
  },
  {
    label: "Respiratory Infections",
    backgroundColor: "#FFFF00",
    borderColor: "#FFD700",
    pointBackgroundColor: "#FFA500",
    pointBorderColor: "#FFD700",
    data: [50, 33, 52, 94, 135, 120, 100],
  },
  {
    label: "Gastrointestinal Diseases",
    backgroundColor: "#40E0D0",
    borderColor: "#20B2AA",
    pointBackgroundColor: "#48D1CC",
    pointBorderColor: "#20B2AA",
    data: [120, 130, 110, 115, 125, 135, 140],
  },
];

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

const AnalysisCharts = () => {
  const [chartType, setChartType] = useState<"line" | "pie">("line");

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

            <div className="flex items-center gap-2">
              <select
                name="chartType"
                id="chartType"
                onChange={(e) => setChartType(e.target.value as "line" | "pie")}
              >
                <option value="line">Line Chart</option>
                <option value="pie">Pie Chart</option>
              </select>
            </div>
            <span className="flex items-center justify-center gap-2 bg-primary-green text-white rounded-md p-2">
              {chartType === "line" ? (
                <AiOutlineLineChart size={20} className="text-white" />
              ) : (
                <PieChart size={20} className="text-white" />
              )}
            </span>
          </div>

          {/* Chart */}
          <div className="flex flex-col items-center w-full h-full pt-3">
            {chartType === "line" ? (
              <LineChart
                labels={lineChartLabels.slice(
                  0,
                  lineChartDataSets[0].data.length
                )}
                datasets={lineChartDataSets}
                position="top"
              />
            ) : (
              <DoughnutChart
                labels={[
                  "Patient Visits",
                  "Prescriptions Issued",
                  "Services Utilized",
                  "Common Diagnoses",
                  "Appointments Scheduled",
                ]}
                data={[315, 125, 200, 200, 50]}
                bgColors={[
                  "#FF0000",
                  "#FFFF00",
                  "#40E0D0",
                  "#FAB500",
                  "#2D4763",
                ]}
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
                labels={["Jan", "Feb", "Mar"]}
                datasets={[
                  {
                    label: "Jan",
                    data: [65, 59, 80],
                    backgroundColor: ["#964B00B2", "#964B00B2", "#964B00B2"],
                    borderWidth: 1,
                  },
                ]}
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
