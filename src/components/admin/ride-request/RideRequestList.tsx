import React, { useState, useEffect } from "react";
import RideRequestItem from "./RideRequestItem";
import DropDown from "@/components/common/admin/DropDown";
import SearchBar from "@/components/common/admin/SearchBar";
import Pagination from "@/components/common/admin/Pagination";
import {
  useFilterRideRequestsQuery,
  useGetRideRequestsQuery,
} from "@/store/api";
import ClipLoader from "react-spinners/ClipLoader";
import UnknownError from "@/components/common/admin/UnknownError";
import { MdFilterAltOff } from "react-icons/md";

const options = [
  { option: "All", value: "" },
  { option: "onRoute", value: "onroute" },
  { option: "Waiting", value: "waiting" },
  { option: "Completed", value: "completed" },
  { option: "Canceled", value: "canceled" },
];

const RideRequestList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [fare, setFare] = useState(0);
  const [skipPagination, setSkipPagination] = useState(false);
  const [skipFilter, setSkipFilter] = useState(true);

  const {
    data: paginationResult,
    error: paginationError,
    isLoading: paginationLoading,
    isFetching: paginationFetching,
    refetch: refetchPagination,
  } = useGetRideRequestsQuery(
    { page: currentPage, size: 10 },
    { skip: skipPagination }
  );

  const {
    data: filterResult,
    error: filterError,
    isLoading: filterLoading,
    isFetching: filterFetching,
    refetch: refetchFilter,
  } = useFilterRideRequestsQuery(
    {
      page: currentPage,
      size: 10,
      name: name,
      status: status,
      fare: fare,
    },
    {
      skip: skipFilter,
    }
  );

  const rideRequests =
    filterResult?.rideRequests || paginationResult?.rideRequests || [];
  const pages = filterResult?.pages || paginationResult?.pages;
  const isLoading =
    filterLoading || paginationLoading || filterFetching || paginationFetching;
  const error = filterError || paginationError;
  useEffect(() => {
    if (name || status || fare) {
      setSkipPagination(true);
      setSkipFilter(false);
    } else {
      setSkipFilter(true);
      setSkipPagination(false);
    }
  }, [name, status, fare]);

  console.log(rideRequests);

  return (
    <div>
      <div className="flex w-full justify-evenly my-10 items-center">
        <SearchBar setQuery={setQuery} />

        <DropDown label="Status" options={options} setValue={setStatus} />
      </div>
      {isLoading ? (
        <div className="flex w-full">
          <ClipLoader color="indigo" className="mx-auto mt-24" size={40} />
        </div>
      ) : error ? (
        <UnknownError
          refresh={skipPagination ? refetchFilter : refetchPagination}
        />
      ) : rideRequests.length > 0 ? (
        <div>
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 px-4 ml-2 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        <span className="text-center">Commuter</span>
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 px-3 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        <div className="flex items-center">
                          <span>Origin</span>
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 px-2 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        <div className="flex items-center">
                          <span>Destination</span>
                        </div>
                      </th>

                      <th
                        scope="col"
                        className="py-3.5 px-1.5 text-sm font-normal text-center rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        <div className="flex items-center gap-x-1">
                          <span>Current Fare(birr)</span>
                        </div>
                      </th>

                      <th
                        scope="col"
                        className="py-3.5 px-1.5 text-sm font-normal text-center rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        <div className="flex items-center gap-x-1">
                          <span>Number of Seats</span>
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 px-2 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        <div className="flex items-center">
                          <span>Status</span>
                        </div>
                      </th>

                      <th
                        scope="col"
                        className="py-3.5 px-2 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        <div className="flex items-center">
                          <span>Date</span>
                        </div>
                      </th>

                      <th
                        scope="col"
                        className="py-3.5 px-2 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        <div className="flex items-center">
                          <span>Action</span>
                        </div>
                      </th>
                    </tr>
                  </thead>

                  <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                    {Array.isArray(rideRequests) &&
                      rideRequests.map((rideRequest: any) => (
                        <RideRequestItem
                          key={rideRequest.id}
                          id={rideRequest.id}
                          name={rideRequest.user.fullName}
                          origin={rideRequest.originAddress}
                          destination={rideRequest.destinationAddress}
                          currentFare={rideRequest.currentFare}
                          status={rideRequest.status}
                          numberOfSeats={rideRequest.numberOfSeats}
                        />
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {pages && pages > 1 && (
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={pages}
            />
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-5 mt-16 items-center p-3">
          <MdFilterAltOff size={100} className="text-gray-400" />
          {skipFilter ? (
            <div className="text-gray-500 text-lg text-center pb-16">
              There are no Ride Requests
            </div>
          ) : (
            <div className="text-gray-500 text-lg text-center pb-16">
              There are no matching results
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RideRequestList;