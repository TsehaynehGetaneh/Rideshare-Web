import BarChart from "@/components/common/admin/charts/BarChart";
import { useGetTopVehiclesStatQuery } from "@/store/api";
import NoBarStatistics from "@/components/common/admin/NoBarChartStatistics";

import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import UnknownError from "@/components/common/admin/UnknownError";
import HorizontalBarShimmer from "@/components/common/admin/shimmers/HorizontalBarShimmer";

type TopVehiclesProps = {};

const TopVehicles = (props: TopVehiclesProps) => {
  const { data:vehicles, isLoading, isFetching, isError, refetch} = useGetTopVehiclesStatQuery()
  const models = vehicles?.map(vehicle => vehicle.model) || []
  const counts = vehicles?.map(vehicle => vehicle.count) || []
  const loading = isLoading || isFetching
  return (
    <div className="w-full lg:w-[60%] p-5 rounded-lg border space-y-5 bg-white shadow-lg max-w-4xl">
      <div className="text-xl font-semibold w-fit">Top Vehicles By Offers</div>
      {isLoading ? 
      <HorizontalBarShimmer />
      :isError ? 
      <UnknownError refresh={refetch}/>:
      vehicles && vehicles.length === 0 ? 
      <NoBarStatistics refresh={refetch} />: 
        <>
      <BarChart
        axis="y"
        borderRadius={30}
        chartData={counts}
        name="Offers"
        color="rgba(53, 162, 235, 0.5)"
        labels={models}
      />
      <div className="text-center">Number of Offers</div>
      </>}
      
    </div>
  );
};

export default TopVehicles;
