"use client";

import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
  ChartDataset,
  BarElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, ArcElement, Tooltip, Legend);

type BarChartProps = {
  labels: string[];
  datasets: ChartDataset<"bar">[];
  position?: "center" | "left" | "right" | "top" | "bottom" | "chartArea";
  showLegend?: boolean;
  stacked?: boolean;
};

const BarChart = ({
  labels,
  datasets,
  position,
  showLegend,
  stacked,
}: BarChartProps) => {
  const barChartData: ChartData<"bar"> = {
    labels,
    datasets,
  };

  const barChartOptions: ChartOptions<"bar"> = {
    maintainAspectRatio: true,
    responsive: true,
    plugins: {
      legend: {
        display: showLegend ?? true,
        position: position ?? "bottom",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        stacked: stacked ?? false,
      },
      x: {
        stacked: stacked ?? false,
      },
    },
  };

  return <Bar data={barChartData} options={barChartOptions} />;
};

export default BarChart;
