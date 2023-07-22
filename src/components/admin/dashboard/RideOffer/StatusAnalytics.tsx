import { useGetRiderOffersOverTimeStatusStatQuery } from "@/store/api";
import React, { useEffect, useState } from "react";
import OvertimeStatusAnalytics from "../OvertimeStatusAnalytics";
import { Interval } from "@/types/stat";

type Props = {};

const RideOfferOvertimeStatusAnalytics = (props: Props) => {
  
  const [interval, setInterval] = useState("monthly");
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [label, setLabel] = useState<string[]>([]);

  const { data, isLoading,isFetching, isError, refetch } =
    useGetRiderOffersOverTimeStatusStatQuery({year:year, month:month, option:interval as Interval});
  const noFailedData = data?.failed.yAxisData.reduce((prev: number, cur: number) => prev + cur, 0) === 0
  const noCompletedData = data?.failed.yAxisData.reduce((prev: number, cur: number) => prev + cur, 0) === 0
  return (
    <div>
      <OvertimeStatusAnalytics
        name="Ride Offers"
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

export default RideOfferOvertimeStatusAnalytics;
