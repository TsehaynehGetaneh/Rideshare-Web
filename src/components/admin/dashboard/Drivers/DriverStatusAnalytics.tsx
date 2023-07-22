import NoDoughnutChartStatistics from "@/components/common/admin/NoDoughnutChartStatistics";
import UnknownError from "@/components/common/admin/UnknownError";
import DoughnutChart from "@/components/common/admin/charts/Doughnut";
import DoughnutShimmer from "@/components/common/admin/shimmers/DoughnutShimmert";
import VerticalBarShimmer from "@/components/common/admin/shimmers/VerticalBarShimmer";
import { useGetDriverStatusStatQuery } from "@/store/api";
import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

type Props = {};

const DriverStatusAnalytics = (props: Props) => {
  const {
    data,
    isLoading,
    isFetching,
    isError,
    refetch
  } = useGetDriverStatusStatQuery();
  const [inner, setInner] = useState(false)

  useEffect(() => {
    if (inner) {
      const toRef = setTimeout(() => {
        setInner(false);
        clearTimeout(toRef);
      }, 2000);
    }
  });
  const noData = data?.reduce(
    (prev: number, cur: number) => prev + cur,
    0
  ) === 0
  const loading = isLoading || isFetching
  return (
    <div className="max-w-md lg:w-[40%] rounded-lg border p-5 space-y-5 bg-white shadow-lg">
      <div className="text-xl font-semibold w-fit">Current Drivers Status</div>
      {loading ? 
      <DoughnutShimmer/> :
    isError ? 
        <UnknownError refresh={refetch} />
      :noData ?
        <NoDoughnutChartStatistics refresh={refetch} />
      :(
        <div className="flex gap-3">
          <div
            className={`relative ${inner && "z-10"}`}
            onMouseEnter={() => setInner(true)}
          >
            <DoughnutChart
              showLegends={false}
              cutout="70%"
              chartData={[50, 20, 10]}
              labels={["Approved", "Blocked", "Pending"]}
              name="Drivers"
              colors={[
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(154, 62, 235, 1)",
              ]}
            />

            <div
              className={`absolute bottom-[20%] right-[20%] w-[60%] mx-auto ${
                inner && "-z-10"
              }`}
              onMouseOut={() => setInner(true)}
            >
              <DoughnutChart
                showLegends={false}
                cutout="70%"
                chartData={data as number[]}
                labels={["Active", "Idle"]}
                name="Drivers"
                colors={["rgba(0, 255, 0, 1)", "rgba(255, 0, 0, 1)"]}
              />
            </div>
          </div>
          <div className="flex flex-col justify-center gap-2">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full bg-[#00ff00]" />
              <div className="text-sm">Active</div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full bg-[#ff0000]" />
              <div className="text-sm">Idle</div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full bg-[#ff6384]" />
              <div className="text-sm">Approved</div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full bg-[#36a2eb]" />
              <div className="text-sm">Blocked</div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full bg-[#9a3eeb]" />
              <div className="text-sm">Pending</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DriverStatusAnalytics;
