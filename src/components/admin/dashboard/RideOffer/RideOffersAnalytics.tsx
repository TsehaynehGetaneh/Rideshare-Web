import React, { useEffect, useState } from "react";
import BarChart from "@/components/common/admin/charts/BarChart";
import IntervalFilter from "@/components/common/admin/Interval";
import StatusAnalytics from "./StatusAnalytics";
import { useGetRideOfferStatQuery } from "@/store/api";
import { Interval } from "@/types/stat";
import { ClipLoader } from "react-spinners";
import NoBarStatistics from "@/components/common/admin/NoBarChartStatistics";
import RideOffersStatusAnalytics from "./RideOfferStatusAnalytics";
import UnknownError from "@/components/common/admin/UnknownError";
import VerticalBarShimmer from "@/components/common/admin/shimmers/VerticalBarShimmer";

type RideOffersAnalyticsProps = {};

const RideOffersAnalytics = (props: RideOffersAnalyticsProps) => {
  const [interval, setInterval] = useState("monthly");
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const { data, isLoading, isFetching, isError, refetch } = useGetRideOfferStatQuery(
    { option: interval as Interval, year: year, month: month },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const noData = data?.yAxisData.reduce((prev: number, cur: number) => prev + cur, 0) === 0
  const loading = isLoading || isFetching
  return (
    <div className="space-y-16">
      <div className="flex flex-wrap gap-3 items-start">
        <div className="w-full lg:w-[60%] space-y-3">
          <IntervalFilter
            interval={interval}
            setInterval={setInterval}
            setMonth={setMonth}
            setYear={setYear}
          />
          <div className="border rounded-lg p-5 space-y-5 bg-white shadow-lg max-w-4xl">
            <div className="text-2xl font-semibold pl-8">
              Ride Offer Analytics
            </div>
            {loading ? (
              <VerticalBarShimmer/>
            ) : isError ? (
              <UnknownError refresh={refetch} />
            ) : noData ? (
              <NoBarStatistics refresh={refetch} />
            ) : (
              <BarChart
                borderRadius={20}
                chartData={data?.yAxisData || []}
                name="Ride Offers"
                color="rgba(53, 162, 235, 0.5)"
                labels={data?.xAxisData || []}
              />
            )}
          </div>
        </div>

        <RideOffersStatusAnalytics />
      </div>
      <StatusAnalytics />
    </div>
  );
};

export default RideOffersAnalytics;
