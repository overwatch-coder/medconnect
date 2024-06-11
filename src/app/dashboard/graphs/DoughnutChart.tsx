"use client";

import React from "react";
import { CChart } from "@coreui/react-chartjs";

type DoughnutChartProps = {
  className?: string;
  labels: string[];
  data: number[];
  bgColors: string[];
};

const DoughnutChart = ({
  className,
  labels,
  data,
  bgColors,
}: DoughnutChartProps) => {
  return (
    <CChart
      type="doughnut"
      className={`${className}`}
      data={{
        labels: labels,
        datasets: [
          {
            backgroundColor: bgColors,
            data: data,
          },
        ],
      }}
      options={{
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              color: "#40E0D0",
            },
          },
        },
        animation: {
          easing: "easeInOutCubic",
        },
      }}
    />
  );
};

export default DoughnutChart;
