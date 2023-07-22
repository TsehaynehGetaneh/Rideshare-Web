import React from "react";

type HorizontalBarShimmerProps = {

}

const HorizontalBarShimmer = (props: HorizontalBarShimmerProps) => {
  return (
    <div className="flex flex-col items-start gap-2 lg:gap-5">
        <div className="h-8 w-[50%] rounded-lg bg-gray-200 animate-pulse"/>
        <div className="h-8 w-[70%] rounded-lg bg-gray-200 animate-pulse"/>
        <div className="h-8 w-[85%] rounded-lg bg-gray-200 animate-pulse"/>
        <div className="h-8 w-[65%] rounded-lg bg-gray-200 animate-pulse"/>
        <div className="h-8 w-[80%] rounded-lg bg-gray-200 animate-pulse"/>
        <div className="h-8 w-[72%] rounded-lg bg-gray-200 animate-pulse"/>
      
    </div>
  );
};

export default HorizontalBarShimmer;
