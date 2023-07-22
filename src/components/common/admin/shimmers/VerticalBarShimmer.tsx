import React from "react";

type VerticalBarShimmerProps = {

}

const VerticalBarShimmer = (props: VerticalBarShimmerProps) => {
  return (
    <div className="flex items-end gap-5 lg:gap-8">
        <div className="w-8 h-60 rounded-lg bg-gray-200 animate-pulse"/>
        <div className="w-8 h-64 rounded-lg bg-gray-200 animate-pulse"/>
        <div className="w-8 h-60 rounded-lg bg-gray-200 animate-pulse"/>
        <div className="w-8 h-72 rounded-lg bg-gray-200 animate-pulse"/>
        <div className="w-8 h-60 rounded-lg bg-gray-200 animate-pulse"/>
        <div className="w-8 h-64 rounded-lg bg-gray-200 animate-pulse"/>
        <div className="w-8 h-60 rounded-lg bg-gray-200 animate-pulse"/>
        <div className="w-8 h-52 rounded-lg bg-gray-200 animate-pulse"/>
        <div className="w-8 h-72 rounded-lg bg-gray-200 animate-pulse"/>
        <div className="w-8 h-60 rounded-lg bg-gray-200 animate-pulse"/>
    </div>
  );
};

export default VerticalBarShimmer;
