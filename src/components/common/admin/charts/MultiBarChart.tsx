import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

interface MultiBarChartProps {
  chartData: { label: string; data: number[]; backgroundColor: string }[];
  labels: string[];
  showLegends?: boolean;
  axis?: "x" | "y";
  borderRadius?: number;
  legendsPosition?: "left" | "right" | "center" | "bottom" | "top";
}

export const MultiBarChart = ({
  chartData,
  labels,
  showLegends = true,
  axis = "x",
  borderRadius = 0,
  legendsPosition = "top",
}: MultiBarChartProps) => {
  const options = {
    elements: {
      bar: {
        borderRadius: borderRadius,
      },
    },
    indexAxis: axis,
    responsive: true,
    plugins: {
      legend: {
        display: showLegends,
        position: legendsPosition,
        labels: {
          usePointStyle: true,
        },
      },
      title: {
        display: false,
        text: "Chart.js Bar Chart",
      },
    },
  };
  const data = {
    labels,
    datasets: chartData,
  };
  return <Bar options={options} data={data} />;
};

export default MultiBarChart;
