import React, { useState } from "react";
import LineChart from "@/components/common/admin/charts/MultiLineChart";
import IntervalFilter from "@/components/common/admin/Interval";
import UnknownError from "@/components/common/admin/UnknownError";
import NoBarChartStatistics from "@/components/common/admin/NoBarChartStatistics";
import { ClipLoader } from "react-spinners";

type StatusAnalyticsProps = {
  name: string;
  data: any;
  noData: boolean;
  error: boolean;
  loading: boolean;
  interval: string;
  setInterval: React.Dispatch<React.SetStateAction<string>>;
  setYear: React.Dispatch<React.SetStateAction<number>>;
  setMonth: React.Dispatch<React.SetStateAction<number>>;
  label: string[];
  setLabel: React.Dispatch<React.SetStateAction<string[]>>;
  refetch: () => void;
};

const OvertimeStatusAnalytics = ({
  name,
  data,
  noData,
  error,
  loading,
  label,
  setLabel,
  interval,
  setInterval,
  setYear,
  setMonth,
  refetch,
}: StatusAnalyticsProps) => {
  return (
    <div className="w-full lg:w-[70%] space-y-3">
      <IntervalFilter
        interval={interval}
        setInterval={setInterval}
        setMonth={setMonth}
        setYear={setYear}
      />
      <div className="border rounded-lg p-5 space-y-5 bg-white shadow-lg max-w-4xl">
        <div className="text-xl font-semibold">{name} Overtime Status Analysis </div>
        {loading ? 
        <div className="h-80 w-full bg-gray-200 animate-pulse rounded-lg shadow-lg"/>
        :error ? 
        <UnknownError refresh={refetch} />:
        noData ? 
        <NoBarChartStatistics refresh={refetch}/>:
        <LineChart
          borderRadius={20}
          chartData={[
            {
              label: "Completed",
              data: data.completed.yAxisData,
              borderColor: "rgba(53, 162, 235, 0.5)",
              lineTension: 0.3,
            },
            {
              label: "Failed",
              data: data.failed.yAxisData,
              borderColor: "rgba(255, 99, 132, 0.5)",
              lineTension: 0.3,
            },
          ]}
          labels={data.completed.xAxisData}
        />}
      </div>
    </div>
  );
};

export default OvertimeStatusAnalytics;
