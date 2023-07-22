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

interface AreaChartProps {
  chartData: {
    label: string;
    data: number[];
    backgroundColor?: string;
    borderColor: string;
    lineTension?: number;
  }[];
  labels: string[];
  axis?: "x" | "y";
  borderRadius?: number;
  showLegends?: boolean;
  legendsPosition?: "left" | "right" | "center" | "bottom" | "top";
}

export const MultiLineChart = ({
  chartData,
  labels,
  axis = "x",
  borderRadius = 0,
  showLegends = true,
  legendsPosition = "top",
}: AreaChartProps) => {
  const options = {
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
  return <Line options={options} data={data} />;
};

export default MultiLineChart;
