import withAdminLayout from "@/components/common/admin/withAdminLayout";
import Role from "@/components/admin/users/Role";
import Status from "@/components/admin/users/Status";
import { BsFillTrash3Fill } from "react-icons/bs";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Pagination from "@/components/common/admin/Pagination";
import SearchBar from "@/components/common/admin/SearchBar";
import DropDown from "@/components/common/admin/DropDown";
import { useFilterUsersQuery, useGetUsersQuery } from "@/store/api";
import UnknownError from "@/components/common/admin/UnknownError";
import { FaUsersSlash } from "react-icons/fa";
import UsersShimmer from "@/components/common/admin/shimmers/UsersShimmer";

const routes =new Map([
  ["Commuter","/admin/users/commuter/"],
 [ "Driver","/admin/users/driver/"],
 [ "Admin","/admin/users/admin/"],

]);
type UsersProps = {};

const Users = (props: UsersProps) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [phone, setPhone] = useState("");
  const [skipPagination, setSkipPagination] = useState(false);
  const [skipFilter, setSkipFilter] = useState(true);
  const {
    data: paginationResult,
    error: paginationError,
    isLoading: paginationLoading,
    isFetching: paginationFetching,
    refetch: refetchPagination,
  } = useGetUsersQuery(
    { page: currentPage, size: 10 },
    { skip: skipPagination }
  );
  const {
    data: filterResult,
    error: filterError,
    isLoading: filterLoading,
    isFetching: filterFetching,
    refetch: refetchFilter,
  } = useFilterUsersQuery(
    {
      page: currentPage,
      size: 10,
      query: query,
      phoneNumber: phone,
      role: role,
      status: status,
    },
    {
      skip: skipFilter,
    }
  );

  const users = filterResult?.users || paginationResult?.users || [];
  const pages = filterResult?.pages || paginationResult?.pages
  const isLoading =
    filterLoading || paginationLoading 
  const error = filterError || paginationError;
  useEffect(() => {
    if (role || status || query.length > 0) {
      setSkipPagination(true);
      setSkipFilter(false);
    } else {
      setSkipFilter(true);
      setSkipPagination(false);
    }
  }, [role, status, query]);
  return (
    <div>
      <Head>
        <title>Users</title>
      </Head>
      <section className="container px-4 mx-auto">
        <div className="flex w-full justify-evenly my-6">
          <SearchBar setQuery={setQuery} />
          <DropDown
            label="Role"
            options={[
              { option: "All", value: "" },
              { option: "Commuter", value: "Commuter" },
              { option: "Driver", value: "Driver" },
              { option: "Admin", value: "Admin" },
            ]}
            setValue={setRole}
          />
          <DropDown
            label="Status"
            options={[
              { option: "All", value: "" },
              { option: "Active", value: "ACTIVE" },
              { option: "Idle", value: "INACTIVE" },
            ]}
            setValue={setStatus}
          />
        </div>
        {isLoading ? (
          <UsersShimmer/>
        ) : error ? (
          <UnknownError
            refresh={skipPagination ? refetchFilter : refetchPagination}
          />
        ) : users.length > 0 ? (
          <>
            <div className="flex flex-col">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                          >
                            <div className="flex items-center gap-x-3">
                              <span>Name</span>
                            </div>
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                          >
                            Phone Number
                          </th>

                          <th
                            scope="col"
                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                          >
                            <button className="flex items-center gap-x-2">
                              <span>Role</span>
                            </button>
                          </th>

                          <th
                            scope="col"
                            className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                          >
                            <button className="flex items-center gap-x-2">
                              <span>Status</span>
                            </button>
                          </th>

                          <th
                            scope="col"
                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                          >
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700">
                        {users.map((user, index) => (
                          <tr
                            key={index}
                            className="hover:bg-primary hover:bg-opacity-10 border cursor-pointer"
                            onClick={() =>
                              router.push(`${routes.get(user.roles[0].name)}${user.id}`)
                            }
                          >
                            <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                              <div className="inline-flex items-center gap-x-3">
                                <div className="flex items-center gap-x-2">
                                  {user?.profilePicture ? (
                                    <img
                                      className="object-cover w-10 h-10 rounded-full"
                                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                                      alt=""
                                    />
                                  ) : (
                                    <div className="flex items-center justify-center rounded-full w-10 h-10 bg-gray-500 text-white">
                                      {user?.fullName.charAt(0)}
                                    </div>
                                  )}
                                  <div>
                                    <h2 className="font-medium text-gray-800 dark:text-white ">
                                      {user.fullName}
                                    </h2>
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                              {user.phoneNumber}
                            </td>

                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                              {user.roles.length > 0 && (
                                <div className="flex items-center gap-x-2">
                                  <Role role={user.roles[0].name} />
                                </div>
                              )}
                            </td>
                            <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                              <Status
                                status={`${
                                  user.statusByLogin === "INACTIVE"
                                    ? "idle"
                                    : "active"
                                }`}
                              />
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
            {pages && pages > 1 && (
              <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={pages}
              />
            )}
          </>
        ) : (
          <div className="flex flex-col gap-5 mt-16 items-center p-3">
            <FaUsersSlash size={100} className="text-gray-400" />
            {skipFilter ? (
              <div className="text-gray-500 text-lg text-center pb-16">
                There are No Registered Users
              </div>
            ) : (
              <div className="text-gray-500 text-lg text-center pb-16">
                There are No Users Matching Your Search
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default withAdminLayout(Users);
