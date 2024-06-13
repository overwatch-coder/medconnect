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
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type DataSet = {
  label: string;
  backgroundColor?: string;
  borderColor?: string;
  pointBackgroundColor?: string;
  pointBorderColor?: string;
  data: number[];
};

type LineChartProps = {
  datasets: DataSet[];
  labels: string[] | number[];
  legendLabelsColor?: string;
  scalesXGridColor?: string;
  scalesXTickColor?: string;
  scalesYGridColor?: string;
  scalesYTickColor?: string;
};

const LineChart = ({
  datasets,
  labels,
  legendLabelsColor,
  scalesXGridColor,
  scalesXTickColor,
  scalesYTickColor,
  scalesYGridColor,
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
        position: "bottom",
        labels: {
          color: legendLabelsColor,
        },
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
        },
      },
    },
  };

  return <Line data={lineChartData} options={lineChartOptions} />;
};

export default LineChart;
