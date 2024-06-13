"use client";

import React from "react";
import { CChart } from "@coreui/react-chartjs";

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
  return (
    <CChart
      type="line"
      data={{
        labels: labels,
        datasets: datasets.map((data) => ({
          ...data,
          borderWidth: 1,
          fill: false,
        })),
      }}
      className="w-full h-full"
      options={{
        plugins: {
          legend: {
            labels: {
              color: legendLabelsColor,
            },
            position: "bottom",
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
      }}
    />
  );
};

export default LineChart;
