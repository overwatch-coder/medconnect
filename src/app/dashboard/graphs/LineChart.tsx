"use client";

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

type LineChartProps = {
  datasets: ChartData<"line">["datasets"];
  labels: string[] | number[];
  legendLabelsColor?: string;
  scalesXGridColor?: string;
  scalesXTickColor?: string;
  scalesYGridColor?: string;
  scalesYTickColor?: string;
  position?: "center" | "left" | "right" | "top" | "bottom" | "chartArea";
  smooth?: boolean;
  showLegend?: boolean;
  customYAxisLabel?: string;
};

const LineChart = ({
  datasets,
  labels,
  legendLabelsColor,
  scalesXGridColor,
  scalesXTickColor,
  scalesYTickColor,
  scalesYGridColor,
  position,
  smooth,
  showLegend,
  customYAxisLabel,
}: LineChartProps) => {
  const lineChartData: ChartData<"line"> = {
    labels: labels,
    datasets: datasets,
  };

  const lineChartOptions: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: position || "bottom",
        display: showLegend ?? true,
        labels: {
          color: legendLabelsColor,
        },
      },
    },
    elements: {
      line: {
        tension: smooth ? 0.4 : 0,
      },
    },
    scales: {
      x: {
        grid: {
          color: scalesXGridColor,
        },
        ticks: {
          color: scalesXTickColor,
        },
      },
      y: {
        grid: {
          color: scalesYGridColor,
        },
        ticks: {
          color: scalesYTickColor,
          callback: (value) => `${value} ${customYAxisLabel || ""}`,
        },
      },
    },
  };

  return <Line data={lineChartData} options={lineChartOptions} />;
};

export default LineChart;
