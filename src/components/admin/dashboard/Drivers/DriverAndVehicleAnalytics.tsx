import React, { useEffect, useState } from "react";
import MultiBarChart from "@/components/common/admin/charts/MultiBarChart";
import TopDrivers from "./TopDrivers";
import IntervalFilter from "@/components/common/admin/Interval";
import TopVehicles from "../TopVehicles";
import { useGetDriverStatQuery, useGetVehicleStatQuery } from "@/store/api";
import { Interval } from "@/types/stat";
import { getShortMonthNames, getWeekNames } from "@/utils";
import { ClipLoader } from "react-spinners";
import NoBarStatistics from "@/components/common/admin/NoBarChartStatistics";
import DriverStatusAnalytics from "./DriverStatusAnalytics";
import UnknownError from "@/components/common/admin/UnknownError";
import VerticalBarShimmer from "@/components/common/admin/shimmers/VerticalBarShimmer";

type DriverAndVehicleAnalyticsProps = {};

const DriverAndVehicleAnalytics = (props: DriverAndVehicleAnalyticsProps) => {
  const [interval, setInterval] = useState("monthly");
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());

  const {
    data: DriverData,
    isLoading: DriverLoading,
    isFetching: DriverFetching,
    isError:driverError,
    refetch:refetchDriver
  } = useGetDriverStatQuery(
    { option: interval as Interval, year: year, month: month },
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const {
    data: VehicleData,
    isLoading: VehicleLoading,
    isFetching: VehicleFetching,
    isError:vehicleError,
    refetch:refetchVehicles
  } = useGetVehicleStatQuery(
    { option: interval as Interval, year: year, month: month },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const loading = VehicleLoading || DriverLoading || VehicleFetching || DriverFetching
  const driverNoData = DriverData?.yAxisData.reduce(
    (prev: number, cur: number) => prev + cur,
    0
  ) === 0
  const vehicleNoData = VehicleData?.yAxisData.reduce(
    (prev: number, cur: number) => prev + cur,
    0
  ) === 0
  
  return (
    <div className="space-y-16">
      <div className="flex flex-wrap lg:flex-nowrap items-start gap-5">
        <div className="w-full lg:w-60% space-y-3">
          <IntervalFilter
            interval={interval}
            setInterval={setInterval}
            setMonth={setMonth}
            setYear={setYear}
          />
          <div className="space-y-5 rounded-lg border p-8 bg-white shadow-lg max-w-4xl">
            <div className="text-2xl font-semibold pl-8">
              Drivers and Vehicles Analytics
            </div>
            {loading ? (
              <VerticalBarShimmer/>
            ) : (vehicleError && driverError) ? 
            <UnknownError refresh={()=> {
              refetchDriver()
              refetchVehicles()
            }} />:
             driverNoData && vehicleNoData ? (
              <NoBarStatistics refresh={()=> {
                refetchDriver()
                refetchVehicles()
              }} />
            ) : (
              <MultiBarChart
                borderRadius={5}
                labels={DriverData?.xAxisData || []}
                chartData={[
                  {
                    label: "Drivers",
                    data: DriverData?.yAxisData || [],
                    backgroundColor: "rgba(53, 162, 235, 0.5)",
                  },
                  {
                    label: "Vehicles",
                    data: VehicleData?.yAxisData || [],
                    backgroundColor: "rgba(255, 99, 132, 0.5)",
                  },
                ]}
              />
            )}
          </div>
        </div>
        <DriverStatusAnalytics />
      </div>
      <div className="flex items-start flex-wrap lg:flex-nowrap gap-5">
        <TopVehicles />
        <TopDrivers />
      </div>
    </div>
  );
};

export default DriverAndVehicleAnalytics;
