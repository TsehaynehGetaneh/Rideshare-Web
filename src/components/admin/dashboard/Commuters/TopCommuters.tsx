import React from "react";
import Image from "next/image";
import { useGetTopCommutersQuery } from "@/store/api";
import { ClipLoader } from "react-spinners";
import { FaUsersSlash } from "react-icons/fa";
import { RxReload } from "react-icons/rx";
import UnknownError from "@/components/common/admin/UnknownError";

type CommuterProps = {
  topCommuter: any
};

const Commuter = ({topCommuter}: CommuterProps) => {
  return (
    <div className="flex justify-between items-center p-3">
      <div className="flex items-center gap-3">
        <Image
          src="/images/admin/profile.svg"
          width={60}
          height={60}
          alt="profile image"
        />
        <div>tony stark</div>
      </div>
      <div>{topCommuter.totalOffers} offers</div>
      <div>{topCommuter.earnings} ETB</div>
    </div>
  );
};

type TopCommutersProps = {};

const TopCommuters = (props: TopCommutersProps) => {
  const {data, isLoading,isFetching, isError, refetch} = useGetTopCommutersQuery()
  const loading = isLoading || isFetching
  return (
    <div className="border rounded-lg p-5 space-y-5 max-w-xl w-full lg:w-[40%] bg-white shadow-lg">
      <div className="font-semibold text-xl">Top Commuters</div>
      {loading ? 
      <div className="w-full h-72 space-y-5">
        {
          Array.from({length:4}).map((_, index) =>
           <div key={index} className="flex items-center gap-5">
            <div className="h-12 w-16 rounded-full bg-gray-200 animate-pulse"/>
            <div className="bg-gray-200 animate-pulse rounded-lg w-full h-12"/>
           </div>)
          }
      </div>:
      isError ? 
      <UnknownError refresh={refetch} />:
      data && data.length > 0 ?
      <div className="divide-y space-y-5">
        {data.map((commuter, index) => (
          <Commuter key={index} topCommuter={commuter} />
        ))}
      </div>:
      <div className="flex flex-col gap-5 mt-16 items-center p-3">
        <FaUsersSlash size={100} className="text-gray-400" />
        <div className="text-gray-500 text-lg text-center pb-16">
          There are No Top Commuters
        </div>
        <button
        onClick={refetch}
        className="flex gap-5 items-center justify-center rounded-full w-44 py-2 bg-primary"
      >
        <RxReload className="text-white" />
        <div className="text-white">Try Again</div>
      </button>
      </div>
      }
    </div>
  );
};

export default TopCommuters;
