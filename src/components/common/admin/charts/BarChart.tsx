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

interface BarChartProps {
  chartData: number[];
  labels: string[];
  name: string;
  color: string;
  axis?: "x" | "y";
  borderRadius?: number;
  showLegends?: boolean;
  legendsPosition?: "left" | "right" | "center" | "bottom" | "top";
}

export const BarChart = ({
  chartData,
  labels,
  name,
  color,
  axis = "x",
  borderRadius = 0,
  showLegends = true,
  legendsPosition = "top",
}: BarChartProps) => {
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
    datasets: [
      {
        label: name,
        data: chartData,
        backgroundColor: color,
      },
    ],
  };
  return <Bar options={options} data={data} />;
};

export default BarChart;
