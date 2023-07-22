import React from "react";

type UsersShimmerProps = {

}

const UsersShimmer = (props: UsersShimmerProps) => {
  return (
    <div className="space-y-5">
        {
            Array.from({length:10}).map((_, index) => 
            <div key={index} className="flex w-full items-center gap-5">
                <div className="h-16 w-16 rounded-full bg-gray-200 animate-pulse"/>
                <div className="bg-gray-200 animate-pulse rounded-lg w-full h-12"/>
            </div>
            )
        }
    </div>
    
  );
};

export default UsersShimmer;
