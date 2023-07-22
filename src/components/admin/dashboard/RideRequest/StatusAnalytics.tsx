import { useGetRideRequestOverTimeStatusStatQuery } from "@/store/api";
import React, { useEffect, useState } from "react";
import OvertimeStatusAnalytics from "../OvertimeStatusAnalytics";
import { Interval } from "@/types/stat";

type Props = {};

const RideRequestOvertimeStatusAnalytics = (props: Props) => {
  
  const [interval, setInterval] = useState("monthly");
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [label, setLabel] = useState<string[]>([]);

  const { data, isLoading,isFetching, isError, refetch } =
    useGetRideRequestOverTimeStatusStatQuery({year:year, month:month, option:interval as Interval});
  const noFailedData = data?.failed.yAxisData.reduce((prev, cur) => prev + cur, 0) === 0
  const noCompletedData = data?.failed.yAxisData.reduce((prev, cur) => prev + cur, 0) === 0
  return (
    <div>
      <OvertimeStatusAnalytics
        name="Ride Requests"
        data={data}
        loading={isLoading || isFetching}
        error={isError}
        noData={noFailedData && noCompletedData}
        label={label}
        setLabel={setLabel}
        interval={interval}
        setInterval={setInterval}
        setYear={setYear}
        setMonth={setMonth}
        refetch={refetch}
      />
    </div>
  );
};

export default RideRequestOvertimeStatusAnalytics;
