import React, { useEffect, useRef } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { Doughnut, Chart } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface DoughnutChartProps {
  chartData: number[];
  labels: string[];
  name: string;
  colors: string[];
  showLegends?: boolean;
  legendsPosition?: "left" | "right" | "center" | "bottom" | "top";
  cutout?: string;
}
export const DoughnutChart = ({
  chartData,
  labels,
  name,
  colors,
  showLegends = true,
  legendsPosition = "right",
  cutout = "50%",
}: DoughnutChartProps) => {
  const options = {
    responsive: true,
    cutout: cutout,
    opacity: 0,
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
      tooltip: {
        usePointStyle: true,
        enabled: true,
        translateX: "-520px",
        callbacks: {
          label: function (context: any) {
            const label = context.label;
            context.label = context.dataset.label;
            const total = chartData.reduce(
              (previousValue, currentValue) => previousValue + currentValue
            );
            if (context.parsed) {
              const currentValue = context.parsed;
              const percentage = ((currentValue / total) * 100).toFixed(2);
              return ` ${label}: ${percentage}%`;
            }
          },
          title: function (context: any) {
            return context[0].dataset.label;
          },
        },
      },
    },
  };
  const data = {
    labels: labels,
    datasets: [
      {
        label: `${name}`,
        data: chartData,
        backgroundColor: colors,
      },
    ],
  };

  return <Doughnut data={data} options={options} />;
};

export default DoughnutChart;
