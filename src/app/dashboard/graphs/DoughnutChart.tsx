"use client";

import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

type DoughnutChartProps = {
  labels: string[];
  data: number[];
  bgColors: string[];
};

const DoughnutChart = ({ labels, data, bgColors }: DoughnutChartProps) => {
  const doughnutChartData: ChartData<"doughnut"> = {
    labels,
    datasets: [
      {
        data: data,
        backgroundColor: bgColors,
        borderWidth: 1,
        spacing: 0,
        borderRadius: 0,
      },
    ],
  };

  const donutChartOptions: ChartOptions<"doughnut"> = {
    maintainAspectRatio: true,
    animation: true,
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
      },
    },
  };

  return <Doughnut data={doughnutChartData} options={donutChartOptions} />;
};

export default DoughnutChart;
