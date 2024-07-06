"use client";

import BarChart from "@/app/dashboard/graphs/BarChart";
import LineChart from "@/app/dashboard/graphs/LineChart";
import { getAllMonths } from "@/lib/utils";
import React from "react";
import { GrPowerCycle } from "react-icons/gr";

const responseTimeData = [50, 60, 70, 100, 125, 150, 150, 200];
const uptimeData = [85, 90, 75, 72, 78, 95, 100];
const activeUsersData = [
  1200, 1150, 2100, 1600, 2100, 1650, 1200, 1800, 1620, 1650,
];
const errorRateData = [0.3, 0.6, 0.5, 0.8, 0.3, 0.2];

const SystemAnalyticsCharts = () => {
  return (
    <div className="w-full h-full flex flex-col gap-10">
      {/* First Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
        {/* Response Time Over Time */}
        <div className="rounded-md shadow bg-white w-full h-full col-span-1 xl:col-span-2">
          <h2 className="flex items-center justify-between gap-2 px-3 py-3">
            <span className="text-secondary-gray font-medium">
              Response Time Over Time
            </span>
            <GrPowerCycle size={20} className="text-red-500 cursor-pointer" />
          </h2>

          <hr className="w-full bg-secondary-gray h-0.5" />

          <div className="flex flex-col items-center gap-3 px-3 py-5 w-full h-full">
            {/* Graph Goes Here */}
            <div className="flex flex-col items-center w-full h-full pt-5">
              <LineChart
                labels={getAllMonths(1, true)
                  .slice(0, 6)
                  .map((month) => month.substring(0, 3))}
                datasets={[
                  {
                    label: "Response Time Over Time",
                    backgroundColor: "#FF0000",
                    borderColor: "#FF0000",
                    data: uptimeData,
                    pointStyle: "circle",
                    borderDash: [5, 5],
                    borderWidth: 1,
                    pointRadius: 5,
                    pointHoverRadius: 10,
                    pointBackgroundColor: "#FFFFFF",
                  },
                ]}
                showLegend={false}
                smooth={true}
              />
            </div>
          </div>
        </div>

        {/* System Uptime */}
        <div className="rounded-md shadow bg-white w-full h-full col-span-1">
          <h2 className="flex items-center justify-between gap-2 px-3 py-3">
            <span className="text-secondary-gray font-medium">
              System Uptime
            </span>
            <GrPowerCycle size={20} className="text-red-500 cursor-pointer" />
          </h2>

          <hr className="w-full bg-secondary-gray h-0.5" />

          <div className="flex flex-col items-center gap-3 px-3 py-5 w-full h-full">
            {/* Graph Goes Here */}
            <div className="flex flex-col items-center w-full h-full pt-5">
              <LineChart
                labels={getAllMonths(1, true)
                  .slice(0, 6)
                  .map((month) => month.substring(0, 3))}
                datasets={[
                  {
                    label: "System Uptime",
                    backgroundColor: "#FF0000",
                    data: responseTimeData,
                    pointStyle: "circle",
                    pointRadius: 0,
                    pointHoverRadius: 0,
                    fill: "start",
                  },
                ]}
                showLegend={false}
                smooth={true}
                customYAxisLabel="%"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Second Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
        {/* Active Users Over Time */}
        <div className="rounded-md shadow bg-white w-full h-full col-span-1 xl:col-span-2">
          <h2 className="flex items-center justify-between gap-2 px-3 py-3">
            <span className="text-secondary-gray font-medium">
              Active Users Over Time
            </span>
            <GrPowerCycle size={20} className="text-red-500 cursor-pointer" />
          </h2>

          <hr className="w-full bg-secondary-gray h-0.5" />

          <div className="flex flex-col items-center gap-3 px-3 py-5 w-full h-full">
            {/* Graph Goes Here */}
            <div className="flex flex-col items-center w-full h-full pt-5">
              <LineChart
                labels={getAllMonths(1, true)
                  .slice(0, 9)
                  .map((month) => month.substring(0, 3))}
                datasets={[
                  {
                    label: "Active Users Over Time",
                    backgroundColor: "#40E0D0",
                    borderColor: "#40E0D0",
                    pointBackgroundColor: "#40E0D0",
                    pointBorderColor: "#40E0D0",
                    data: activeUsersData,
                    pointStyle: "circle",
                    pointRadius: 5,
                    pointHoverRadius: 10,
                  },
                ]}
                showLegend={false}
              />
            </div>
          </div>
        </div>

        {/* Error Rate Over Time */}
        <div className="rounded-md shadow bg-white w-full h-full col-span-1">
          <h2 className="flex items-center justify-between gap-2 px-3 py-3">
            <span className="text-secondary-gray font-medium">
              Error Rate Over Time
            </span>
            <GrPowerCycle size={20} className="text-red-500 cursor-pointer" />
          </h2>

          <hr className="w-full bg-secondary-gray h-0.5" />

          <div className="flex flex-col items-center gap-3 px-3 py-5 w-full h-full">
            {/* Graph Goes Here */}
            <div className="flex flex-col items-center w-full h-full pt-5">
              <BarChart
                labels={getAllMonths(1, true)
                  .slice(0, 6)
                  .map((month) => month.substring(0, 3))}
                datasets={[
                  {
                    label: "Error Rate Over Time",
                    backgroundColor: "#40E0D0",
                    borderColor: "#40E0D0",
                    data: errorRateData,
                  },
                ]}
                showLegend={false}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SystemAnalyticsCharts;
