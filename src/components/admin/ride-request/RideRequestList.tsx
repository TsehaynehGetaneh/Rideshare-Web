import React, { useState } from "react";
import RideRequestItem from "./RideRequestItem";
import DropDown from "@/components/common/admin/DropDown";
import SearchBar from "@/components/common/admin/SearchBar";
import Pagination from "@/components/common/admin/Pagination";

const options = [
  { value: "onroute", label: "onRoute" },
  { value: "waiting", label: "Waiting" },
  { value: "completed", label: "Completed" },
  { value: "canceled", label: "Canceled" },
  { value: "", label: "None" },
];
const opts = ["all", "onroute", "waiting", "completed", "canceled"];
const RideRequestList = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedValue, setSelectedValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchQuery(event.currentTarget.search.value);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedValue(value);
  };

  return (
    <div>
      <div className="flex w-full justify-evenly my-10 items-center">
        <SearchBar
            setQuery={function (value: React.SetStateAction<string>): void {
              throw new Error("Function not implemented.");
            }}
          />
        <DropDown
          label={"Status"}
          options={[
            { option: "All", value: "" },
            { option: "onroute", value: "Onroute" },
            { option: "Waiting", value: "waiting" },
            { option: "Completed", value: "completed" },
            { option: "Canceled", value: "canceled" },
          ]}
          setValue={function (value: React.SetStateAction<string>): void {
            throw new Error("Function not implemented.");
          }}
        />
      </div>

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
                {Array.from({ length: 10 }).map((_, index) => (
                  <RideRequestItem key={index} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={11}
      />
    </div>
  );
};

export default RideRequestList;