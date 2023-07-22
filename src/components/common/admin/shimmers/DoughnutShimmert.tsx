import React from "react";

type DoughnutShimmerProps = {

}

const DoughnutShimmer = (props: DoughnutShimmerProps) => {
  return (
    <div className="relative w-72 h-72 bg-gray-200 animate-pulse rounded-full">
        <div className="absolute w-36 h-36 top-1/4 left-1/4 rounded-full bg-white" />
    </div>
  );
};

export default DoughnutShimmer;
