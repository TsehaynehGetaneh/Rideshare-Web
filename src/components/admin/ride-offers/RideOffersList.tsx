import React, { useState } from "react";
import offers from "@/data/admin/ride-offers.json";
import { getOfferStatus } from "./Status";
import { BsFillTrash3Fill } from "react-icons/bs";
import SearchBar from "@/components/common/admin/SearchBar";
import DropDown from "@/components/common/admin/DropDown";
import Pagination from "@/components/common/admin/Pagination";

const RideOffersList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  return (
    <div>
      <section className="container px-4 mx-auto">
        <div className="flex w-full justify-evenly my-6">
          <SearchBar setQuery={setQuery} />
          <DropDown
            label="Status"
            options={[{value:'completed', option:"Completed"}, {value:'onRoute',option:"onRoute"},{value:'waiting', option:"Waiting"}, {value:'cancelled',option:"Cancelled"}]}
            setValue={setStatus}
          />
        </div>
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
                          <span>Vehicle Plate Number</span>
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
                    {offers.map((offer, index) => (
                      <tr key={index}>
                        <td className="px-3 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                          <h2 className="font-medium text-gray-800 dark:text-white">
                            {offer.Driver_Name}
                          </h2>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          {offer.Current_Location}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          {offer.Destination}
                        </td>
                        <td className="px-7 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          {offer.Vehicle_Plate_Number}
                        </td>
                        <td className="px-7 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          {offer.Estimated_Cost}
                        </td>
                        <td className="px-7 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          {offer.Estimated_Duration}
                        </td>
                        <td className="px-10 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          {offer.Available_Seats}
                        </td>
                        <td className="px-0 py-4 text-sm font-medium whitespace-nowrap">
                          <div>
                            <h2 className="text-sm font-normal">
                              {getOfferStatus(offer.Status)}
                            </h2>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          {offer.Date}
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
        </div>
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={11}
        />
      </section>
    </div>
  );
};

export default RideOffersList;
