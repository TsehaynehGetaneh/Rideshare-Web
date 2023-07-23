import React, { useState } from "react";
import { getOfferStatus } from "./Status";
import { BsFillTrash3Fill } from "react-icons/bs";
import SearchBar from "@/components/common/admin/SearchBar";
import DropDown from "@/components/common/admin/DropDown";
import Pagination from "@/components/common/admin/Pagination";
import { useSearchRideOffersQuery } from "@/store/api";
import { ClipLoader } from "react-spinners";
import UnknownError from "@/components/common/admin/UnknownError";
import { FaUsersSlash } from "react-icons/fa";

const status_map = new Map([
  ["0", "Wating"],
  ["1", "OnRoute"],
  ["2", "Completed"],
  ["3", "Canceled"],
  ["4", "None"],
]);
const RideOffersList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const [minCost, setMinCost] = useState(0);
  const [maxCost, setMaxCost] = useState(0);
  const [phone, setPhone] = useState("");

  const {
    data,
    isLoading: rideofferLoading,
    refetch,
    isError,
  } = useSearchRideOffersQuery({
    page: currentPage,
    size: 10,
    phone: phone,
    query: query,
    MinCost: minCost,
    MaxCost: maxCost,
    status: status,
  });
  console.log(rideofferLoading);
  const offers = data?.offers;
  const pages = data?.pages;
  return (
    <div>
      <section className="container px-4 mx-auto">
        <div className="flex w-full justify-evenly my-6">
          <SearchBar setQuery={setQuery} />
          <DropDown
            label="Status"
            options={[
              { value: "completed", option: "Completed" },
              { value: "onRoute", option: "onRoute" },
              { value: "waiting", option: "Waiting" },
              { value: "cancelled", option: "Cancelled" },
            ]}
            setValue={setStatus}
          />
        </div>
        {rideofferLoading ? (
          <div className="flex w-full">
            <ClipLoader color="indigo" className="mx-auto mt-24" size={40} />
          </div>
        ) : isError ? (
          <UnknownError refresh={refetch} />
        ) : offers && offers.length > 0 ? (
          <div className="flex flex-col mt-6">
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
                          <span className="text-center">Driver Name</span>
                        </th>
                        <th
                          scope="col"
                          className="py-3.5 px-3 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          <div className="flex items-center">
                            <span>Current Location</span>
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
                            <span>Estimated Cost</span>
                          </div>
                        </th>
                        <th
                          scope="col"
                          className="py-3.5 px-1.5 text-sm font-normal text-center rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          <div className="flex items-center gap-x-1">
                            <span>Estimated Duration</span>
                          </div>
                        </th>

                        <th
                          scope="col"
                          className="py-3.5 px-1.5 text-sm font-normal text-center rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          <div className="flex items-center gap-x-1">
                            <span>Available Seats</span>
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
                            <span>Action</span>
                          </div>
                        </th>
                      </tr>
                    </thead>

                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                      {offers.map((offer, index) => (
                        <tr key={index}>
                          <td className="px-3 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                            <h2 className="font-medium text-gray-800 dark:text-white">
                              {offer.driver.user.fullName}
                            </h2>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                            {offer.originAddress}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                            {offer.destinationAddress}
                          </td>
                          <td className="px-7 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                            {offer.estimatedFare}
                          </td>
                          <td className="px-7 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                            {offer.estimatedDuration}
                          </td>
                          <td className="px-10 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                            {offer.availableSeats}
                          </td>
                          <td className="px-0 py-4 text-sm font-medium whitespace-nowrap">
                            <div>
                              <h2 className="text-sm font-normal">
                                {getOfferStatus(offer.status)}
                              </h2>
                            </div>
                          </td>

                          <td className="px-4 py-4 text-sm whitespace-nowrap">
                            <button className=" focus:outline-none">
                              <BsFillTrash3Fill
                                size={20}
                                className="transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 text-primary"
                              />
                            </button>
                          </td>
                        </tr>
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
                totalPages={11}
              />
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-5 mt-16 items-center p-3">
            <FaUsersSlash size={100} className="text-gray-400" />
            <div className="text-gray-500 text-lg text-center pb-16">
              There are No Ride Offers
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default RideOffersList;
